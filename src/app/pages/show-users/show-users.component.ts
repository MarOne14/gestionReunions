import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  users: any[] = [];
  accounts: any[] = [];

  constructor(private accountService : AccountService , private userService : UserService){
  }

  

  ngOnInit() {
    this.fetchAllAccounts();
    this.fetchAllUsers();
  }

  fetchAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (response: any) => {
        this.accounts = response.data;
      //  console.log(this.accounts);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        console.log(response); // Log the response here
        this.users = response.data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  getUserAccount(user: User): { nom: string, prenom: string, email: string, role: string } {
    const account = this.accounts.find(acc => acc.username === user.email);
    if (account) {
      return {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: account.role
      };
    } else {
      return null;
    }
  }

  
/*
  getUserAccount(user: User): Account | null {
    const account = this.accounts.find(acc => acc.username === user.email);
    return account ? account : null;
  }*/

  getColor(str: string): string {
    // A simple hash function to generate a color based on the input string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash % 16777215).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
  }

  selectedUser: User | null = null;

  selectUser(user: User): void {
    this.selectedUser = user;
  }

}
