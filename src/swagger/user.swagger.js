/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     description: Returns the profile information for the user associated with the JWT token. Requires authorization.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with profile data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 email:
 *                   type: string
 *                   format: email
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: The user associated with the token was not found in the database.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of all users
 *     description: Returns a list of all registered users. Requires authorization. **Should be admin-only in production.**
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Delete current user's profile
 *     description: Deletes the profile of the user associated with the JWT token. This action is irreversible. Requires authorization.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile was deleted successfully.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 */