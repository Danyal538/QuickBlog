import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import moment from 'moment/moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
    const { blogId } = useParams();
    const [data, setData] = useState(null);
    const [comment, setComment] = useState([]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const { axios } = useAppContext();

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${blogId}`);
            data.success ? setData(data.blog) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: blogId });
            if (data.success) {
                setComment(data.comments);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: blogId, name, content });
            if (data.success) {
                toast.success(data.message);
                setName("");
                setContent("");
                fetchComments();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    return data ? (
        <div className='relative'>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
            <Navbar />

            <div className='text-center mt-20 text-gray-600'>
                <p className='text-primary py-4 font-medium'>Published on {moment(data.createdAt).format("MMMM Do YYYY")}</p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
                <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 text-primary font-medium'>Michal Brown</p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img src={data.image} alt="" className='rounded-3xl mb-5' />

                <div dangerouslySetInnerHTML={{ __html: data.description }} className='rich-text max-w-3xl mx-auto'></div>

                {/* comment section  */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Comments ({comment.length})</p>
                    <div className='flex flex-col gap-4'>
                        {comment.map((item, index) => (
                            <div key={index} className='relative bg-primary/2 border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <img src={assets.user_icon} alt="" className='w-6' />
                                    <p className='font-medium'>{item.name}</p>
                                </div>
                                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                                    {moment(item.createdAt).fromNow()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add comment section  */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Add your comment</p>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' />

                        <textarea onChange={(e) => setContent(e.target.value)} className='w-full p-2 border border-gray-300 rounded outline-none h-48' required placeholder='Comment'></textarea>

                        <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
                    </form>
                </div>

                {/* share buttons */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='semi-bold my-4'>Share this article on social media</p>
                    <div className='flex'>
                        <img src={assets.facebook_icon} alt="" width={50} />
                        <img src={assets.twitter_icon} alt="" width={50} />
                        <img src={assets.googleplus_icon} alt="" width={50} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    ) : <Loader />
}

export default Blog;