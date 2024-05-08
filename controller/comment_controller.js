const Post = require('../model/post');
const Comment = require('../model/comment')

module.exports.create = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                contentText: req.body.contentText,
                post: req.body.post,
                user: req.user._id
            })
            if (!post.comments) {
                post.comments = [];
            }
            await post.comments.push(comment);
            await post.save();
            await comment.populate('user', 'username');
            return res.status(200).json({
                message: "comment posted",
                success: true,
                comment
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in creating the comment!!",
            error: error.message
        })
    }
}

module.exports.removeComment = async (req, res) => {
    try {
        const deleteComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deleteComment) {
            return res.status(400).json({
                message: "Comment not found or does not exist!",
                success: false
            });
        }
        const post = await Post.findById(deleteComment.post);
        if (!post) {
            return res.status(400).json({
                message: "Associated post not found!",
                success: false
            });
        }
        post.comments.pull(deleteComment._id);
        await post.save();
        return res.status(200).json({
            message: "Comment deleted successfully!",
            success: true,
            deleteComment
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in deleting the comment",
            error: error.message
        });
    }
};


module.exports.getComment = async (req, res)=>{
    try {
        const getComment = await Comment.find({user: req.user._id})
        if(!getComment){
            return res.status(400).json({
                message: "ansers not found and does not exist!!",
                success: false
            })
        }
        return res.status(200).json({
            message: "Here is the comments data!!",
            success: true,
            getComment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the answer!!",
            error: error.message
        })
    }
}