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

  CurrentAccount: Account = null;
  email : string ;
  role : RoleType;
  password : string ;
  accountId : any;
  form: FormGroup ;
  showPopup : boolean = false;

  
  constructor(private accountService: AccountService) {
    this.email = localStorage.getItem('userId');
    this.accountService.getAccountByEmail(this.email).subscribe(response => {
      if (response && response.data.length > 0) {
        this.CurrentAccount = response.data[0];
        this.role = this.CurrentAccount.role;
        this.password = this.CurrentAccount.password;
       // this.initializeForm();
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

  update() {
    if (this.form.valid) {
      const prenom = this.form.get('prenom').value ? this.form.get('prenom').value : this.CurrentAccount.prenom;
      const nom = this.form.get('nom').value ? this.form.get('nom').value : this.CurrentAccount.nom;
      const telephone = this.form.get('telephone').value ? this.form.get('telephone').value : this.CurrentAccount.telephone;
      const email = this.form.get('email').value;

      if (email) {
        this.accountService.getAccountByEmail(email).subscribe((user) => {
          if (user !== null && user.username !== this.email) {
            this.showPopup = true; // User already exists
          } else {
            this.accountService.getAccountIDByEmail(this.email).subscribe((response) => {
              this.accountId = response.data;
              const newAccount: Account = {
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                username: email,
                password: this.password,
                role: this.role
              };

              this.accountService.updateAccount(this.accountId, newAccount).subscribe(() => {
                localStorage.setItem('userId', email);
                this.appear = true;
              });
            });
          }
        });
      } else {
        this.accountService.getAccountIDByEmail(this.email).subscribe((response) => {
          this.accountId = response.data});
        const newAccount: Account = {
          nom: nom,
          prenom: prenom,
          telephone: telephone,
          username: this.email,
          password: this.password,
          role: this.role
        };

        this.accountService.updateAccount(this.accountId, newAccount).subscribe(() => {
          localStorage.setItem('userId', this.email);
          this.appear = true;
        });
      }
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