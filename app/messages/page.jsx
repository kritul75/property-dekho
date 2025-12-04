import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import Message from '@/models/Message';
import Property from '@/models/Property';
import MessageCard from '@/components/MessageCard';
import {convertToSerializeableObject} from '@/utils/convertToObject';
import { read } from 'fs';

const MessagesPage = async () => {

    await connectDB();
    
    const session = await getSessionUser();
    if(!session){
        return (
            <div className='container m-auto py-24 max-w-6xl'>
                <p>Please log in to view your messages.</p>
            </div>
        )
    }

    const userId = session.userId;

    const messages = await Message.find({recipient: userId})
                    .populate('sender', 'username')
                    .populate('property','name')
                    .sort({createdAt: -1});    
    
    // converting message to serializable object
    const serializedMessages = messages.map((messageDoc) => {
        const message = convertToSerializeableObject(messageDoc);
        message.sender = convertToSerializeableObject(messageDoc.sender);
        message.property = convertToSerializeableObject(messageDoc.property);
        return message;
    })
    
    return (
        <section className='bg-blue-50'>
            <div className='container m-auto py-24 max-w-6xl'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
                    <div className='space-y-4'>
                        {serializedMessages.length === 0 ? (
                            <p>No messages found.</p>
                        ) : (
                            serializedMessages.map((msg)=>(
                                <MessageCard key={msg._id} message={{
                                    id: msg._id.toString(),
                                    body: msg.body,
                                    email: msg.email,
                                    phone: msg.phone,
                                    createdAt: msg.createdAt,
                                    propertyName: msg.property?.name,
                                    read: msg.read,
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MessagesPage;