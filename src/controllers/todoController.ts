import type { Request, Response } from "express";
import TODO from "../models/todoModel.js";

export const getAllTodo = async (req: Request, res: Response) => {
  try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10
      const offset = (page-1)*limit
      const totalTodo = await TODO.countDocuments()
      const totalPages = Math.ceil(totalTodo / limit)
      const todo = await TODO.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
      res.status(200).json({
        todo,
        totalTodo,
        totalPages,
        offset,
        page,
        limit
    });
  } catch (err: any) {
    console.error("Error with getting todo list:", err);
    res.status(500).json({
      message: "Error with getting todo list",
      error: err.message || err,
    });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { name, description, deadline, completed, priority } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const addTodo = await TODO.create({
      name: name,
      description: description,
      deadline: deadline,
      completed: completed,
      priority: priority,
    });
    res.status(201).json(addTodo);
  } catch (err: any) {
    console.error(`Error with adding new todo`, err);
    res.status(500).json({ message: `Error with adding new todo`, err });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await TODO.findByIdAndDelete(id);
    return res.status(200).json(deleteTodo);
  } catch (err: any) {
    console.error("Error with deleting todo", err);
    return res.status(500).json({ message: "Error with deleting todo", err });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { name, description, deadline, completed, priority } = req.body;
    const { id } = req.params;
    const updateTodo = await TODO.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        deadline: deadline,
        completed: completed,
        priority: priority,
      },
      { new: true }
    );
    res.status(200).json(updateTodo);
  } catch (err: any) {
    console.error("Erro with updating todo", err);
    return res.status(500).json({ message: "Erro with updating todo", err });
  }
};
