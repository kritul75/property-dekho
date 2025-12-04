
import getSessionUser from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import Image from 'next/image';
import Property from '@/models/Property';
import ProfileProperty from '@/components/ProfileProperty';
import {convertToSerializeableObject} from '@/utils/convertToObject';



const ProfilePage = async () =>{
    // checking session
    
    const session = await getSessionUser();
    
    if (!session) {
      console.log("sending error");
      throw new Error("Please login first");
    }
    
    await connectDB();

    // getting properties of current user
    const propertiesDocs = await Property.find().where({owner : session.userId}).lean();

    // converting mongoose onject to serialized plain JSON
    const properties = propertiesDocs.map((Property)=>(convertToSerializeableObject(Property)))
    

    return(
        (
            <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={session.user.image}
                  width={0}
                  height={0}
                  sizes='100vw'
                  alt="User"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {session.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {session.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties && properties.length > 0 ? (
                <ProfileProperty initialProperties={properties}/>
              ) : (
                <p className="text-gray-500">No properties found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
            </section>
        )
        
    )
}

export default ProfilePage;