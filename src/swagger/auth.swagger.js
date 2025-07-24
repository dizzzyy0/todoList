/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Routes for user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "User's email address."
 *               password:
 *                 type: string
 *                 format: password
 *                 description: "User's password (min. 6 characters)."
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input data.
 *       409:
 *         description: User with this email already exists.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User login successful. Returns JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                      id: 
 *                         type: string
 *                      email:
 *                         type: string
 *       401:
 *         description: Invalid credentials.
 */