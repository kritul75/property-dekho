'use client';
import { FaBookmark } from 'react-icons/fa';
import BookmarkProperty from '@/app/actions/BookmarkProperty';
import CheckBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const BookmarkButton = ({propertyId}) =>{

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const {data:session} = useSession();

    //useEffect to handle bookmark state 
    useEffect(()=>{
        // not loggied in
        setProcessing(true);
        try {
            if(!session){
                    setLoading(false);
                    return;
            }
            // fetch bookmark status
            CheckBookmarkStatus(propertyId).then((res)=>{
                if(res.error) toast.error(res.error);
                if(res.isBookmarked !== undefined){
                    setIsBookmarked(res.isBookmarked);
                }
                
            })
        } catch (error) {
            toast.error("An error occurred while checking bookmark status");
        }
        finally{
            setProcessing(false);
            setLoading(false);
        }
        
    }, [propertyId, session?.userId, CheckBookmarkStatus]);
    

    //handle bookmark click function can be added here
    const handleClick =  () =>{ 
        // check session
        if(!session){
            toast.error("You must be logged in to bookmark a property");
            return;
        }
        
        BookmarkProperty(propertyId).then((res)=>{
            if (res.error) return toast.error(res.error);
            setIsBookmarked(res.isBookmarked);
            toast.success(res.message);
        });
        
    }

    //if loading state
    if(loading){
        return(<div className="w-full flex justify-center py-2">
      <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
    </div>)
    }
    

    return(
      isBookmarked ? (
            <button
            disabled={processing}
                className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                onClick={handleClick}
            >
                <FaBookmark className=" mr-2"/> Remove Bookmark
            </button>
        ):(
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                onClick={handleClick}
            >
                <FaBookmark className=" mr-2"/> Bookmark Property
            </button>
        )
    )
}

export default BookmarkButton;