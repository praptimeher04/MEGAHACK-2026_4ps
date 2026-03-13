import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-municipal-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './municipal-panel.html',
  styleUrl: './municipal-panel.css',
})
export class MunicipalPanelComponent implements OnInit {
  activeTab = 'dashboard';
  
  municipalDepartment: any = null;
  complaints: any[] = [];
  stats = {
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    inProgressComplaints: 0
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    
    if (userType !== '3') {
      alert('Access denied. Municipal user only.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadMunicipalDepartment(userId);
    this.loadComplaints();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadMunicipalDepartment(userId: string | null) {
    if (!userId) return;
    
    this.http.get<any>(`http://localhost:8089/api/municipal/department/${userId}`)
      .subscribe({
        next: (data) => {
          this.municipalDepartment = data;
        },
        error: (error) => {
          console.error('Error loading municipal department', error);
          alert('You are not assigned to any municipal department');
        }
      });
  }

  loadComplaints() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    this.http.get<any[]>(`http://localhost:8089/api/municipal/complaints/${userId}`)
      .subscribe({
        next: (data) => {
          this.complaints = data;
          this.calculateStats();
        },
        error: (error) => console.error('Error loading complaints', error)
      });
  }

  calculateStats() {
    this.stats.totalComplaints = this.complaints.length;
    this.stats.pendingComplaints = this.complaints.filter(c => c.status === 'PENDING').length;
    this.stats.resolvedComplaints = this.complaints.filter(c => c.status === 'RESOLVED').length;
    this.stats.inProgressComplaints = this.complaints.filter(c => c.status === 'IN_PROGRESS').length;
  }

  updateComplaintStatus(complaintId: number, status: string) {
    this.http.put(`http://localhost:8089/api/municipal/complaints/${complaintId}/status`, { status })
      .subscribe({
        next: () => {
          alert('Complaint status updated successfully');
          this.loadComplaints();
        },
        error: (error) => alert(error.error.message || 'Error updating complaint status')
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
