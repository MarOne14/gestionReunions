import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account, RoleType } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /*************appearance**********/
  appear : boolean = true;
  
  Info = true;
  Achiv = false;

  showInfo() {
    this.Info = true;
    this.Achiv = false;
  }
  hideInfo() {
    this.Info = false;
    this.Achiv = true;
  }

  /*********************Show and Update*****************/
  
  CurrentUser: User = null;
  CurrentAccount: Account = null;
  email : string ;
  role : RoleType;
  password : string ;
  form: FormGroup ;
  showPopup : boolean = false;

  
  constructor(private userService : UserService , private accountService : AccountService) {
    this.email = localStorage.getItem('userId');
    this.userService.getUserByEmail(this.email).subscribe(response => {
      if (response && response.date.length > 0 ) {
        this.CurrentUser = response.date[0];
      }
    });
    this.accountService.getAccountByUsername(this.email).subscribe(response => {
      if (response && response.date.length > 0 ) {
        this.role = response.date[0].role;
        this.password = response.date[0].password;
      }
    });
  }
  ngOnInit() {
    this.form = new FormGroup({
      nom: new FormControl(
        { 
          value: '', 
          disabled: this.appear 
        },
        [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*')
        ]),

      prenom: new FormControl(
        { 
          value: '', 
          disabled: this.appear 
        },
        [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*')
        ]),

      telephone: new FormControl(
        { 
          value: '', 
          disabled: this.appear 
        },
        [
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('[0-9]*')
        ]),

      email: new FormControl(
        { 
          value: '', 
          disabled: this.appear 
        },
        [
          Validators.email
        ]),

        password: new FormControl('',
          [
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$')
          ])
    });
  }



  update(){
      const prenom = this.form.get('prenom').value ? this.form.get('prenom').value : this.CurrentUser.prenom;
      const nom = this.form.get('nom').value ? this.form.get('nom').value : this.CurrentUser.nom; 
      const telephone = this.form.get('telephone').value ? this.form.get('telephone').value : this.CurrentUser.telephone
      const email = this.form.get('email').value ;

    if(email) {
      this.accountService.getAccountByUsername(email).subscribe((user) => {
        if (user !== null && user.username !== this.email) 
          this.showPopup = true; // User already exists
        });
        } else {
          const email1 = this.CurrentUser.email;
          const newUser: User = {
            prenom: prenom,
            nom: nom,
            telephone: telephone,
            email: email1,
          };
          this.userService.updateUser(newUser).subscribe(() => {
            const newAccount: Account = {
              username: email1,
              password: this.password,
              role : this.role
            };
  
            this.accountService.updateAccount(newAccount).subscribe(() => {
              localStorage.setItem('userId', email1);
              this.appear = true;
            });
          });
        }
        
  }

  cancel(){
    this.appear = !this.appear;
    if (this.appear) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  toggleEdit() {
    this.appear = !this.appear;
    if (this.appear) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  getErrorMessage(formControlName: string) {
    const formControl = this.form.get(formControlName);
    if (!formControl) return '';

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