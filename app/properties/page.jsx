import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import {convertToSerializeableObject} from '@/utils/convertToObject';

export default async function Properties({searchParams}){
    await connectDB();
    //for pagination ( wit default values 1 and 3)
    const {page = 1, pageSize = 3} = await searchParams;
    
    const skip = (page-1)*pageSize;

    // current page properties
    const total = await Property.countDocuments({});
    const PropertiesDocs = await Property.find({}).skip(skip).limit(pageSize);
    // converting mongoose onject to serialized plain JSON
    const PropertiesList = PropertiesDocs.map((property)=>(convertToSerializeableObject(property)))

    return(
        // <!-- All Listings -->
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
                PropertiesList.map((Property)=>(
                    <PropertyCard 
                        propertyInfo={Property}
                        key={Property._id}
                    />
                ))
            }
          
        
        </div>
        <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} total={total}/>
      </div>
    </section>
    )
}