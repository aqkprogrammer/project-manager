import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  @Input() displayStyle: any;
  public editProjectData: any;
  public projectForm: any;
  @Output() addProject = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<string>();

  constructor(private sharedService: SharedService) {
    this.sharedService.getProjectData().subscribe((data) => {
      this.editProjectData = data;
      this.setForm();
    });
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.projectForm = new FormGroup({
      id: new FormControl(
        this.editProjectData?.id ? this.editProjectData?.id : ''
      ),
      name: new FormControl(
        this.editProjectData?.name ? this.editProjectData?.name : ''
      ),
      tasks: new FormControl(
        this.editProjectData?.tasks ? this.editProjectData?.tasks : []
      ),
    });
  }

  onSubmit(event: any): void {
    event.preventDefault();
    this.addProject.emit(this.projectForm.value);
    this.setForm();
  }
}
