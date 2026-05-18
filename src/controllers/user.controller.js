import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // ya sari deatils hamy required thi or es ky according hi hum ny kam kia h 
    // get user details from frontend
    // validation  -not empty
    // check user already exists : username,email
    //check for images , check for avatar
    // upload them to cloudnary  , avatar
    // create user Object - create entry in db 
    // removed password and refresh token field from response
    // check for user creation 
    // return res

    const {fullName , email , userName,password} = req.body
    console.log("email",email);
    // if (fullName=== "") {
    //     throw new apiError(400,"FullName is required!")
    // }
    if (
        [fullName,email,userName,password].some((field)=>field?.trim()==="")
    ) {
        
    }
    const existedUser = user.findOne({
        $or:[{userName},{email}]
    })
    if (existedUser) {
        throw new apiError(409,"user with email or username already exsit")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError (400,"avatar files is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new apiError(400, "avatar files is required")
    }

    const user = await user.create({
        fullName,
        avatar : avatar.url,
        email,
        coverImage : coverImage?.url || "",
        password,
        userName : userName.toLowerCase()
    })



    const createdUser =  await User.findById(user._id).select(
        "-password  -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500,"Something went wrong while registring the user")
    }

    return res.status(201).json(
        new apiResponse(200 , createdUser ,"User registered ")
    )

});

export { registerUser };

