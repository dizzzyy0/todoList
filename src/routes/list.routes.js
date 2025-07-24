import express from 'express';
import listControllers from '../controllers/list.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.use(authMiddleware);
router.post('/', listControllers.createList);
router.get('/', listControllers.getUserLists);
router.get('/:listId', listControllers.getListById);
router.patch('/:listId', listControllers.updateList);
router.patch('/:listId/group', listControllers.addToGroup);
router.delete('/:listId', listControllers.deleteList);

export default router;
