import express from "express";
import {addSong,getAllSongs,getSongById,deleteSong, updateSong} from "../controllers/song.js";

const songRouter=express.Router();

router.get("/",getAllSongs);
router.get("/:id",getSongById);
router.delete("/:id",deleteSong);
router.post("/",addSong);
router.put("/:id",updateSong);


export default songRouter;