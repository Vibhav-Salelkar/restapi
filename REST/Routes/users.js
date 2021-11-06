import express from "express";
import {showUsers, createUser} from "../Controllers/users.js";

const router = express.Router();

router.get('/', showUsers);
router.post('/', createUser);

export default router;