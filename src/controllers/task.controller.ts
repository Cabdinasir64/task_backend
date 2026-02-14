import { Request, Response } from "express";
import { taskService } from "../services/task.service.js";
import logger from "../logger.js";

class TaskController {
  createTask = async (req: Request, res: Response) => {
    try {
      const newTask = await taskService.createTask(req.body);

      logger.info(`Task created successfully`);

      res.status(201).json(newTask[0]);
    } catch (error) {
      logger.error("Failed to create task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  };

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const allTasks = await taskService.getAllTasks();

      logger.info(`Fetched all tasks successfully`);

      res.status(200).json(allTasks);
    } catch (error) {
      logger.error("Failed to fetch tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const task = await taskService.getTaskById(id);

      if (!task) {
        logger.warn(`Task not found with ID: ${id}`);
        return res.status(404).json({ error: "Task not found" });
      }

      logger.info(`Task retrieved successfully: ${id}`);
      res.status(200).json(task);
    } catch (error) {
      logger.error(`Error retrieving task ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const updatedTask = await taskService.updateTask(id, req.body);

      if (!updatedTask || updatedTask.length === 0) {
        logger.warn(`Attempted to update non-existent task ID: ${id}`);
        return res.status(404).json({ error: "Task not found" });
      }

      logger.info(`Task updated successfully`);
      res.status(200).json(updatedTask[0]);
    } catch (error) {
      logger.error(`Failed to update task ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to update task" });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const deletedTask = await taskService.deleteTask(id);

      if (!deletedTask || deletedTask.length === 0) {
        logger.warn(`Attempted to delete non-existent task ID: ${id}`);
        return res.status(404).json({ error: "Task not found" });
      }

      logger.info(`Task deleted successfully`);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      logger.error(`Failed to delete task ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  };
}

export const taskController = new TaskController();
