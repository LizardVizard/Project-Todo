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
  #subTaskCounter = 0;

  constructor(id, title, description, status, priority, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.status = status;
    // this.isSubTask = isSubTask;
    // this.subTasks = [];
    // this.#subTaskCounter = 0;
  }

  // addSubTask(
  //   taskTitle,
  //   taskDesc,
  //   taskStatus,
  //   taskPriority,
  //   taskDueDate,
  //   isSubTask,
  // ) {
  //   if (isSubTask) {
  //     console.log("Cannot create a subtask for a subtask.");
  //     return;
  //   }
  //   const task = new Task(
  //     this.#subTaskCounter++,
  //     taskTitle,
  //     taskDesc,
  //     taskStatus,
  //     taskPriority,
  //     taskDueDate,
  //     true,
  //   );
  //
  //   this.taskList.push(task);
  // }

  test() {
    console.log(`Task titled ${this.title}`);
  }
}
