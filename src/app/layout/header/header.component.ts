import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private taskService: TaskService) { }
  
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.taskService.setSearch(value);
  }
}
