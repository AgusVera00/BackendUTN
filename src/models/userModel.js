import { register } from "module";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3,
        trim: true,
        lowercase: true,

    },
    lastname: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3,
        trim: true,
        lowercase: true,

    },
    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100,
    },
    registerDate: {
        type: Date,
        default: Date.now(),
    },
    password: {
        type: String,
        validate: { 
         validator: function (value) {
            return isGoodPassword(value);}
        },
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",

        required: true,
    },
});

export default mongoose.model("user", userSchema);