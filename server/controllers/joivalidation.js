const Joi = require('joi');
const express=require('express');
const app=express();

app.use(express.json());

// Example validation schema for a blog post
const postSchema = Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().required(),
    featuredImage: Joi.string().uri(),
    slug: Joi.string().required(),
    excerpt: Joi.string().max(200),
    author: Joi.string().optional(),
    viewCount: Joi.number().min(0),
    comments: Joi.array().items(Joi.object({
        user: Joi.string().required(),
        content: Joi.string().required(),
        createdAt: Joi.date()
    })),
    category: Joi.string().required(),
    isPublished: Joi.boolean()
});

// Middleware for validating blog post data
const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false, 
            message: error.details[0].message
        });
    }
    next();
}
module.exports = { validatePost };
