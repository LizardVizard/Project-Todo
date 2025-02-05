export default class Validator {
  static validateProjectTitle(projectTitle) {
    const title = projectTitle.trim();
    if (typeof title === "string" && title.length > 0) {
      return title;
    } else {
      return;
    }
  }
}
