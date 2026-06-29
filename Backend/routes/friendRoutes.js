import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addFriend,
  getFriends,
  removeFriend,
} from "../controller/friendController.js";

const router = express.Router();
router.post("/addFriend", authMiddleware, addFriend);
router.get("/getFriend", authMiddleware, getFriends);
router.delete("/:friendId", authMiddleware, removeFriend);

export default router;