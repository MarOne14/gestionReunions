import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService : AuthService, private router: Router, public sideBar: SidebarService) { }

  toggleSidebar() {
    this.sideBar.toggle();
  }
  hide(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/menu2' || currentRoute === '/menu1';
  }
  hide1(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/menu3';
  }

  /*******************New Meeting*************/
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
  selectedOffer: string;

  onSubmit() {
    if (this.selectedOffer === "offer1") {
      this.router.navigate(['menu1']);
    } else {
      this.router.navigate(['menu2']);
    }
  }

  /*******************check Attendees*************/
  showPopup1 = false;

  showForm1() {
    this.showPopup1 = true;
  }
  hideForm1() {
    this.showPopup1 = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
