'use client';

import dynamic from 'next/dynamic';
const MapLeaflet = dynamic(() => import("@/components/MapLeaflet"), { ssr: false });


function PropertyMap({property, pos}) {
  
  return (
    <MapLeaflet pos={pos} />
  );
}

export default PropertyMap;
