import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/model/account';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  capsLockWarning: boolean = false;
  showPopup : boolean = false;
  showPopup1 : boolean = false;
  showPassword: boolean = false;
  currentRole : string;
  form: FormGroup;
  user : Account;


  constructor(
    private authService: AuthService, 
    private accountService : AccountService, 
    private router: Router, 
    private fb: FormBuilder
    ) {
    this.form = new FormGroup({

      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),

      password: new FormControl('',
        [
          Validators.required,
        ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.accountService.getAccountRoleByEmail(email).subscribe(
        (response: any) => {
          this.currentRole = response.data; // Assign the value from the response to the 'role' variable
        },
        (error: any) => {
          console.error(error);
        }
      );
  
      this.authService.login(email, password).subscribe(
        (response) => {
          // Authentication successful
          localStorage.setItem('userId', email);
          localStorage.setItem('role', this.currentRole);
          // Redirect to the desired page or perform any necessary actions
          this.router.navigate(['/menu']);
        },
        (error) => {
          // Authentication failed
          console.log(error); 
          // Display an error message or perform any necessary actions
          this.showPopup = true;
        }
      );
    } else {
      this.showPopup1 = true;
    }
  }
  
  

  onKeyUp(event: KeyboardEvent) {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLockWarning = capsOn;
  }
  
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  getErrorMessage(formControlName: string) {
    const formControl = this.form.get(formControlName);
    if (!formControl) return '';

    if (formControl.hasError('required')) {
      return 'This field is required';
    }

    if (formControl.hasError('email')) {
      return 'Invalid email';
    }
    return '';
  }

}
