import PropertySearchForm from '@/components/PropertySearchForm';
import {FaArrowAltCircleLeft} from 'react-icons/fa';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import {convertToSerializeableObject} from '@/utils/convertToObject';
import PropertyCard from '@/components/PropertyCard';

const SearchResultsPage = async ({searchParams}) => {

    const {location = '', propertyType = 'All'} = await searchParams;
    
    await connectDB();
    // regex pattern for location search
    const locationPattern = new RegExp(location, 'i');

    // Match location pattern against database fields
    let query = {
        $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
        ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
    }
    // Fetch properties from database based on query
    const propertyDocs = await Property.find(query).lean();
    // Convert mongoose documents to serializable objects
    const properties = propertyDocs.map((doc)=>convertToSerializeableObject(doc));

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <PropertySearchForm />
                </div>
            </section>
            <secion>
                <div className='container-xl lg:container m-auto px-4 py-6'>
                    <Link
                        href='/properties'
                        className='flex items-center text-blue-500 hover:underline mb-3'
                    >
                        <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
                    </Link>
                    <h1 className='text-2xl mb-4'>Search Results</h1>
                    {properties.length === 0 ? (
                        <p>No properties found</p>
                    ):(
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {properties.map((property)=>(
                                <PropertyCard key={property._id} propertyInfo={property}/>
                            ))}
                        </div>
                    )}
                </div>

            </secion>
        </>
    )
}

export default SearchResultsPage