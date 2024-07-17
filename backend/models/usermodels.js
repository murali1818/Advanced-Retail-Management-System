const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const jwt = require('jsonwebtoken');

        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email:{
                type: String,
                required:true,
                unique: true
            },
            password: {
                type: String,
                required:true,
                select: false
            },
            avatar: {
                type: String,
                required: true,
                default:'./images/image.png'
            },
            role: {
                type: String,
                required: true,
                default:'user'
            },
            resetPasswordToken:{
                type:String,
            },
            resetpasswordTokenExpire:{
                type:Date,
            } ,
            createdAt : {
                type: Date,
                default: Date.now
                },
        })
        userSchema.pre('save', async function (next){
            if(!this.isModified('password')){
                next();
            }
            this.password = await bcrypt.hash (this.password, 10)
        })
        userSchema.methods.getJwtToken=function(){
            return jwt.sign({id:this.id},process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRES_TIME
            })
        }
        userSchema.methods.matchPassword=async function(enteredpassword){
            return  await bcrypt.compare(enteredpassword,this.password)
        }
        userSchema.methods.getresettoken=async function(){
            const token=crypto.randomBytes(20).toString('hex');
            this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');
            this.resetpasswordTokenExpire=Date.now()+30*60*1000;
            return  token;
        }
        let model = mongoose.model('User', userSchema);
        module.exports = model;