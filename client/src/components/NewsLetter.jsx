import React from 'react'

const NewsLetter = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center space-y-2 my-32'>
            <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog!</h1>
            <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get latest blog, new tech and exclusive news.</p>
            <form className='flex justify-between items-center max-w-2xl w-full md:h-13 h-12'>
                <input type="text" placeholder='Enter your Email id' required className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' />
                <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetter