'use server';
import getServerSession from '@/utils/getServerSession';
import cloudinary from '@/config/cloudinary';
import { revalidatePath } from 'next/cache';


const Test= async (formData) =>{
    const session = await getServerSession();
    
    const file = formData.get('images');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "PropertyDekho" },(error, uploadResult) => {
            if (error) {
                return reject(error);
            }
            return resolve(uploadResult);
        }).end(buffer);
    });
    revalidatePath('/', 'layout');
    
}
//   await new Promise ((resolve, reject) => {
//     cloudinary.uploader.upload_stream({}, function (error, result){
//       if ( error ) {
//         reject(error);
//         return;
//       }
//       resolve(result);
//       console.log(result);
//     }).end(buffer);
//   })
//   revalidatePath('/'); 
// }

export default Test;

