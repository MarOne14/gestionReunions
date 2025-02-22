import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account, RoleType } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';


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
  showPassword : boolean = false;
  accountId: number;
  newAccount : any;

  constructor(private accountService: AccountService,private authService : AuthService ,private router: Router ) {
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
      const prenom = this.form.get('prenom').value;
      const nom = this.form.get('nom').value;
      const telephone = this.form.get('telephone').value;
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
  
      this.accountService.getAccountIDByEmail(email).subscribe((response) => {
        this.accountId = response.data
        if (this.accountId !== undefined) {
          this.showPopup = true; // Account already exists
        } else {
          this.newAccount = {
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            username: email,
            password: password,
            role: RoleType.PART,
          };
          console.log(this.newAccount);
          this.accountService.createAccount(this.newAccount).subscribe((data) => {
            localStorage.setItem('userId', data.username);
            this.authService.signup();
            this.authService.login(email, password).subscribe(
              (response) => {
                // Authentication successful
                localStorage.setItem('userId', email);
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
          });
        }
      });
    } else {
      this.showPopup1 = true; // Form validation error
    }
  }
  
  
  
  

  capsLockWarning: boolean = false;
  
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
