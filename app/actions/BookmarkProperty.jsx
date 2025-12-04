'use server'

import connectDb from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import User from '@/models/User';
import {revalidatePath} from 'next/cache';


const BookmarkProperty = async (propertyId) => {
  //connectDb
   await connectDb();
  // authenticate user
  const {userId} = await getSessionUser();
  if(!userId){
    throw new Error('User not authenticated');
  }

    // Logic to bookmark the property for the user
    const user = await User.findById(userId);

    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
        // If already bookmarked, remove it
        user.bookmarks.pull(propertyId);
        message = 'Property removed from bookmarks';
        isBookmarked = false;
    } else {
        // If not bookmarked, add it
        user.bookmarks.push(propertyId);
        message = 'Property bookmarked successfully';
        isBookmarked = true;
    }   

    await user.save();
    
    revalidatePath('/properties/saved', 'page');
    
    return{message, isBookmarked};

}

export default BookmarkProperty;