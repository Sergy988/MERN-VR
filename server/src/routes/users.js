import express from "express";
import {
  deleteUser,
  getCurrentUser,
  getUser,
  subscribe,
  unsubscribe
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);

router.get("/find/:id", getUser);

router.get("/currentUser", verifyToken, getCurrentUser);

router.put("/sub/:id", verifyToken, subscribe);

router.put("/unsub/:id", verifyToken, unsubscribe);

export default router;