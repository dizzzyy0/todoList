import authService from '../services/auth.services.js';

async function register(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try{
        const newUser = await authService.registerUser(email, password);
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    }
    catch (error) {
        if (error.message.includes('already exists')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

async function login(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try{
        const data = await authService.loginUser(email, password);
        res.status(200).json({
            message: 'Login successful',
            token: data.token,
            user: data.user,
        });
    }
    catch (error) {
        if (error.message.includes('invalid credentials')) {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export default {
    register,
    login,
};
