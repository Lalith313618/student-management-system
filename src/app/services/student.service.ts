import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/students';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  loadStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe({
      next: (students) => {
        this.studentsSubject.next(students);
      },

      error: (error) => {
        console.error('GET students error:', error);
      },
    });
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  setStudents(students: Student[]): void {
    this.studentsSubject.next([...students]);
  }
}
