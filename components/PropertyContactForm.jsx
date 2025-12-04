'use client';

import {toast} from 'react-toastify'
import { useActionState } from 'react';
import { useEffect } from 'react';
import SubmitMessageButton from '@/components/SubmitMessageButton';
import addMessage from '@/app/actions/addMessage';


const PropertyContactForm = ({property}) =>{
    
    const [state, formAction] = useActionState(addMessage,{});

    useEffect(() => {
        if (state.error) toast.error(state.error);
        if (state.submitted) toast.success('Message sent successfully');
    }, [state]);
    // if form submitted then hide form
    if (state.submitted) {
    return (
      <p className='text-grey-500 text-center py-4 bg-green-400 rounded-md mb-4'>
        Your message has been sent successfully
      </p>
    );
    }
    

    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
                <form action={formAction}>
                    <div className="mb-4">
                    <input
                        type="hidden"
                        id="propertyId"
                        name="propertyId"
                        value={property._id}
                    />
                    <input
                        type="hidden"
                        id="recipient"
                        name="recipient"
                        value={property.owner}
                    />
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                    >
                        Phone:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Enter your phone number"
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                    >
                        Message:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                    ></textarea>
                    </div>
                    <div>
                    <SubmitMessageButton />
                    </div>
                </form>
                </div>
    )
}

export default PropertyContactForm;