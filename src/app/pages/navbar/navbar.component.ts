import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  CurrentUser: Account = null;
  email : string ;

  
  constructor(private userService : AccountService, private authService : AuthService, private router: Router, public sideBar: SidebarService) {
    this.email = localStorage.getItem('userId');
    this.userService.getAccountByEmail(this.email).subscribe(response => {
      if (response && response.date.length > 0 ) {
        this.CurrentUser = response.date[0];
      }
    });
  }

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
