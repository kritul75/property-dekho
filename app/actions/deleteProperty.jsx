'use server' // need to add this to make it server action

import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

const deleteProperty = async (propertyId) =>{
    await connectDB();
    
    //authenticate user
    const {userId}  = await getSessionUser();
    if(!userId){
        throw new Error("Unauthenticated user");
    }

    const property = await Property.findById(propertyId);
    if(!property){
        throw new Error("Property not found");
    }

    // checking ownership
    if(property.owner.toString() !== userId){
        throw new Error("Unauthorized user for this property");
    }

    //delete images from cloudinary

    for(const imageUrl of property.images){
        const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
        try {
          await cloudinary.uploader.destroy(`propertyDekho/${publicId}`);
        } catch (err) {
          console.error("Failed to delete Cloudinary image:", imageUrl, err);
        }
    }

    // Proceed with property deletion
    await property.deleteOne();

    revalidatePath('/', 'layout');

    // todo remove from bookmarks of users
    


}

export default deleteProperty;