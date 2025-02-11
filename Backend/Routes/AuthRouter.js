const { register, login } = require("../Controllers/AuthController");
const { registerValidation, loginValidation } = require("../Middleware/AuthValidation");

const router = require("express").Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation,login);

module.exports = router;