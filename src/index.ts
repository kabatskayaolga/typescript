class School {
  subjects: Subject[] = [];

  addSubject(subject: Subject): void {
    this.subjects.push(subject);
  }
}

class Subject {
  levels: Level[]= [];
  _name: string;


  get name(): string {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }
}

class Level {
  groups: Group[] = [];
  _name: string;
  _program: string;

  constructor(name: string, program: string) {
    this._name = name;
    this._program = program;
  }

  get name(): string {
    return this._name;
  }

  get program(): string {
    return this._program;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }
}

class Group {
  _students: Student[] = [];
  subjectName: string;
  levelName: string;

  get students(): Student[] {
    return this._students;
  }

  constructor(subjectName: string, levelName: string) {
    this.subjectName = subjectName;
    this.levelName = levelName;
  }

  addStudent(student: Student) {
    this._students.push(student);
  }

  showPerformance(): Student[] {
    // const sortedStudents: Student[] = this.students.toSorted( // error: Property 'toSorted' does not exist on type 'Student[]'. 
    const sortedStudents: Student[] = this.students.sort(
      (a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}

enum Grades {
  Excellent = 100,
  VeryGood = 80,
  Good = 60,
  Satisfy = 40,
  Sufficient = 20,
  NotSufficien = 0
}

class Student {
  grades: {[subject: string]: Grades} = {}; // subject have to be one of subjects[]._name ????
  attendance: boolean[] = [];
  
  firstName: string;
  lastName: string;
  birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean) {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this.attendance.filter((present: boolean) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
