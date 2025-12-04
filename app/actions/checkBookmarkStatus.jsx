'use server'
import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import User from '@/models/User';

const CheckBookmarkStatus = async (propertyId) => {
    // Authenticate user
    const { userId } = await getSessionUser();
    if (!userId) {
        throw new Error('User not authenticated');
    }
    // Connect to the database
    await connectDB();
    
    // Logic to check if the property is bookmarked
    const user = await User.findById(userId)
    const isBookmarked = user.bookmarks.includes(propertyId);

    return { isBookmarked };
}

export default CheckBookmarkStatus;