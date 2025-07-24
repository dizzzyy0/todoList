import prisma from "../prisma.js";

const safeTaskSelect = {
    id: true,
    title: true,
    description: true,
    status: true,
    dueDate: true,
    createdAt: true,
    updatedAt: true,
    list: {
        select: {
            id: true,
            name: true,
        },
    },
};


async function createTask(taskData, userId) {
    const { listId, title, description, status, dueDate } = taskData;

    const list = await prisma.list.findFirst({
        where: {
            id: listId,
            userId: userId,
        },
    });

    if (!list) {
        throw new Error("Forbidden: You do not own this list or it does not exist.");
    }

    const task = await prisma.task.create({
        data: {
            listId,
            title,
            description,
            status,
            dueDate,
        },
        select: safeTaskSelect,
    });
    return task;
};


async function getTaskById(taskId, userId) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            list: { 
                userId: userId,
            },
        },
        select: safeTaskSelect,
    });
    return task; 
};


async function getTasksByListId(listId, userId) {
    const list = await prisma.list.findFirst({
        where: {
            id: listId,
            userId: userId,
        }
    });

    if (!list) {
        throw new Error("Forbidden: You do not own this list or it does not exist.");
    }

    return prisma.task.findMany({
        where: { listId: listId },
        select: safeTaskSelect,
        orderBy: { createdAt: 'desc' },
    });
};


async function updateTask(taskId, data, userId) {

    const existingTask = await getTaskById(taskId, userId);
    if (!existingTask) {
        return null;
    }

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: data, 
        select: safeTaskSelect,
    });
    return updatedTask;
}

async function deleteTask(taskId, userId) {
    const existingTask = await getTaskById(taskId, userId);
    if (!existingTask) {
        return null;
    }

    await prisma.task.delete({
        where: { id: taskId },
    });

    return { id: taskId }; 
}

export default {
    createTask,
    getTaskById,
    getTasksByListId,
    updateTask,
    deleteTask
};