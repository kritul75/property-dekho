
import connectDB from "@/config/database";
import getSessionUser from '@/utils/getSessionUser';
import User from "@/models/User";
import PropertyCard from "@/components/PropertyCard";

const SavedPropertiesPage = async () => {

    // Check if user is authenticated
    const session = await getSessionUser();
    if(!session || !session.user){
        return(
            <section className='px-4 py-6'>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            <h1 className='text-2xl mb-4'>Saved Properties</h1>
            <p className='text-gray-600'>Please log in to view your saved properties.</p>
          </div>
        </section>
        )
    }
    // connect db
    await connectDB();
    // Fetch bookmarked properties for the authenticated user
    const {bookmarks} = await User.findById(session.userId).populate('bookmarks').lean();


    return(
        <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {
            bookmarks.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {
                        bookmarks.map((property)=>(
                            <PropertyCard key={property._id} propertyInfo={property}/>
                        ))
                    }        
                </div>
            
            ) : 
            (<p className='text-gray-600'>You have no saved properties.</p>)
        }
        
      </div>
    </section>
    )
}

export default SavedPropertiesPage;