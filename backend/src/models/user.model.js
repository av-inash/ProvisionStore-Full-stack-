import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        fullName: {
            type: String,

            trim: true,



        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,


        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        message: {
            type: String
        },



        password: {
            type: String,
            // required: [true, 'Password is required'],
            validate: {
                validator: function (value) {
                    // Password validation regex
                    const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    return passwordValidator.test(value);
                },
                message: "Password must be 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character."
            }
        },
        mobile: {
            type: Number,
            required: true,


        },
        address: {
            type: String,



        },
        refreshToken: {
            type: String
        },








    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();


    this.password = await bcrypt.hash(this.password, 10)
    next()

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}

export const User = mongoose.model("User", userSchema)