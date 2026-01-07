import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../task.model';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Input() task!: Task | null;
  @Output() save = new EventEmitter<Task>();
  @Output() close = new EventEmitter<void>();

  statuses: TaskStatus[] = ['todo', 'in-progress', 'done'];
  isFormValid(): boolean {
    return !!(
      this.task?.title?.trim() &&
      this.task?.description?.trim() &&
      this.task?.status
    );
  }

  submit(title?: any, description?: any, status?: any): void {
    if (!this.isFormValid()) {
      title?.control?.markAsTouched();
      description?.control?.markAsTouched();
      status?.control?.markAsTouched();
      return;
    }
    if (this.task) {
      this.save.emit(this.task);
    }
  }
}
