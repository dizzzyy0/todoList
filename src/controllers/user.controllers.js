import userService from '../services/user.services.js';

async function getMyProfile(req, res) {
    try {
        const userId = req.user.id;
        const userProfile = await userService.getUserById(userId);
        res.status(200).json(userProfile);
    } catch (error) {
        if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

async function deleteMyProfile(req, res) {
    try {
        const userId = req.user.id;
        await userService.deleteUserById(userId);
        res.status(200).json({ message: 'User profile deleted successfully.' });
    } catch (error) {
        
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export default {
    getMyProfile,
    getAllUsers,
    deleteMyProfile,
};