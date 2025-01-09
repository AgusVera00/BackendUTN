import User from "../models/userModel.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const savedUser = await userData.save();
        const { password, ...rest } = savedUser;
        res.status(201).json(rest);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error  });
    }
};

export const get = async (req, res) => {
    try{
        const users = await User.find()
        if (users.length === 0) {
            return res.status(204).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error  });
    };
};