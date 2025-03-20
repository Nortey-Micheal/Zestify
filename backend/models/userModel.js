import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs'
import generateVerificationToken from '../utils/generateVerificationToken.js';
import sendVerificationToken from '../resend/email/signupEmail.js';
import sendWelcomeEmail from '../resend/email/welcomeEmail.js';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: String,
        verificationTokenExpires: Date
    },
    {timeStamps: true}
)

userSchema.statics.signup = async function ({email,password,name}) {
    if (!email || !password || !name) {
        throw new Error("All fields need to be filled");
    }
    if (!validator.isEmail(isEmail)) {
        throw new Error("Please enter a valid email address");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }

    try {
        const emailExist = await this.findOne({email})

        if (emailExist) {
            throw new Error("Email all in use. Please log in or register with a different one.");
        }

        const salt = await bcrypt.genSalt(15)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await this.create({name,email,password:hashedPassword})

        const verificationToken = generateVerificationToken()

        await sendVerificationToken({email,verificationToken})

        user.verificationToken = verificationToken;
        user.verificationTokenExpires = Date.now() + 1000 * 60 * 10;
        await user.save()

        return user

    } catch (error) {
        throw new Error(error);
    }
}

userSchema.statics.verifyToken = async function (verificationToken) {
    if (!verificationToken ) {
        throw new Error("Please enter a token");
    }

    try {
        const user = await this.findOne({
            verificationToken,
            verificationTokenExpires: {$gt: Date.now()}
        })
        if (!user) {
            throw new Error("Invalid or expired verification token");
        }
        user.verificationToken = undefined
        user.verificationTokenExpires = undefined
        user.isVerified = true
        user.save()
        const email = user.email
        const userName = user.name
        await sendWelcomeEmail({email,userName})
        return
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.statics.login = async function ({email,password}) {
    if (!email || !password) {
        throw new Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        
    }
}

const User = mongoose.model('User',userSchema)

export default User;