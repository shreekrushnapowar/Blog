const mongoose=require('mongoose');
const JWT=require('jsonwebtoken')
const {Schema}=mongoose;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
        },
    tokens:[
            {
            token:{
                    type:String,
                    required:true
                }
            }
        ]
},{timestamps:true})

userSchema.methods.generateToken=async function (){
    try {
        let token = JWT.sign({_id:this._id},process.env.JWT_SECRET);
         this.tokens=this.tokens.concat({token:token});
         await this.save();
         return token;
     } catch (error) {
         console.log(error);
         
     }
}
module.exports = User = mongoose.model("USER", userSchema);