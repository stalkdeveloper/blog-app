const Post = require('../../models/Post');

exports.index = async(req, res) => {
    try {
        const posts = await Post.find();
        /* return res.status(200).json({
            success:true, message:'Post fetch Successfully', data:posts,
        }); */
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err });
    }
}

exports.create = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.store = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.show = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.edit = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.update = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.delete = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}
