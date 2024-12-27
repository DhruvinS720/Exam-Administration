const router = require("express").Router();
const { Register, Login } = require("../controllers/auth/auth_controller");

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
