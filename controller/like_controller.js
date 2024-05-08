const Comment = require('../model/comment');
const Post = require('../model/post');
const Like = require('../model/like');

module.exports.toggleLike = async (req, res)=>{
    try {
        let likeable;
        let deleted = false;
        if(req.params.type==='Post'){
            likeable = await Post.findById(req.params.id).populate('likes')
        }else if(req.params.type==='Comment'){
            likeable = await Comment.findById(req.params.id).populate('likes')
        }else{
            return res.status(400).json({ message: "Invalid likeable type" });
        }
        let existingLike = await Like.findOne({
            likeable: req.params.id,
            onModel: req.params.type,
            user: req.user._id
        })
        if(existingLike){
            await likeable.likes.pull(existingLike._id);
            await likeable.save();
            await existingLike.deleteOne();
            deleted = true
        }else{
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.params.id,
                onModel: req.params.type
            })

            likeable.likes.push(newLike._id);
            await likeable.save()
        }
        return res.status(200).json({
            message: deleted ? "Unliked successfully" : "Liked successfully",
            success: true,
            deleted
        }); 
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in like and unlike",
            error: error.message
        });
    }
}