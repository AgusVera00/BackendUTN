import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3,
        trim: true,
        lowercase: true,
        unique: true,
    },
});

export default mongoose.model("category", categorySchema);