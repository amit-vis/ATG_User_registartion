const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const POST_PATH = path.join('/uploads/postPath')

const postSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    file:{
        type: String,
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..', POST_PATH))
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+'-'+Date.now())
    }
});

postSchema.statics.uploadAvtar = multer({storage: storage}).single('file')
postSchema.statics.imagePath = POST_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post