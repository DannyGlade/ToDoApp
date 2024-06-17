type TaskType = {
  id: number;
  title: string;
  status: boolean;
};

export class TaskClass {
  id: number;
  title: string;
  status: boolean;

  constructor(task: TaskType) {
    this.id = task.id;
    this.title = task.title;
    this.status = task.status;
  }

  toggleStatus() {
    this.status = !this.status;
  }

}
