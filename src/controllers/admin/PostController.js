const Post = require('../../models/Post');
const standardResponse = require('../../utils/ApiJsonResponse');

// Index - Get all posts
exports.index = async (req, res) => {
    try {
        const posts = await Post.find({ deleted_at: null });

        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            data: posts,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

exports.create = async (req, res) => {
    try {
        res.render('admin/post/create');
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Oops, Something went wrong!',
            error: err.message,
        });
    }
};

exports.store = async (req, res) => {
    try {
        const { title, article, status } = req.body;
        const userId = req.user._id; 
        const post = new Post({
            title,
            article,
            status,
            created_by: userId,
        });

        const data = await post.save();

        res.status(201).json(standardResponse.successResponse('Post created successfully', data));
    } catch (err) {
        console.error('Error saving post:', err);
        res.status(500).json(standardResponse.errorResponse('Oops, Something went wrong!', { error: err.message }));
    }
};

exports.show = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
            .populate('created_by', 'name email')
            .populate('updated_by', 'name email')
            .populate('deleted_by', 'name email');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: post,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.render('admin/post/edit', { post });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Oops, Something went wrong!',
            error: err.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, article, status } = req.body;
        const userId = req.user._id; 

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        if (post.isDeleted()) {
            return res.status(400).json({
                success: false,
                message: 'Post has been deleted and cannot be updated',
            });
        }

        post.title = title || post.title;
        post.article = article || post.article;
        post.status = status || post.status;
        post.updated_by = userId;

        const updatedPost = await post.save();

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: updatedPost,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        if (post.isDeleted()) {
            return res.status(400).json({
                success: false,
                message: 'Post has already been deleted',
            });
        }

        await post.softDelete(userId);

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: post,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};
