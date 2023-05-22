const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
var { passport } = require("../auth/passport_auth");
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     categorySchema:
 *       properties:
 *         _id:
 *           type: string
 *         categoryName:
 *           type: string
 *       required:
 *         - CategoryName
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categorySchema'
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Invalid request body
 */
router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  categoryController.createCategory
);

/**
 * @swagger
 * /category/{_id}:
 *   put:
 *     summary: Edit an existing category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categorySchema'
 *     responses:
 *       200:
 *         description: Category edited successfully
 *       400:
 *         description: Invalid request body or category ID
 */
router.put(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  categoryController.editCategory
);

/**
 * @swagger
 * /category/{_id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid category ID
 */
router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  categoryController.deleteCategory
);

/**
 * @swagger
 * /category:
 *     get:
 *     summary: all categories
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       400:
 *         description: Error getting categories
 */
router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  categoryController.getAllCategory
);
module.exports = router;
