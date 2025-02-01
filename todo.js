export default class Todo {
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

  constructor(title) {
    this.title = title;
  }

  test() {
    console.log(`Todo titled ${this.title}`);
  }
}
