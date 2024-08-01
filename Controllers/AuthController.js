const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken');
const { use } = require('../Routes/AuthRouter');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new UserModel({ name, email, password: hashedPassword });
        await userModel.save();
        return res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try{
        const {name, email, password} = req.body
        const user = await UserModel.findOne({email})
        if (!user){
            return res.status(403).json({message: 'User is not exist, you have to signup', success: false})
        }
        const isPassequal = await bcrypt.compare(password, user.password)
        if (!isPassequal){
            return res.status(403).json({message: 'Invalid email or password', success: false})
        }
        const jwtToken = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET)
        res.status(200).json({message: 'signup successfully', success: true, jwtToken, email, name: user.name})
    } catch (err){
        res.status(500).json({message: 'Internal server error', success: false})
    }
}

module.exports = { signup, login };
