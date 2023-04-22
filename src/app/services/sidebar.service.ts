import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle() {
    this.toggleSidebar.emit(true);
  }
}
