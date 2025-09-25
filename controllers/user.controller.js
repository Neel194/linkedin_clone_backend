import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import Profile from '../models/profile.model.js';

export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const profile = new Profile({ userId: newUser._id });

        return res.json({
            message: 'User created',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
