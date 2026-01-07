import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Task } from '../task.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private storageKey = 'tasks';
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$ = this.tasksSubject.asObservable();

  private loadTasks(): Task[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private save(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  addTask(task: Task) {
    this.save([...this.tasksSubject.value, task]);
  }

  updateTask(task: Task) {
    this.save(
      this.tasksSubject.value.map(t => t.id === task.id ? task : t)
    );
  }

  deleteTask(id: number) {
    this.save(this.tasksSubject.value.filter(t => t.id !== id));
  }

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  /** 🔍 Filtered tasks */
  filteredTasks$ = combineLatest([this.tasks$, this.search$]).pipe(
    map(([tasks, search]) =>
      tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      )
    )
  );

  setSearch(value: string) {
    this.searchSubject.next(value);
  }
}
