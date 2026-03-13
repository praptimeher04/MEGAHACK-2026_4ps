import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-complaints',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-complaints.html',
  styleUrl: './my-complaints.css',
})
export class MyComplaints {
  activeTab: 'in-process' | 'resolved' = 'in-process';
  
  // Set to [] to show empty state as in the reference image
  complaints: any[] = []; 

  setActiveTab(tab: 'in-process' | 'resolved') {
    this.activeTab = tab;
  }
}
