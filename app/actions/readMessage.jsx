'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import getSessionUser from '@/utils/getSessionUser';
import {revalidatePath} from 'next/cache';

const readMessage = async (messageId)=>{
    await connectDB();

    // authenticate user
    const {userId} = await getSessionUser();
    if(!userId){
        throw new Error('User not authenticated');
    }
    
    const message = await Message.findById(messageId);

    if(!message){
        throw new Error('Message not found');
    }
    // Verify ownership
    if (message.recipient.toString() !== userId) {
        return new Response('Unauthorized', { status: 401 });
    }
    
    message.read = !message.read;
    await message.save();

    revalidatePath('/messages', 'page');
    return message.read;
}

export default readMessage;