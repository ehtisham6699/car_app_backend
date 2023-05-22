const express = require("express");
const router = express.Router();
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const carController = require("../controller/carController");
var { passport } = require("../auth/passport_auth");

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API endpoints for managing cars
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     carSchema:
 *       properties:
 *         _id:
 *           type: string
 *         color:
 *           type: string
 *         model:
 *           type: number
 *         make:
 *           type: string
 *         registrationNo:
 *           type: string
 *         category:
 *           type: string
 *         owner:
 *           type: string
 *       required:
 *         - color
 *         - model
 *         - make
 *         - registrationNo
 *         - category
 *         - owner
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/carSchema'
 *     responses:
 *       200:
 *         description: Car created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  carController.createCar
);

/**
 * @swagger
 * /cars/{_id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the car to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  carController.editCar
);

/**
 * @swagger
 * /cars/{_id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the car to delete
 *         required: true
 *         schema:
 *           type: string
 */
router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  carController.deleteCar
);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/carSchema'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  carController.getAllCars
);

module.exports = router;
