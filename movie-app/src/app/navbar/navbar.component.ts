import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = '';

  constructor(private dataService: DataService) {}

  onSearchInput() {
    this.dataService.setSearchTerm(this.searchTerm);
  }
} 
