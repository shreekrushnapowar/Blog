const mongoose=require('mongoose');
const {Schema}=mongoose;

const PostsSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
        },
     status:{
        type:String,
        required:true
     },
     username:{
        type:String,
        
     },
     photo:{
        type:String,
        
     }
},{timestamps:true})


module.exports = Posts = mongoose.model("POSTS", PostsSchema);