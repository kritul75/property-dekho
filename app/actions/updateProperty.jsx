'use server'
import connectDB from '@/config/database';
import Property from '@/models/Property';
import getSessionUser from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const updateProperty= async (_id, formData) =>{
    
    await connectDB();

    const {userId} = await getSessionUser();
    const property = await Property.findById(_id);
    // checking owner
    if(userId !== property.owner.toString()){
        throw new error("Unauthorizzed user for this property");
    }

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
        amenities: formData.getAll('amenities'),
        rates: {
          weekly: formData.get('rates.weekly'),
          monthly: formData.get('rates.monthly'),
          nightly: formData.get('rates.nightly.'),
        },
        seller_info: {
          name: formData.get('seller_info.name'),
          email: formData.get('seller_info.email'),
          phone: formData.get('seller_info.phone'),
        },
        owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(
        _id,
        propertyData
      );
    
      revalidatePath('/', 'layout');
    
      redirect(`/properties/${updatedProperty._id}`);
    

    
}

export default updateProperty;