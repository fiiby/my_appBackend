const User = require('../model/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authSchema } = require('../auth/authSchema'); // Import authSchema from your validation file

// Register endpoint
exports.register = async (req, res) => {
    try {
        // Validate request data against authSchema
        const { error } = authSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        // Save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Login endpoint
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password");

        // Create and assign JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.header('auth-token', token).status(200).json(token);
    } catch (err) {
        res.status(500).json(err);
    }
};
