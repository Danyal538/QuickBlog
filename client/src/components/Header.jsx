import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import { useRef } from 'react';

const Header = () => {
    const { input, setInput } = useAppContext();
    const inputRef = useRef();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setInput(inputRef.current.value);
    }
    const onClear = () => {
        setInput("");
        inputRef.current.value = '';
    }
    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>
                <div className=' inline-flex justify-center items-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 text-sm rounded-full text-primary'>
                    <p>New: AI feature integrated</p>
                    <img src={assets.star_icon} alt="" className='w-2.5' />
                </div>
                <h1 className=' text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-primary'>blogging</span> <br /> platform.</h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>This is your space to think out loud, to share what matters, and to writewithout filters. Whether its one word or thousand, your story starts right here.</p>

                <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                    <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none' />
                    <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
                </form>

                <div className='text-center'>
                    {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer mt-2'>Clear Search</button>
                    }
                </div>
            </div>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50 ' />
        </div>
    )
}

export default Header