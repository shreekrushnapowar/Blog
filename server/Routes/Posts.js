
const express = require('express');
// const { findOneAndDelete } = require('../Models/PostsSchema');
const router = express.Router();
const Posts = require('../Models/PostsSchema');
const User = require('../Models/UserSchema');
const multer = require('multer');
require('../conn');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {   
        cb(null, Date.now() +'_'+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

// POST a blog
// router.post('/PostBlog/:username', async (req, res) => {
router.route('/PostBlog/:username').post(upload.single('photo'), async(req, res) => {
    
      
        const username = req.params.username;
        const userexist = await User.findOne({ username: username });
  
        if (!userexist) {
            return res.status(420).json({ error: 'user does not exist' })
        }
        

        const { title, description, status } = req.body;
        if(!title || !description || !status)
        {
            return res.status(420).json({ error: 'Fill all the fields' })
        }
        const posteist = await Posts.findOne({ title: title });
        if(posteist)
        {
            return res.status(420).json({ error: 'Post exist try with different title' })
        }
        const photo=req.file.filename;      
         console.log(title, description, status, username,photo);
         const Post=new Posts({title, description, status, username,photo})
         const savedpost=await Post.save()
      
        //  const savedpost = await Posts.create({ title:title, description:description, status:status, username:username,photo:photo });
   try{return res.send({ success: true, savedpost: savedpost })}
   catch(err){console.log('error',err)}
        
 
})


// fetch all blogs
router.get('/GetallPosts', async (req, res) => {
    try {
        const posts = await Posts.find({ status: 'public' }).sort({ updatedAt: 1 });
        return res.status(200).json({ success: true, posts: posts })
    }
    catch (err) {
        return res.status(420).json({ success: false })
    }
})


// fetch Own  blogs
router.get('/GetOwnPosts/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const posts = await Posts.find({ username: username }).sort({ updatedAt: 1 });
        return res.status(200).json({posts: posts })
    }
    catch (err) {
        return res.status(420).json({ success: false })
    }
})


// Delete post

router.delete('/deletepost/:id', async (req, res) => {
    try {
        const postid = req.params.id;
        let post=await Posts.findById(req.params.id);
        if(!post){ return res.status(404).send("not found")} 
        const deleted = await Posts.findByIdAndDelete(postid);
        return res.status(200).json({ success: true,deleted:deleted })
    }
    catch {
        return res.status(420).json({ success: false })
    }
})

router.put('/updatepost/:id',async(req,res)=>{
    const {title,description,status,username,photo}=req.body;
    try {
    const posts1={};
    if(title){posts1.title=title};
    if(description){posts1.description=description};
    if(status){posts1.status=status};
    if(status){posts1.username=username};
    if(photo){posts1.photo=photo};
      
    let post=await Posts.findById(req.params.id);
    
    if(!post){ return res.status(404).send("not found")} 

    const thisispost=await Posts.findByIdAndUpdate(req.params.id,{$set:posts1},{new:true});
    return res.status(200).send({thisispost:thisispost,success:true})
   
 } catch (error) {  
    res.status(500).send(error); 
 }
})
module.exports = router