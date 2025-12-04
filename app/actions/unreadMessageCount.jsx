'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import getSessionUser from '@/utils/getSessionUser';

const unreadMessageCount = async () =>{
    await connectDB();
    const {userId} = await getSessionUser();
    if(!userId){
        return 0;
    }
    
    const count = await Message.countDocuments({recipient: userId, read: false});

    return count;
}

export default unreadMessageCount;