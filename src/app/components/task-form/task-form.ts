import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate: string;
  completed: number; // 🔥 change to number
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent implements OnChanges {

  @Input() task: Task = { title: '', description: '', dueDate: '', completed: 0 }; // default 0
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task && this.task.dueDate) {
      this.task.dueDate = this.task.dueDate.substring(0, 10); // YYYY-MM-DD for <input type="date">
    }
  }

  submit() {
    // Convert completed to number just in case checkbox gives boolean
    const taskToSend = { ...this.task, completed: Number(this.task.completed) };

    if (taskToSend.id) {
      this.taskService.updateTask(taskToSend.id, taskToSend).subscribe(() => {
        this.save.emit();
      });
    } else {
      this.taskService.createTask(taskToSend).subscribe(() => {
        this.save.emit();
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}