import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-complaints',
  imports: [CommonModule, DatePipe],
  templateUrl: './my-complaints.html',
  styleUrl: './my-complaints.css',
})
export class MyComplaints implements OnInit {
  complaints: any[] = [];
  activeTab: 'in-process' | 'resolved' = 'in-process';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http.get<any[]>(`http://localhost:8090/api/complaints/user/${userId}`)
        .subscribe({
          next: (data) => this.complaints = data,
          error: (error) => console.error('Error loading complaints', error)
        });
    }
  }

  get filteredComplaints() {
    return this.complaints.filter(c => 
      this.activeTab === 'in-process' 
        ? c.status === 'IN_PROGRESS' || c.status === 'PENDING'
        : c.status === 'RESOLVED'
    );
  }

  setActiveTab(tab: 'in-process' | 'resolved') {
    this.activeTab = tab;
  }
}
