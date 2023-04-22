import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpen = true;

  constructor(private router: Router, private sideBar: SidebarService) {
    sideBar.toggleSidebar.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

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

}
