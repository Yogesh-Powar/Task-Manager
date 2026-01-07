import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../task.model';
@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
  @Input() title!: string;
  @Input() tasks: Task[] | null = [];
  @Input() status!: 'todo' | 'in-progress' | 'done';
  @Output() edit = new EventEmitter<Task>();

  onEdit(task: Task) {
    this.edit.emit(task);
  }
}
