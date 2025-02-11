export default class Task {
  // TODO: Make Todo class
  // Fields:
  //  - title
  //  - description
  //  - status
  //  - priority (enum)
  //  - dueDate
  //  - ? subTodos (or a checklist)
  //  -
  // Methods:
  //  - setters/getters
  //

  // #subTaskCounter = 0;

  static PRIORITIES = ["low", "medium", "high"];

  constructor(
    id,
    title,
    description = "",
    dueDate = undefined,
    status = false,
    priority = "low",
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.priority = Task.PRIORITIES.includes(priority) ? priority : "low";
    // this.isSubTask = isSubTask;
    // this.subTasks = [];
    // this.#subTaskCounter = 0;
  }

  // updateTask(taskData) {
  //   const { title, description, priority, dueDate, status } = taskData;
  //
  //   // TODO: Validation, again, I'm not actually going to do this
  //
  //   // if (title !== undefined) task.title = title;
  //   // if (description !== undefined) task.description = description;
  //   // if (priority !== undefined) task.priority = priority;
  //   // if (dueDate !== undefined) task.dueDate = dueDate;
  //   // if (status !== undefined) task.status = status;
  //   //
  //   // return task;
  //   // Object.assign
  // }
  /* addSubTask(
    taskTitle,
    taskDesc,
    taskStatus,
    taskPriority,
    taskDueDate,
    isSubTask,
  ) {
    if (isSubTask) {
      console.log("Cannot create a subtask for a subtask.");
      return;
    }
    const task = new Task(
      this.#subTaskCounter++,
      taskTitle,
      taskDesc,
      taskStatus,
      taskPriority,
      taskDueDate,
      true,
    );

    this.taskList.push(task);
  } */

  // toJSON() {
  //   return {
  //     id: this.id,
  //     title: this.title,
  //     description: this.description,
  //     dueDate: this.dueDate,
  //     status: this.status,
  //     priority: this.priority,
  //   };
  // }

  test() {
    console.log(`Task titled ${this.title}`);
  }

  changeStatus() {
    return (this.status = !this.status);
  }
}
