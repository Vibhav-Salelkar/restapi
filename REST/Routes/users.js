import express from "express";
import {showUsers, createUser, showUser, deleteUser} from "../Controllers/users.js";

const router = express.Router();

router.get('/', showUsers);
router.post('/', createUser);
router.get('/:id', showUser);
router.delete('/:id', deleteUser);

export default router;