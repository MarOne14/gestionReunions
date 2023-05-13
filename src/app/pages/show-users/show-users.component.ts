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

  accounts: Account[] = [];
  accountId : any;

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

  selectedAccount: Account | null = null;

  selectAccount(account: Account): void {
    this.selectedAccount = account;
  }

  deleteAccount(username: string): void {
    this.accountService.getAccountIDByEmail(username).subscribe((response) => {
      this.accountId = response.data});
    this.accountService.deleteAccount(this.accountId).subscribe(
      () => {
        this.showSnackBar('Account deleted successfully.');
        this.fetchAllAccounts(); // Refresh the account list after deletion
      },
      (error) => {
        console.log(error);
        this.showSnackBar('Error deleting account.');
      }
    );
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  modifyRole(account: Account): void {
    // Add your logic here to modify the account's role
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
