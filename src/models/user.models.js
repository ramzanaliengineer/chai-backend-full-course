// Hum esy bi likh sekhty h 
// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({})
// export const User = mongoose.model("User",userSchema)

// lykin abi ya treqa sekha h many 
import mongoose,{ Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 
const userSchema =Schema(
    {
        userName : {
            type : string,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },

        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },

        fullName : {
            type : String,
            required : true,
            trim : true,
            index : true
        },

        avatar : {
            type : String,
            required : true // cloudinary url
        },

        coverImage : {
            type : String  // cloudinary url
        },

        watchHistory : [
            {
                type :Schema.Types.ObjectId,
                ref : "Video"
            }
        ],

        password : {
            type : String,
            required : [true , 'Password is required']
        },

        refreshToken : {
            type : String
        }
    },{
        timestamps : true,
    }
)
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password ,10)
    next()
})

userSchema.methodes.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}


userSchema.methodes.generateAccessToken = async function (){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            userName : this.userName,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methodes.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)

