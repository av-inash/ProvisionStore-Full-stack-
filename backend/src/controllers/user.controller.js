import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";



const generateAccessAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })


        return { accessToken, refreshToken }


    } catch {
        throw new ApiError(500, "Something went wrong while generating refresh and access Token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, mobile, address } = req.body;

    if ([fullName, email, password, mobile, address].some((field) => typeof field === 'string' && field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        mobile,
        address
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully")
    );
});
const loginUser = asyncHandler(async (req, res) => {



    const { email, password } = req.body
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({
        $or: [{ email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true

    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In successfully"
            )
        )



})


const userQuery = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, address, message } = req.body;


        if ([firstName, lastName, email, mobile, address, message].some((field) => typeof field === 'string' && field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }


        const userQuery = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            address,
            message
        });


        const createdUserQuery = await User.findById(userQuery._id)

        if (!createdUserQuery) {
            throw new ApiError(500, "Something went wrong while storing the user query");
        }

        return res.status(201).json(
            new ApiResponse(200, createdUserQuery, "User query stored successfully")
        );
    } catch (error) {
        console.error(error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(
                new ApiResponse(error.statusCode, null, error.message)
            );
        } else {
            return res.status(500).json(
                new ApiResponse(500, null, "Internal Server Error")
            );
        }
    }
})









const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out Successfullly"))




})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is Expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")

    }
})















export { registerUser, userQuery, loginUser, logoutUser, refreshAccessToken }