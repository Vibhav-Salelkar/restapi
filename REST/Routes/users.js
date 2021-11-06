import express from "express";
import {showUsers} from "../Controllers/users.js";

const router = express.Router();

router.get('/', showUsers);

export default router;