import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: string;
  completed: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  // get all tasks
  getTasks(): Observable<Task[]> 
  
  {
    return this.http.get<Task[]>(this.apiUrl);
  }

  //Get single task by id
  getTask(id: number): Observable<Task> 
  {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Create new task
  createTask(task: Partial<Task>): Observable<any> 
  {
    return this.http.post(this.apiUrl, task);
  }

  // Update existing task
  updateTask(id: number, task: Partial<Task>): Observable<any> 
  
  {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  //delete a task
  deleteTask(id: number): Observable<any> 
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}