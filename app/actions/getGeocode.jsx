'use server';

const getGeocode = async (city) => {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
    
    if (!res.ok) throw new Error("Failed to fetch weather");
    const data = await res.json();
    
    const pos = [data[0].lat, data[0].lon];

    return pos;
}

export default getGeocode;