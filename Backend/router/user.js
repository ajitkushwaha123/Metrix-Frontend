import { Router } from "express";

const router = Router();
router.get("usertest" , (req , res) => {
    res.send("Succesful");
})

export default router