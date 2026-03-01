import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskDetailsComponent } from './components/task-details/task-details';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  { path: 'tasks', component: TaskListComponent },
  { path: 'add', component: TaskFormComponent },

  
  { path: 'tasks/:id', component: TaskDetailsComponent }
];