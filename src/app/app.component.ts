import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-manager';

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.httpClient.get('./assets/data/projects.json').subscribe((data) => {
      this.sharedService.setProjects(data);
    });
  }
}
