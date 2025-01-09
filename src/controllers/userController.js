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
        res.status(201).json({message:"User created" , data: rest});
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


export const deleteUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const userExists = await User.findOne ({_id});
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(_id);
        return res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    try {
    const _id = req.params.id;
    const userExists = await User.findOne ({_id});
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({ message: "User updated", data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
}