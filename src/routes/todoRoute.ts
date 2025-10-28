import {Router} from "express"
import {getAllTodo, createTodo, deleteTodo, updateTodo} from "../controllers/todoController.js"

const router = Router()

router.get("/", getAllTodo)
router.post("/", createTodo)
router.delete("/:id", deleteTodo)
router.patch("/:id", updateTodo)

export default router