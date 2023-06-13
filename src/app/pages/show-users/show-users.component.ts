import { Component, OnInit } from '@angular/core';
import { Account, RoleType } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  accounts: any[] = [];
  accountId : any;
  idRole : any ;
  organisateur : string = "organisateur";

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchAllAccounts();
  }

  fetchAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getColor(str: string): string {
    // A simple hash function to generate a color based on the input string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash % 16777215).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
  }

  selectedAccount: any | null = null;
  username : string;

  selectAccount(account: any): void {
    this.selectedAccount = account;
    this.username = account.nom_utilisateur;
  }

  deleteAccount(): void {
    console.log(this.username);
    
    this.accountService.getAccountIDByEmail(this.username).subscribe((response) => {
      this.accountId = response.data[0].id
      console.log(this.accountId);
    this.accountService.deleteAccount(this.accountId).subscribe(
      () => {
        this.showSnackBar('Account deleted successfully.');
        this.fetchAllAccounts();
      },
      (error) => {
        console.log(error);
        this.showSnackBar('Error deleting account.');
      }
    );
  });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  modifyRole1(account: Account): void {
    console.log(this.selectAccount);
    
  }
  modifyRole(account: any): void {
    console.log(account);
    this.idRole=account.id;
   
    if (account.role === RoleType.PART) {
      // Promote the account from Participant to Organisateur
      account.role = RoleType.ORG;
    } else {
      // Demote the account from Organisateur to Participant
      account.role = RoleType.PART;
    }
  
    // Update the account in the database
    this.accountService.updateAccount(this.idRole, account).subscribe(
      () => {
        this.showSnackBar('Role updated successfully.');
      },
      (error) => {
        console.log(error);
        this.showSnackBar('Error updating role.');
      }
    );
  }
  
  
  promoteAccount(account: Account): void {
    // Promote the account from Organisateur to Administrateur
    account.role = RoleType.ADM;
  
    // Update the account in the database
    this.accountService.updateAccount(this.idRole, account).subscribe(
      () => {
        this.showSnackBar('Account promoted successfully.');
      },
      (error) => {
        console.log(error);
        this.showSnackBar('Error promoting account.');
      }
    );
  }
  
  demoteAccount(account: Account): void {
    // Demote the account from Organisateur to Participant
    account.role = RoleType.PART;
  
    // Update the account in the database
    this.accountService.updateAccount(this.idRole, account).subscribe(
      () => {
        this.showSnackBar('Account demoted successfully.');
      },
      (error) => {
        console.log(error);
        this.showSnackBar('Error demoting account.');
      }
    );
  }
  
  


  getRoleActionText(account: Account): string {
    switch (account.role) {
      case RoleType.ADM:
        return 'Demote';
      case RoleType.ORG:
        return 'Promote/Demote';
      case RoleType.PART:
        return 'Promote';
      default:
        return '';
    }
  }
}
