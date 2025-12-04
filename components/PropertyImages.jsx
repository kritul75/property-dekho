'use client';
import Image from 'next/image';
import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyImages = ({images}) =>{
    
    return(
        <Gallery>
            <section className="bg-blue-50 p-4">
                <div className="container mx-auto">
                    {images.length===1?(
                        <Item
                            original={images[0].startsWith('http') ? images[0] : `/images/properties/${images[0]}`}
                            thumbnail={images[0].startsWith('http') ? images[0] : `/images/properties/${images[0]}`}
                            width="1024"
                            height="768"
                        >
                        {({ ref, open }) => (   
                            <Image
                                    ref={ref} onClick={open}
                                    src={images[0].startsWith('http') ? images[0] : `/images/properties/${images[0]}`}
                                    alt={`${images[0]}`}
                                    width={0}
                                    height={0}
                                    sizes='100vh'
                                    className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                            />
                        )}
                        </Item>
                    ):(
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.map((image,index)=>(
                            <div key={index}
                            className={`
                                ${
                                    images.length === 3 && index === 2
                                    ? 'col-span-2'
                                    : 'col-span-1'
                                }`} 
                            >
                                <Item
                            original={image.startsWith('http') ? image : `/images/properties/${image}`}
                            thumbnail={image.startsWith('http') ? image : `/images/properties/${image}`}
                            width="1024"
                            height="768"
                        >
                        {({ ref, open }) => (   
                            <Image
                                    ref={ref} onClick={open}
                                    src={image.startsWith('http') ? image : `/images/properties/${image}`}
                                    alt={`${images[0]}`}
                                    width={0}
                                    height={0}
                                    sizes='100vh'
                                    className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                            />
                        )}
                        </Item>
                            </div>
                        ))}
                    </div>
                    )}
                    
                </div>
            </section>
            </Gallery>
    )
}

export default PropertyImages;