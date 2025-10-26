const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Category = require('../models/category');

router.post('/', async (req, res, next) => {
    try {
        const post = new Post(req.body);
        await post.save();
        const populatedPost = await Post.findById(post._id).populate('author').populate('category');
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: populatedPost,
        });
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author').populate('category');
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author').populate('category');
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }
        res.status(200).json({
            success: true,
            post,
        });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author').populate('category');
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            post: updatedPost,
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({   
                success: false,
                message: 'Post not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (err) {
        next(err);
    }   
});



module.exports = router;