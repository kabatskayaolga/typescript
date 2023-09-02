class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: {
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: string,
    courses: string,
    contacts: string
  }[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[]{
    return this._areas
  }
  addArea(area: Area): void {
    this.areas.push(area);
  }
  removeArea(name: string): void {
    this.areas.filter((area) => name !== area.name)
  }

  get lecturers() {
    return this._lecturers;
  }
  addLecturer(lecturer: {
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: string,
    courses: string,
    contacts: string
  }): void {
    this.lecturers.push(lecturer);
  }
  removeLecturer(name: string): void {
    this.lecturers.filter((lecturer) => name !== lecturer.name)
  }
}

class Area {
  _levels: Level[]= [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }

  removeLevel(name: string): void {
    this.levels.filter((level) => name !== level.name)
  }
}

class Level {
  _groups: Group[] = [];
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


  get groups(): Group[] {
    return this._groups
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  removeGroup(name: string): void {
    this.groups.filter((group) => name !== group.directionName)
  }
}

enum Status {
  Active = 'active',
  InActive = 'inactive'
}
class Group {
  _area: Area;
  _status: Status;
  _students: Student[] = [];

  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string, area: Area, status: Status) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
    this._status = status;
  }

  get students(){
    return this._students;
  }

  addStudent(student: Student) {
    this.students.push(student);
  }

  removeStudent(name: string): void {
    this.students.filter((student) => name !== student._firstName)
  }

  get status(): Status{
    return this._status
  }

  set status(status: Status){
    status
  }

  showPerformance(): Student[] {
    const sortedStudents: Student[] = this.students.toSorted( // error: Property 'toSorted' does not exist on type 'Student[]'. 
    // const sortedStudents: Student[] = this.students.sort(
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
  _grades: Grades[] = [];
  _visits: boolean[] = [];
  
  _firstName: string;
  _lastName: string;
  _birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }


  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  
  get grades(): Grades[]{
    return this._grades;
  }
  set grades(mark: Grades){
    this.grades.push(mark)
  }

  get visits(): boolean[]{
    return this._visits
  }
  set visits(present: boolean) {
    this.visits.push(present);
  }


  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this._visits.filter((present: boolean) => present).length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
