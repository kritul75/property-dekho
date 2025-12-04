'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import readMessage from "@/app/actions/readMessage";
import deleteMessage from "@/app/actions/deleteMessage";
import useUnreadMessageCount from "@/context/messageReadContext";

const MessageCard = ({message}) =>{
    

    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);
    const {setUnreadCount} = useUnreadMessageCount();

    const handleRead = async () =>{
      
      await readMessage(message.id);
      if(isRead){
        setUnreadCount((prev)=>prev+1);
      }
      else{
        setUnreadCount((prev)=>prev-1);
      }
      setIsRead((prev)=>!prev);
      toast.success(`Marked as ${isRead?'Unread':'Read'}`);
      
    }

    const handleDelete = async () =>{
      const confirmed = window.confirm("Are you sure you want to delete this message?");

      if (!confirmed) return; // user cancelled
      
      await deleteMessage(message.id);
      if(!isRead){
        setUnreadCount((prev)=>prev-1);
      }
      
      setIsDeleted(true);
      toast.success('Message deleted');
    }

    if(isDeleted){
      return(
      <div>message deleted</div>
      )
    }

    return (
        <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {message.propertyName}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      {
        isRead?(<button
        onClick={handleRead}
        className={`mt-4 mr-3 bg-blue-300 
         py-1 px-3 rounded-md`}
         
      >
        Unread
      </button>):(<button
        onClick={handleRead}
        className={`mt-4 mr-3 bg-gray-300 
         py-1 px-3 rounded-md`}
         
      >
        Read
      </button>)
      }
      
      <button
        onClick={handleDelete}
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
      >
        Delete
      </button>
    </div>
    )
}

export default MessageCard;