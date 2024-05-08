const Post = require('../model/post');

module.exports.myPost = async (req, res)=>{
    try {
        const post = await Post.find({user: req.user._id})
        .sort('-createdAt')
        .populate({
            path: 'user',
            select: 'username email'
        });
        
        return res.status(200).json({
            message: "see the list of the posts!!",
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server Error in finding the my post!!",
            error: error.message
        })
    }
}

module.exports.createPost = async (req,res)=>{
    try {
        Post.uploadAvtar(req,res, async (err)=>{
            if(err){
                return res.status(400).json({
                    message: "Error in multer!!",
                    success: false
                })
            }
            const postCreate = await Post.create({
                content: req.body.content,
                user: req.user,
                file: (req.file)?Post.imagePath+'/'+req.file.filename:req.body.img_link
            })
            await postCreate.save();
            return res.status(200).json({
                message: "new Post Created",
                post: postCreate
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: "Ineternal Server Error in creating the post",
            error: error.message
        })
    }
}

module.exports.deletePost = async (req, res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id,{new: true});
        if(!post){
            return res.status(400).json({
                message: "post not found or post does not exist!!",
                success: false
            })
        }
        return res.status(200).json({
            message: "post Deleted success Fully",
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in deleting the post!!",
            error: error.message
        })
    }
}

module.exports.update = async (req, res)=>{
    try {
        const findPost = await Post.findById(req.params.id);
        if(!findPost){
            return res.status(400).json({
                message: "post not found or post does not exist!!",
                success: false
            })
        }
        Post.uploadAvtar(req,res, async (err)=>{
            if(err){
                return res.status(400).json({
                    message: "Error in multer!!",
                    success: false
                })
            }
            findPost.content = req.body.content;
            findPost.file = Post.imagePath+'/'+req.file.filename
            await findPost.save()
            return res.status(200).json({
                message: "post updated",
                post: findPost
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in updating the post!!",
            error: error.message
        })
    }
}