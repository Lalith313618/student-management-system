import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() adminName = 'Admin';

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleAdminMenu = new EventEmitter<void>();

  onMenuClick() {
    this.toggleSidebar.emit();
  }

  onAdminClick() {
    this.toggleAdminMenu.emit();
  }
}
