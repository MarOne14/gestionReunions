import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { RoleType } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  CurrentUser: any = null;
  email : string ;
  currentRole : string;

  
  constructor(private userService : AccountService, private authService : AuthService, private router: Router, public sideBar: SidebarService) {
    this.email = localStorage.getItem('userId');
    this.currentRole= localStorage.getItem('role');
    this.userService.getAccountByEmail(this.email).subscribe(response => {
      this.CurrentUser= response;
    },
    (error) => {
      console.log(error);
    });
  }
  
  toggleSidebar() {
    this.sideBar.toggle();
  }

  hide1(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/menu3';
  }

  hide2() : boolean{
    return this.currentRole == RoleType.ADM
  }

  hide3() : boolean{
    return this.currentRole == RoleType.ADM || this.currentRole == RoleType.ORG
  }

  /*******************New Meeting*************/
  showPopup = false;
  show : boolean = true;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
    this.selectedOffer = null;
  }
  selectedOffer: string;

  onSubmit() {
    if (this.selectedOffer === "offer1") {
      this.router.navigate(['plan/urgent']);
    } else {
      this.router.navigate(['plan/schedule']);
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
