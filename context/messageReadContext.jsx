'use client';

import {useState, useEffect, createContext, useContext} from 'react';
import unreadMessageCount from '@/app/actions/unreadMessageCount';
import { useSession } from 'next-auth/react';

const unreadMessageContext = createContext();

export const UnreadMessageProvider = ({children}) =>{
    const [unreadCount, setUnreadCount] = useState(0);
    const {data: session} = useSession();
    //fetching initial unread count on mount
    useEffect(()=>{
        const fetchMessageCount = async () =>{
            if(session?.user){
                const count = await unreadMessageCount();
                setUnreadCount(count);
            }
        }
        fetchMessageCount();
    },[unreadMessageCount, session])
    
    
    return (
        <unreadMessageContext.Provider 
            value={
                {unreadCount, 
                setUnreadCount}
                }
        >
            {children}
        </unreadMessageContext.Provider>
    )
}

export default function useUnreadMessageCount(){
    return useContext(unreadMessageContext);
}