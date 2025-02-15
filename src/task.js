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

  update(title, description, dueDate, status, priority) {
    // const { title, description, priority, dueDate, status } = taskData;

    // TODO: actually, i don't need validation here, and instead
    // write validation in the taskFactory instead, but for now will do

    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (priority !== undefined) this.priority = priority;
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (status !== undefined) this.status = status;
    //
    return this;
    // Object.assign
  }
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
