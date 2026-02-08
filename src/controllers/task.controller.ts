import { Request, Response } from "express";
import { taskService } from "../services/task.service.js";

class TaskController {
  createTask = async (req: Request, res: Response) => {
    try {
      const newTask = await taskService.createTask(req.body);
      res.status(201).json(newTask[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  };

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const allTasks = await taskService.getAllTasks();
      res.status(200).json(allTasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const task = await taskService.getTaskById(id);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const updatedTask = await taskService.updateTask(id, req.body);

      if (!updatedTask || updatedTask.length === 0) {
        return res
          .status(404)
          .json({ error: "Task not found or update failed" });
      }

      res.status(200).json(updatedTask[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const deletedTask = await taskService.deleteTask(id);

      if (!deletedTask || deletedTask.length === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  };
}

export const taskController = new TaskController();
