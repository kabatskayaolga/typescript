class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string;
    contacts: string;
  }[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string;
    contacts: string;
  }[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this.areas.push(area);
  }

  removeArea(name: AreaName): void {
    this.areas.filter(area => name !== area.name);
  }

  addLecturer(lecturer: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string;
    contacts: string;
  }): void {
    this.lecturers.push(lecturer);
  }

  removeLecturer(name: string): void {
    this.lecturers.filter(lecturer => name !== lecturer.name);
  }
}

enum AreaName {
  Development = 'Development',
  Management = 'Management',
  Design = 'Design',
  QA = 'QA',
}

class Area {
  _levels: Level[] = [];
  _name: AreaName;

  get name(): AreaName {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  constructor(name: AreaName) {
    this._name = name;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }

  removeLevel(name: LevelName): void {
    this.levels.filter(level => name !== level.name);
  }
}

enum LevelName {
  Junior = 'junior',
  Middle = 'middle',
  Senior = 'senior',
}

class Level {
  _groups: Group[] = [];
  _name: LevelName;
  _program: string;

  get name(): LevelName {
    return this._name;
  }

  get program(): string {
    return this._program;
  }

  get groups(): Group[] {
    return this._groups;
  }

  constructor(name: LevelName, program: string) {
    this._name = name;
    this._program = program;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  removeGroup(name: string): void {
    this.groups.filter(group => name !== group.directionName);
  }
}

enum Status {
  Active = 'active',
  InActive = 'inactive',
}
class Group {
  _area: Area;
  _status: Status;
  _students: Student[] = [];

  directionName: string;
  levelName: string;

  get students(): Student[] {
    return this._students;
  }

  get status(): Status {
    return this._status;
  }

  set status(status: Status) {
    status;
  }

  constructor(directionName: string, levelName: string, area: Area, status: Status) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
    this._status = status;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  removeStudent(name: string): void {
    this.students.filter(student => name !== student._firstName);
  }

  showPerformance(): Student[] {
    const sortedStudents: Student[] = this.students.toSorted(
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
  NotSufficien = 0,
}

class Student {
  _grades: Grades[] = [];
  _visits: boolean[] = [];

  _firstName: string;
  _lastName: string;
  _birthYear: number;

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  get grades(): Grades[] {
    return this._grades;
  }

  set grades(mark: Grades) {
    this.grades.push(mark);
  }

  get visits(): boolean[] {
    return this._visits;
  }

  set visits(present: boolean) {
    this.visits.push(present);
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this._visits.filter((present: boolean) => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
