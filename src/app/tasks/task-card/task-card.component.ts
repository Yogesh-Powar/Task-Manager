import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();

  constructor(private taskService: TaskService) { }

  getAvatar(task: Task): string {
    try {
      const idNum = Math.abs(Number(task.id) || Date.now());
      const avatarId = (idNum % 70) + 1; // pravatar has images in a limited range
      return `https://i.pravatar.cc/150?img=${avatarId}`;
    } catch {
      return 'https://i.pravatar.cc/150';
    }
  }

  editTask() {
    this.edit.emit(this.task);
  }
  
  deleteTask() {
    Swal.fire({
      title: 'Delete task?',
      text: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(this.task.id);
        Swal.fire({
          icon: 'success',
          title: 'Task Deleted!',
          text: 'Task has been deleted successfully.',
          confirmButtonText: 'OK',
        });
      }
    });
  }
}
