const express = require("express");
const userController = require("../controller/UserController");

const router = express.Router();

router.get("/" , userController.getAllUsers);
router.get("/:id" , userController.getSingleUser);
router.post("/" , userController.addNewUser);
router.patch("/:id" , userController.editUser);
router.delete("/:id" , userController.deleteUser);

module.exports = router;