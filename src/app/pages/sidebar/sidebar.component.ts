import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/model/team';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  teams: Team[];
  isOpen = true;
  form: FormGroup;

  constructor(private router: Router, private sideBar: SidebarService,private teamService: TeamService) { 
    sideBar.toggleSidebar.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
  }
  
  /*******************/

  hide(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/menu3';
  }
  hide1() {
    const currentRoute = this.router.url;
    if (currentRoute === '/menu3')
      this.isOpen = false;
  }

  /*******************New Team*************/

  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
  
  onSubmit(){
    if(this.form.valid){
      const title = this.form.get('title').value;
      const spec = this.form.get('specia').value;
      const email = this.form.get('email').value;

     
    }
  }

}
