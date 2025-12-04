import Link from "next/link";

const Pagination = ({page , pageSize, total}) =>{
    // total pages
    const totalPages = Math.ceil(total/pageSize);

    return(
        
        <section className="container mx-auto flex justify-center items-center text-center my-8">
            {page>1 && (
                <Link
                    className='mr-2 px-2 py-1 border border-gray-300 rounded'
                    href={`/properties?page=${page-1}`}>
                        prev
                </Link>
            )}
            <span className='mx-2'>
                {' '}
                Page {page} of {totalPages}
            </span>
            {page< totalPages && (
                <Link
                    className='mr-2 px-2 py-1 border border-gray-300 rounded'
                    href={`/properties?page=${page+1}`}>
                        next
                </Link>
            )}
        </section>
    
    )
}

export default Pagination;