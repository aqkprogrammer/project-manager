import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { faRemove, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Input() displayStyle: any;
  @Output() addTask = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<string>();

  public currentIndex: number = 0;
  public taskForm: any;
  public childForm: any;
  public editTaskData: any;
  public status: any = [
    { id: 'active', name: 'Active' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'completed', name: 'Completed' },
    { id: 'block', name: 'Block' },
  ];
  public removeIcon = faRemove;
  public plusIcon = faPlusSquare;

  public children = {
    id: '',
    name: '',
    status: '',
    description: '',
  };

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.sharedService.getTaskData().subscribe((data) => {
      this.editTaskData = data;
      this.setForm();
    });
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.childForm =
      this.editTaskData?.children?.length > 0 ? this.editTaskData.children : [];
    this.taskForm = this.fb.group({
      id: new FormControl(this.editTaskData?.id ? this.editTaskData?.id : ''),
      name: new FormControl(
        this.editTaskData?.name ? this.editTaskData?.name : '',
        [Validators.required]
      ),
      status: new FormControl(
        this.editTaskData?.status ? this.editTaskData?.status : '',
        [Validators.required]
      ),
      description: new FormControl(
        this.editTaskData?.description ? this.editTaskData?.description : '',
        [Validators.required]
      ),
      children:
        this.editTaskData?.children?.length > 0
          ? [this.editTaskData.children]
          : this.childForm,
    });
  }

  addSubTask() {
    this.childForm.push(this.children);
  }

  removeSubTask(index: any) {
    this.childForm.splice(index, 1);
  }

  onSubmit(event: any): void {
    event.preventDefault();
    // if (!this.taskForm.value.id) {
    this.taskForm.value.children = this.childForm;
    // }
    this.addTask.emit(this.taskForm.value);
    this.taskForm.reset();
    this.childForm = [];
  }
}
