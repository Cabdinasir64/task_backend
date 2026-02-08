import { db } from "../db/index.js";
import { tasks, type Task, type NewTask } from "../db/schema.js";
import { eq } from "drizzle-orm";

class TaskService {
  async createTask(data: NewTask): Promise<Task[]> {
    return await db.insert(tasks).values(data).returning();
  }

  async getAllTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    const result = await db.select().from(tasks).where(eq(tasks.id, id));
    return result[0];
  }

  async updateTask(id: number, data: Partial<NewTask>): Promise<Task[]> {
    return await db.update(tasks).set(data).where(eq(tasks.id, id)).returning();
  }

  async deleteTask(id: number): Promise<Task[]> {
    return await db.delete(tasks).where(eq(tasks.id, id)).returning();
  }
}

export const taskService = new TaskService();
