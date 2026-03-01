import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common'; 
import { TaskFormComponent } from '../task-form/task-form';
import { RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: true,
  imports: [CommonModule, TaskFormComponent, RouterModule] 
})
export class TaskListComponent {
  tasks$!: Observable<any[]>;
  showForm = false;
  selectedTask: any = null;

  constructor(private taskService: TaskService) {
    this.refreshTasks();
  }

  refreshTasks() {
    this.tasks$ = this.taskService.getTasks();
    this.closeForm();
  }

  openNewTaskForm() {
    this.selectedTask = { title: '', description: '', dueDate: '', completed: false };
    this.showForm = true;
  }

  editTask(task: any) {
    this.selectedTask = { ...task };
    this.showForm = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.refreshTasks());
  }

  closeForm() {
    this.showForm = false;
    this.selectedTask = null;
  }
  onSave() {
    this.refreshTasks();  // reload tasks from the server
  }
}
