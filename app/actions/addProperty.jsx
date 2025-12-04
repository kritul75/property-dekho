'use server';
import getSessionUser from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import Property from '@/models/Property'
import cloudinary from '@/config/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const addProperty= async (formData) =>{
    
        await connectDB();
        const {userId} = await getSessionUser();
        //not user logged in
        if(!userId){
           throw new Error("User ID is required");
       }
        
       // Access all values for amenities and images
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter((image) => image.name !== '');

        // Create the propertyData object with embedded seller_info
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
            nightly: formData.get('rates.nightly'),
            },
            seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        };
        
        const imageUrls = [];

        for(const imageFile of images){
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "PropertyDekho" },(error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }).end(buffer);
            });
            imageUrls.push(uploadResult.secure_url);
        }
        
        propertyData.images = imageUrls;

        const newProperty = new Property(propertyData);

        await newProperty.save();

        revalidatePath('/', 'layout');
        redirect(`/properties/${newProperty._id}`);
  
}

export default addProperty;