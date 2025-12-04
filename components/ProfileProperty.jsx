'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import deleteProperty from '@/app/actions/deleteProperty';
// added toast conatiner in main layout for reusability 
//feature now just add toast when needed
import { ToastContainer,toast } from 'react-toastify';

const ProfileProperty = ({initialProperties}) =>{
    // usestate so after deleting we could update just my filtering out
    // dont have to refetch from DB
    const [properties,setProperties] = useState(initialProperties);

    async function handleDeleteProperty(propertyId){
      const confirmed = window.confirm(
        'Are you sure you want to delete this property?'
      );

      if(!confirmed) return;

      //binding id with serverAction
      const deletePropertyById = deleteProperty.bind(null,propertyId);

      await deletePropertyById();

      //updating property by romoving deleted one
      const newProperties = properties.filter((property)=>property._id !== propertyId);
      setProperties(newProperties);

      toast.success("Property deleted successfully");


    }
    
    
    return properties.map((property)=>(
        <div key={property._id} className="mb-10">
                
                <Link href={`/properties/${property._id}`}>
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    width={0}
                    height={0}
                    sizes='100vw'
                    alt="Property 1"
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{property.name}</p>
                  <p className="text-gray-600">Address: {property.location.street}</p>
                </div>
                <div className="mt-2">
                  <Link
                    href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                    onClick={()=>handleDeleteProperty(property._id)}
                  >
                    Delete
                  </button>
                </div>
        </div>
    ))
}
export default ProfileProperty;