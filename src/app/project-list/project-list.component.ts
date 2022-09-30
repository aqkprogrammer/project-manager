import { Component, Input, OnInit } from '@angular/core';
import {
  faRemove,
  faPlusSquare,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  public projects: any = [];
  public taskFormdisplayStyle = 'none';
  public projectFormdisplayStyle = 'none';
  public projectId: any;
  public searchQuery: any;

  public removeIcon = faRemove;
  public plusIcon = faPlusSquare;
  public editIcon = faPencil;

  constructor(private sharedService: SharedService) {
    let dataFromStorage = this.sharedService.getDataFromStorage();
    if (Object.keys(dataFromStorage).length === 0) {
      this.sharedService.getProjects().subscribe((data) => {
        this.projects = data;
      });
    } else {
      this.projects = dataFromStorage;
    }
  }

  openProjectPopUp() {
    this.sharedService.setProjectData({});
    this.projectFormdisplayStyle = 'block';
  }

  getProjectById(projectId: any, index = false) {
    if (index) {
      return this.projects.findIndex((pro: any) => pro.id === projectId);
    } else {
      return this.projects.find((project: any) => project.id === projectId);
    }
  }

  addProject(project: any) {
    if (project.id) {
      let index = this.getProjectById(project.id, true);
      this.projects[index].name = project.name;
    } else {
      var lastProjectId = this.projects[this.projects.length - 1];
      project.id = lastProjectId.id + 1;
      this.projects.push(project);
    }
    this.projectFormdisplayStyle = 'none';
  }

  editProject(project: Object) {
    this.sharedService.setProjectData(project);
    this.projectFormdisplayStyle = 'block';
  }

  deleteProject(index: any) {
    this.projects.splice(index, 1);
  }

  openEditTask(projectId: any) {
    this.projectId = projectId;
    this.taskFormdisplayStyle = 'block';
  }

  deleteTask(params: any) {
    let project = this.getProjectById(params.projectId);
    project.tasks.splice(params.taskIndex, 1);
  }

  ngOnInit(): void {}

  openTaskPopUp(projectId: any) {
    this.projectId = projectId;
    this.taskFormdisplayStyle = 'block';
  }

  addTask(taskForm: any) {
    let project = this.getProjectById(this.projectId);
    if (taskForm.id) {
      let task = project.tasks.find((pro: any) => pro.id === taskForm.id);
      task.name = taskForm.name;
      task.status = taskForm.status;
      task.description = taskForm.description;
      task.children = taskForm.children;
    } else {
      let lastTaskId;
      if (project.length > 0) {
        lastTaskId = project.tasks[project.tasks.length - 1];
      }
      taskForm.id = lastTaskId ? lastTaskId.id + 1 : 1;
      project.tasks.push(taskForm);
    }
    this.taskFormdisplayStyle = 'none';
    this.projectId = '';
  }

  closePopup(event: any) {
    this.projectFormdisplayStyle = 'none';
    this.taskFormdisplayStyle = 'none';
  }

  search(): void {
    if (this.searchQuery) {
      let searchArr: any = [];
      this.projects.find((pro: any) => {
        if (pro.name.includes(this.searchQuery)) {
          searchArr.push(pro);
        } else {
          pro.tasks.find((task: any) => {
            if (task.name.includes(this.searchQuery)) {
              searchArr.push(pro);
            } else {
              task.children.find((child: any) => {
                if (child.name.includes(this.searchQuery)) {
                  searchArr.push(pro);
                }
              });
            }
          });
        }
      });
      this.projects = searchArr;
    } else {
      this.sharedService.getProjects().subscribe((data) => {
        this.projects = data;
      });
    }
  }

  reset() {
    this.searchQuery = '';
    this.sharedService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  saveData() {
    this.sharedService.saveDataToStorage(this.projects);
  }

  deleteData() {
    this.sharedService.deleteDataFromStorage();
  }
}
