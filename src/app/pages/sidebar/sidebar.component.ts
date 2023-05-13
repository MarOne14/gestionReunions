import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  teams: any[]=[];
  isOpen = true;
  form: FormGroup;

  constructor(private router: Router, private sideBar: SidebarService,private teamService: TeamService) { 
    sideBar.toggleSidebar.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(
      (response) => {
        this.teams = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
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
