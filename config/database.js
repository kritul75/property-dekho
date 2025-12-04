import mongoose from 'mongoose';

let connected = false;

const connectDB = async () =>{
    // restricts saving out of schema details
    mongoose.set('strictQuery',true);

    //if db is already connected
    if(connected){
        console.log('MongoDB is already connected');
        return;
    }

    //connect to DB
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        connected = conn.connections[0].readyState === 1;
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
    }

};

export default connectDB;