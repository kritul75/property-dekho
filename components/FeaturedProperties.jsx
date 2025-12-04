import Link from 'next/link';
import PropertyCard from './PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';


const FeaturedProperties = async () => {
    await connectDB();

    //Get the 3 latest properties
    const recentProperties = await Property.find({}).sort({createdAt:-1}).limit(3).lean();

  return (
    <>
    <section className="bg-blue-50 px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProperties.length===0?(
            <p>No Properties Found</p>
          ):(
            recentProperties.map((property)=>(
                <PropertyCard key={property._id} propertyInfo={property}/>
            ))
          )
          }
        </div>
      </div>
    </section>
    
    </>
  )
}

export default FeaturedProperties;
