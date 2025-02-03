import Task from "./task";

export default class TaskFactory {
  static createTask(taskId, taskData) {
    const { title, description, priority, dueDate, status } = taskData;

    return new Task(taskId, title, description, priority, dueDate, status);
  }

  static updateTask(task, taskData) {
    const { title, description, priority, dueDate, status } = taskData;

    // TODO: Validation, again, I'm not actually going to do this

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;

    return task;
  }
}
