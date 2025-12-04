'use client';

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    XIcon,
    WhatsappIcon,
    TelegramIcon,
} from 'react-share';


const ShareButtons = ({property}) =>{
    const shareUrl = `${process.env.NEXTAUTH_URL}/properties/${property._id}`;
    
    return(
        <>
            <h3 className='text-xl font-bold text-center pt-2'>
                Share This Property:
            </h3>
            <div className='flex gap-3 justify-center pb-5'>
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={40} round={true}/>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                    <XIcon size={40} round={true}/>
                </TwitterShareButton>    
                <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={40} round={true}/>
                </WhatsappShareButton>
                <TelegramShareButton url={shareUrl}>
                    <TelegramIcon size={40} round={true}/>
                </TelegramShareButton>
                
            </div>
        </>
    )
}

export default ShareButtons;