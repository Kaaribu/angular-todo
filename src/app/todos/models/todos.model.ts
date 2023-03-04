export class Tasks {
public taskName: string;
public category: string;
public date: Date;
public priority: string;
public description: string;

constructor(taskName: string, category: string, date: Date, priority: string, description: string) {
  this.taskName = taskName;
  this.category = category;
  this.date = date;
  this.priority = priority;
  this.description = description;
}
}
