import Task from "./task";

// TODO: Consider switching from facroty to builder pattern
//
export default class TaskFactory {
  static createTask(taskId, taskData) {
    const { title, description, dueDate, status, priority } = taskData;

    return new Task(taskId, title, description, dueDate, status, priority);
  }

  static updateTask(task, taskData) {
    const { title, description, dueDate, status, priority } = taskData;

    // TODO: Validation, again, I'm not actually going to do this
    // TODO: Or maybe I shouldn't validate here, since I have validation
    // in the form on submit, however that is client side, maybe some
    // server side validation is needed

    // if (title !== undefined) task.title = title;
    // if (description !== undefined) task.description = description;
    // if (dueDate !== undefined) task.dueDate = new Date(dueDate);
    // if (status !== undefined) task.status = status;
    // if (priority !== undefined) task.priority = priority;
    //
    task.update(title, description, dueDate, status, priority);
    return task;

    // return task;
  }
}
