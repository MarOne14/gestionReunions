import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';


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
  form: FormGroup;


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

      this.accountService.getAllAccounts().subscribe(users => 
        {
          console.log('All users:', users);
          const user = users.find(u => u.username === email && u.password === password);
          console.log('Matching user:', user); 

          if (user) {
            localStorage.setItem('userId', user.username);
            this.authService.authenticate(email, password).subscribe((result: boolean) => {
              if (result) {
                this.authService.login();
              }
            });
          } else {
            this.showPopup = true;
          }
         })
      }
      else {
        this.showPopup1 = true;
      }
    }
  onKeyUp(event: KeyboardEvent) {
    const capsOn = event.getModifierState('CapsLock');
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
