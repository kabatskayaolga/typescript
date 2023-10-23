// Вам необхідно написати додатокTodo list. У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток. Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.

// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні.

// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

enum Sort {
  STATUS = 'status',
  DATE = 'date',
}

interface IUpdateData {
  name: string | undefined;
  content: string | undefined;
}

class TodoList {
  private tasks: Task[] = [];

  addTask(data: IUpdateData): void {
    const { name, content } = data;
    if (!name || !content) throw new Error("Name or context can't be empty");

    const task = new Task(this.tasks.length, name, content);
    this.tasks.push(task);
  }

  deleteTask(taskId: Task['id']): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  editTask(taskId: Task['id'], data: IUpdateData): void {
    this.getTask(taskId).edit(data);
  }

  setDone(taskId: Task['id']): void {
    this.getTask(taskId).changeStatus();
  }

  getTask(taskId: Task['id']): Task {
    return this.tasks.find(task => task.id === taskId);
  }

  getTasks(): (Task | ProtectedTask)[] {
    return this.tasks;
  }

  getNumberOfAllTasks(): string {
    return `There are ${this.getTasks().length} tasks`;
  }

  getNumberOfnotDoneTasks(): string {
    return `There are ${this.tasks.filter(task => task.status).length} unfinished tasks`;
  }
}

class ToDoListExtendingBehavior {
  constructor(private readonly list: TodoList) { }

  findTask(searchRequest: string): Task[] {
    return this.list
      .getTasks()
      .filter(task => task.name.indexOf(searchRequest) >= 0 || task.content.indexOf(searchRequest) >= 0);
  }

  sortTasks(sort: Sort): Task[] {
    return this.list.getTasks().sort((a, b) => {
      if (sort === Sort.DATE) {
        if (a.createdDate < b.createdDate) {
          return -1;
        }
        if (a.createdDate > b.createdDate) {
          return 1;
        }
      } else {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
      }
    });
  }
}

class Task {
  protected _createdDate: string;
  protected editDate: string = undefined;
  public status: boolean = false;

  get name(): string {
    return this._name;
  }

  get content(): string {
    return this._content;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  constructor(
    public readonly id: number,
    protected _name: string,
    protected _content: string
  ) {
    this._createdDate = String(new Date());
  }

  edit(data: IUpdateData): void {
    this.handleEdit(data);
  }

  changeStatus(): void {
    this.status = !this.status;
  }

  protected handleEdit({ name, content }): void {
    if (name) this._name = name;
    if (content) this._content = content;
    this.editDate = new Date().toString();
  }
}

class ProtectedTask extends Task {
  override edit(data: IUpdateData): void {
    const confirmValue = confirm('Do you really want to change this task?');

    if (confirmValue) {
      this.handleEdit(data);
    }
  }
}
