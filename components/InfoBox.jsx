import Link from "next/link";

const InfoBox = ({
    children , 
    boxHeader, 
    backGroundColor='bg-gray-100' , 
    textColor='text-gray-800',
    buttonProp
}) =>{
    return(
        <div className={`${backGroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className="text-2xl font-bold">{boxHeader}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
             {children }
            </p>
            <Link
              href={buttonProp.link}
              className={`inline-block ${buttonProp.backGroundColor} text-white rounded-lg px-4 py-2 opacity-80 hover:opacity-100`}
            >
              {buttonProp.text}
            </Link>
        </div>
    )
}

export default InfoBox;