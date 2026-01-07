import { Component } from '@angular/core';
import { map } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {
  showModal = false;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  todo$ = this.taskService.filteredTasks$.pipe(
    map(tasks => tasks.filter(t => t.status === 'todo'))
  );

  inProgress$ = this.taskService.filteredTasks$.pipe(
    map(tasks => tasks.filter(t => t.status === 'in-progress'))
  );

  done$ = this.taskService.filteredTasks$.pipe(
    map(tasks => tasks.filter(t => t.status === 'done'))
  );

  openNewTask(): void {
    this.selectedTask = {
      id: 0,
      title: '',
      description: '',
      status: 'todo'
    };
    this.showModal = true;
  }

  openEditTask(task: Task): void {
    this.selectedTask = { ...task };
    this.showModal = true;
  }

  saveTask(task: Task): void {
    if (task.id) {
      this.taskService.updateTask(task);
      Swal.fire({
        icon: 'success',
        title: 'Task Updated!',
        text: 'Your task has been updated successfully.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    } else {
      task.id = Date.now();
      this.taskService.addTask(task);
      Swal.fire({
        icon: 'success',
        title: 'Task Added!',
        text: 'New task has been added successfully.',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    }
    this.showModal = false;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTask = null;
  }
}
