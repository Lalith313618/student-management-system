import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({

  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
  
})
export class StudentComponent implements OnInit {
  student: Student = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    gender: '',
    department: '',
    year: '',
    dob: '',
    status: '',
    address: '',
  };
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchName = '';
  searchDepartment = '';
  searchYear = '';
  searchStatus = '';

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
      this.filteredStudents = [...students];
      this.cdr.markForCheck();
    });
    this.studentService.loadStudents();
  }

  saveStudent(): void {
    console.log('SAVE BUTTON CLICKED');
    if (
      !this.student.name ||
      !this.student.email ||
      !this.student.mobile ||
      !this.student.department ||
      !this.student.year ||
      !this.student.status
    ) {
      alert('Please fill all details');
      return;
    }
    const newStudent: Student = {
      ...this.student,
      id: 0,
      mobile: String(this.student.mobile),
      createdAt: new Date().toISOString(),
    };

    console.log('Sending student:', newStudent);
    this.studentService.addStudent(newStudent).subscribe({
      next: (savedStudent) => {
        console.log('Student saved successfully:', savedStudent);

        this.studentService.loadStudents();
        this.resetForm();
      },

      error: (error) => {
        console.error('SAVE ERROR:', error);

        alert('Failed to add student');
      },
    });
  }
  updateStudent(): void {
    console.log('UPDATE BUTTON CLICKED');

    if (this.student.id === 0) {
      alert('Select student to update');

      return;
    }
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: () => {
        console.log('Student updated');

        this.studentService.loadStudents();
        this.resetForm();
        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('UPDATE ERROR:', error);
        alert('Failed to update student');
      },
    });
  }
  resetForm(): void {
    this.student = {
      id: 0,
      name: '',
      email: '',
      mobile: '',
      gender: '',
      department: '',
      year: '',
      dob: '',
      status: 'Active',
      address: '',
    };
    this.cdr.markForCheck();
  }
  editStudent(data: Student): void {
    this.student = {
      ...data,
    };

    this.cdr.markForCheck();
  }
  deleteStudent(id: number): void {
    console.log('DELETE BUTTON CLICKED:', id);

    const confirmDelete = confirm('Are you sure you want to delete?');
    if (!confirmDelete) {
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        console.log('Student deleted');
        this.studentService.loadStudents();
        if (this.student.id === id) {
          this.resetForm();
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('DELETE ERROR:', error);
        alert('Failed to delete student');
      },
    });
  }
  applySearch(): void {
    this.filteredStudents = this.students.filter((student) => {
      const nameMatch = student.name.toLowerCase().includes(this.searchName.toLowerCase());
      const departmentMatch =
        !this.searchDepartment ||
        student.department === this.searchDepartment;

      const yearMatch = !this.searchYear ||
      student.year === this.searchYear;
      const statusMatch = !this.searchStatus ||
      student.status === this.searchStatus;
      return nameMatch && departmentMatch && yearMatch && statusMatch;
    });

    this.cdr.markForCheck();
  }
  clearSearch(): void {
    this.searchName = '';
    this.searchDepartment = '';
    this.searchYear = '';
    this.searchStatus = '';
    this.filteredStudents = [...this.students];
    this.cdr.markForCheck();
  }
}
