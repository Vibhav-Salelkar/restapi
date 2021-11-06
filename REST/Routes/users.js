import express from "express";
import {showUsers, createUser, showUser} from "../Controllers/users.js";

const router = express.Router();

router.get('/', showUsers);
router.post('/', createUser);
router.get('/:id', showUser);

export default router;