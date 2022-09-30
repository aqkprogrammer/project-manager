import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faRemove, faPencil } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @Input() tasks: any = [];
  @Input() projectId: any;
  @Output() deleteTask = new EventEmitter<object>();
  @Output() openEditTask = new EventEmitter<object>();

  public removeIcon = faRemove;
  public editIcon = faPencil;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  editTask(task: Object) {
    this.sharedService.setTaskData(task);
    this.openEditTask.emit(this.projectId);
  }

  removeTask(index: any) {
    this.deleteTask.emit({ taskIndex: index, projectId: this.projectId });
  }
}
