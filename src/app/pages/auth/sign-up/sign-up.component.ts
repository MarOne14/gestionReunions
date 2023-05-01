import { FormStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Account, RoleType } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  nom: string;
  prenom: string;
  telephone: number;
  email: string;
  password: string;
  confirmPassword: string;
  role : RoleType;
  form: FormGroup;
  showPopup : boolean = false;
  showPopup1 : boolean = false;
  passwordsMatch :boolean = false;

  constructor(private aacService: AccountService,private userService : UserService, private router: Router, private fb: FormBuilder ) {
    this.form = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      telephone: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }
  ngOnInit() {
    this.form = new FormGroup({
      nom: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*')
        ]),

      prenom: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*')
        ]),

      telephone: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('[0-9]*')
        ]),

      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),

      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$')
        ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  
  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
  
      this.userService.getAllUsers().subscribe(users => {
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
          // show error message
          this.showPopup = true;
        } 
        else {
          if (this.form.get('password').value !== this.form.get('confirmPassword').value) {
            this.passwordsMatch = true;
            return;
          }
          else{
            localStorage.setItem('userId', email);
          // create new user and account
          const user: User = {
            nom: this.form.get('nom').value,
            prenom: this.form.get('prenom').value,
            telephone: this.form.get('telephone').value,
            email: this.form.get('email').value
          };
          const account: Account = {
            username: this.form.get('email').value,
            password: this.form.get('password').value,
            role: RoleType.PART
          };
          this.userService.createUser(user,account).subscribe(
            () => {
              // navigate to the menu page after successful signup
              this.router.navigate(['/menu']);
            },
            error => {
              console.error(error);
            }
          );
        }
        }
    });
    }
    else
    this.showPopup1 = true;
  }
  

  capsLockWarning: boolean = false;
  
  onKeyUp(event: KeyboardEvent) {
    
  }  
  
 

  getErrorMessage(formControlName: string) {
    const formControl = this.form.get(formControlName);
    if (!formControl) return '';

    if (formControl.hasError('required')) {
      return 'This field is required';
    }

    if (formControl.hasError('minlength')) {
      return `Minimum length should be ${formControl.errors?.['minlength'].requiredLength}`;
    }

    if (formControl.hasError('maxlength')) {
      return `Maximum length should be ${formControl.errors?.['maxlength'].requiredLength}`;
    }

    if (formControl.hasError('pattern')) {
      return 'Invalid input';
    }

    if (formControl.hasError('email')) {
      return 'Invalid email';
    }

    return '';
  }

}
