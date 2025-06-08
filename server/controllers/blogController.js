import fs from "fs"
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
    try {
        const blogData = JSON.parse(req.body.blog);
        const { title, subTitle, description, category, isPublished } = blogData;
        const imageFile = req.file;
        // check if all fields are present
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" })
        }

        //upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        // optimize through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' }, // auto compression
                { format: 'webp' }, // convert to modren format
                { width: '1280' }, // width resizing
            ]
        });

        const image = optimizedImageUrl;
        await Blog.create({ title, subTitle, category, description, image, isPublished });

        res.json({ success: true, message: "Blog added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "blog not found" })
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        // Delete comments associated with blog 
        await Comment.deleteMany({ blog: id });

        res.json({ success: true, message: "Blog deleted successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Blog status updated" });
    } catch (error) {
        res.json({ success: false, message: "Blog status updatation failed" })
    }
}


export const addComment = async (req, res) => {
    try {
        const { blog, content, name } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: "Comment added for review" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

// export const getBlogComments = async (req, res) => {
//     try {
//         const { blogId } = req.body;

//         // Optional: Validate blogId
//         if (!mongoose.Types.ObjectId.isValid(blogId)) {
//             return res.status(400).json({ success: false, message: "Invalid blog ID" });
//         }

//         const comments = await Comment.find({ blog: blogId, isApproved: true })
//             .populate("blog") // Populate the full blog object
//             .sort({ createdAt: -1 });

//         res.json({ success: true, comments });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };


export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format');
        res.json({ success: true, content });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}