const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    },
    draft: {
        type: Boolean,
        default: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    deleted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
});

postSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updated_at = Date.now();
    }
    next();
});

postSchema.methods.softDelete = function (userId) {
    this.deleted_at = Date.now();
    this.deleted_by = userId;
    return this.save();
};

postSchema.methods.isDeleted = function () {
    return this.deleted_at !== null;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
