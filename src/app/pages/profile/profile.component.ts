import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account, RoleType } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';

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

  CurrentAccount: any = null;
  email : string ;
  role : RoleType;
  password : string ;
  accountId : any;
  form: FormGroup ;
  showPopup : boolean = false;

  
  constructor(private accountService: AccountService) {
      this.email = localStorage.getItem('userId');
      this.accountService.getAccountByEmail(this.email).subscribe(response => {
      this.CurrentAccount= response;
      this.role = this.CurrentAccount.role;
      this.password = this.CurrentAccount.mot_de_passe;
      console.log(this.CurrentAccount);
     
      // this.initializeForm();
    },
    (error) => {
      console.log(error);
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
      const email = this.form.get('email').value ? this.form.get('email').value : null;
      console.log('email:', email);
      console.log(this.email);
      
      if (email) {
        this.accountService.getAccountByEmail(email).subscribe((response) => {
          console.log('response:', response);
          if(response == "Account not found")
          {
            this.accountService.getAccountIDByEmail(this.email).subscribe((response) => {
              this.accountId = response.data[0].id;
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
          if (response !== "Account not found" && response.nom_utilisateur!=this.email ) {
            console.log('response:', response);
            console.log('email:', email);
            this.showPopup = true; // User already exists
          }
        });
      } else {
        this.accountService.getAccountIDByEmail(this.email).subscribe((response) => {
          this.accountId = response.data[0].id
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