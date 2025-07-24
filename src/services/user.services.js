import prisma from '../prisma.js';

const safeUserSelect = {
    id: true,
    email: true
};

/**
 * @param {string} userId 
 * @returns {Promise<Object|null>}
 */
async function getUserById(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: safeUserSelect,
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Could not fetch user');
    }
}

/**
 * @returns {Promise<Array<object>>} 
 */
async function getAllUsers() {
    return prisma.user.findMany({
        select: safeUserSelect,
    });
};

/**
 * @param {string} userId 
 * @returns {Promise<object>} 
 */
async function deleteUserById(userId) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return user;
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw new Error('Could not delete user');
    }
};

export default {
    getUserById,
    getAllUsers,
    deleteUserById,
};