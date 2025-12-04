'use server';
import getSessionUser from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import Message from '@/models/Message';

async function addMessage(previousState, formData){

    await connectDB();

    const {userId} = await getSessionUser();
    // checking session
    if(!userId){
        return {error: "User not logged in"};
    }
    // checking if same owner as sender and recipient
    const recipient = formData.get('recipient');

    if(userId === recipient){
        return {error: "Cannot send message to yourself"};
    }
    // generation new message and saveing to database
    const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('propertyId'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('message'),
    });

    await newMessage.save();
    // returning response
    return {submitted: true};

}

export default addMessage;