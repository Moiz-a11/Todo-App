import express from "express"

import {createTodo , todoFind ,updateTodo,deleteTodo} from "../controller/todoController.js"


const router = express.Router();

router.post("/create",createTodo);
     
router.get("/fetch",todoFind);

router.put("/update/:id",updateTodo);

router.delete("/delete/:id",deleteTodo);

export default router;