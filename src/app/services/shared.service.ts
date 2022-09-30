import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _projects: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _projectData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _taskData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  public setProjects(data: any) {
    this._projects.next(data);
  }

  public getProjects(): Observable<any> {
    return this._projects.asObservable();
  }

  public setProjectData(data: any) {
    this._projectData.next(data);
  }

  public getProjectData(): Observable<any> {
    return this._projectData.asObservable();
  }

  public setTaskData(data: any) {
    this._taskData.next(data);
  }

  public getTaskData(): Observable<any> {
    return this._taskData.asObservable();
  }

  public saveDataToStorage(data: any) {
    localStorage.setItem('projects', JSON.stringify(data));
  }

  public getDataFromStorage() {
    return JSON.parse(localStorage.getItem('projects') || '{}');
  }

  public deleteDataFromStorage() {
    localStorage.removeItem('projects');
  }
}
