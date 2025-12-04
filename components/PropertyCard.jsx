import Image from "next/image";
import Link from "next/link";
import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaMoneyBill,
    FaMapMarker,
  } from 'react-icons/fa';

const PropertyCard = ({propertyInfo}) =>{
    const getRate = () =>{
      if(propertyInfo.rates.nightly){
        return `₹ ${propertyInfo.rates.nightly}/night`
      }
      else if(propertyInfo.rates.weekly){
        return `₹ ${propertyInfo.rates.weekly}/wk`
      }
      else{
        return `₹ ${propertyInfo.rates.monthly}/mo`
      }
    }
    return(
        
        // <!-- Listing 1 -->
          <div className="rounded-xl shadow-md relative">
            <Image
            
              src={propertyInfo.images[0].startsWith('http') ? propertyInfo.images[0] : `/images/properties/${propertyInfo.images[0]}`}
              alt=""
              height={0}
              width={0}
              sizes='100vw'
              className="w-full h-auto rounded-t-xl"
            />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">{propertyInfo.type}</div>
                <h3 className="text-xl font-bold">{propertyInfo.name}</h3>
              </div>
              <h3
                className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
              >
                {getRate()}
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <FaBed/> {propertyInfo.beds}{' '}
                  <span className="md:hidden lg:inline">Beds</span>
                </p>
                <p>
                  <FaBath/> {propertyInfo.baths}{' '}
                  <span className="md:hidden lg:inline">Baths</span>
                </p>
                <p>
                  <FaRulerCombined/>
                  {propertyInfo.square_feet} <span className="md:hidden lg:inline"> sqft </span>
                </p>
              </div>

              <div
                className="flex justify-center gap-4 text-green-900 text-sm mb-4"
              >
                <p><FaMoneyBill/> Weekly</p>
                <p><FaMoneyBill/> Monthly</p>
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                  <FaMapMarker className="text-orange-700"/>
                  <span className="text-orange-700"> {propertyInfo.location.city} {propertyInfo.location.state} </span>
                </div>
                <Link
                  href={`/properties/${propertyInfo._id}`}
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
    )
}

export default PropertyCard;