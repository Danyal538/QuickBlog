import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets';
import CommentTabelItem from '../../components/Admin/CommentTabelItem';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
      } else {
        setComments([]); // default to empty array on failure
        toast.error(data.message || "Failed to fetch comments.");
      }
    } catch (error) {
      setComments([]); // prevent undefined state
      toast.error(error.message || "Network error");
    }
  };


  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>

        <div className='flex gap-4'>
          <button onClick={() => setFilter("Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}>Approved</button>

          <button onClick={() => setFilter("Not Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}>Not Approved</button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog title& Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {
              comments.filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              }).map((comment, index) => <CommentTabelItem index={index + 1} key={comment._id} comment={comment} fetchComments={fetchComments} />)
            } */}
            {Array.isArray(comments) ? (
              comments
                .filter((comment) =>
                  filter === "Approved" ? comment.isApproved : !comment.isApproved
                )
                .map((comment, index) => (
                  <CommentTabelItem
                    key={comment._id}
                    index={index + 1}
                    comment={comment}
                    fetchComments={fetchComments}
                  />
                ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-red-500" colSpan={3}>
                  Failed to load comments.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments;