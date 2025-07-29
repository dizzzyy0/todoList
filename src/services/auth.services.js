import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

async function registerUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return { id: newUser.id, email: newUser.email, name: newUser.name };
}

async function loginUser(email, password) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { 
        token, 
        user: { 
            name: user.name, 
            email: user.email 
        } 
    };
}


export default {
    registerUser,
    loginUser,
};