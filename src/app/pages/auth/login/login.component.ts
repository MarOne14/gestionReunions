import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  capsLockWarning: boolean = false;
  showPopup : boolean = false;
  showPopup1 : boolean = false;
  form: FormGroup;


  constructor(
    private authService: AuthService, 
    private userService : UserService, 
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
    })
  }
  
  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;

      this.userService.getAllUsers().subscribe(users => {
        console.log('All users:', users);
        const user = users.find(u => u.email === email && u.password === password);
        console.log('Matching user:', user); 

        if (user) {
          // log the user in and store the token
          this.authService.login(email, password).subscribe(
            response => {
              /* store the token in the browser's local storage
              this.authService.setToken(response.token);*/
      
              // navigate to the home page
              this.router.navigate(['/menu']);
          },
          error => {
            console.log('Error logging in:', error);
          }
          );}
          else {
            this.showPopup = true;
        }
      })
      }
      else {
        this.showPopup1 = true;
      }
    }
    
     
  
  
  /*onSubmit() {
    if (this.form.valid) {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.userService.getAllUsers().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // set flag to indicate that the user is logged in
        this.authService.login();
        // navigate to the home page
        this.router.navigate(['/menu']);
        
      } else {
        this.showPopup = true;
      }
    });
  }
    else
    this.showPopup1 = true;
  }*/

  

  onKeyUp(event: KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.getModifierState('CapsLock')) 
      this.capsLockWarning = true;
    } else {
      this.capsLockWarning = false;
    }
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
