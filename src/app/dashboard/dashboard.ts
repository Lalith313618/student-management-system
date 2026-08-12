import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  students: Student[] = [];
  recentStudents: Student[] = []
  totalStudents = 0;
  activeStudents = 0;
  inactiveStudents = 0;
  newStudentsThisMonth = 0;
  selectedDepartment = '';
  selectedYear = '';
  selectedStatus = '';

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.updateDashboard();
        this.updateRecentStudents();
        this.cdr.markForCheck();
      },
    });
    this.studentService.loadStudents();
  }
  updateDashboard(): void {
    this.totalStudents = this.students.length;
    this.activeStudents = this.students.filter((student) => student.status === 'Active').length;
    this.inactiveStudents = this.students.filter((student) => student.status === 'Inactive').length;
    this.calculateNewStudents(this.students);
  }

  calculateNewStudents(students: Student[]): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    this.newStudentsThisMonth = students.filter((student) => {
    const dateValue = (student as any).createdAt || (student as any).createdDate;

      if (!dateValue) {
        return false;
      }
      const studentDate = new Date(dateValue);
      return studentDate.getMonth() === currentMonth && studentDate.getFullYear() === currentYear;
    }).length;
  }
  updateRecentStudents(): void {
    this.recentStudents = [...this.students];
    this.recentStudents.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || a.createdDate || 0).getTime();
      const dateB = new Date(b.createdAt || b.createdDate || 0).getTime();

      return dateB - dateA;
    });

    this.recentStudents = this.recentStudents.slice(0, 5);
  }

  applyFilter(): void {
    let filteredStudents = [...this.students];

    if (this.selectedDepartment !== '') {
      filteredStudents = filteredStudents.filter(
        (student) => student.department === this.selectedDepartment,
      );
    }

    if (this.selectedYear !== '') {
      filteredStudents = filteredStudents.filter((student) => student.year === this.selectedYear);
    }

    if (this.selectedStatus !== '') {
      filteredStudents = filteredStudents.filter(
        (student) => student.status === this.selectedStatus,
      );
    }

    this.totalStudents = filteredStudents.length;
    this.activeStudents = filteredStudents.filter((student) => student.status === 'Active').length;
    this.inactiveStudents = filteredStudents.filter(
      (student) => student.status === 'Inactive',
    ).length;

    this.calculateNewStudents(filteredStudents);
    this.recentStudents = [...filteredStudents];
    this.recentStudents.sort((a: any, b: any) => {

      const dateA = new Date(a.createdAt || a.createdDate || 0).getTime();
      const dateB = new Date(b.createdAt || b.createdDate || 0).getTime();
      return dateB - dateA;

    });

    this.recentStudents = this.recentStudents.slice(0, 5);
    this.cdr.markForCheck();
  }
}
