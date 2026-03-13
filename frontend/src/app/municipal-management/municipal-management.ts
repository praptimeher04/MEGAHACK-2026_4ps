import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-municipal-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './municipal-management.html',
  styleUrl: './municipal-management.css',
})
export class MunicipalManagementComponent implements OnInit {
  activeTab = 'dashboard';
  
  // Dashboard stats
  stats = {
    totalDepartments: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0
  };
  
  // Department data
  departments: any[] = [];
  cities: any[] = [];
  users: any[] = [];
  departmentForm = {
    cityId: '',
    municipalId: '',
    name: '',
    mobileNumber: '',
    locationLink: '',
    officeImages: '',
    pincode: '',
    address: '',
    assignedUserId: ''
  };
  
  // Complaint data
  complaints: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const userType = localStorage.getItem('userType');
    if (userType !== '2') {
      alert('Access denied. Municipal Management only.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadDashboardData();
    this.loadDepartments();
    this.loadCities();
    this.loadUsers();
    this.loadComplaints();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadDashboardData() {
    this.http.get<any>('http://localhost:8089/api/municipal-management/stats')
      .subscribe({
        next: (data) => {
          this.stats = data;
        },
        error: (error) => console.error('Error loading stats', error)
      });
  }

  loadDepartments() {
    this.http.get<any[]>('http://localhost:8089/api/admin/municipal-departments')
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.stats.totalDepartments = data.length;
        },
        error: (error) => console.error('Error loading departments', error)
      });
  }

  loadCities() {
    this.http.get<any[]>('http://localhost:8089/api/admin/cities')
      .subscribe({
        next: (data) => this.cities = data,
        error: (error) => console.error('Error loading cities', error)
      });
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8089/api/admin/users')
      .subscribe({
        next: (data) => this.users = data,
        error: (error) => console.error('Error loading users', error)
      });
  }

  loadComplaints() {
    this.http.get<any[]>('http://localhost:8089/api/municipal-management/complaints')
      .subscribe({
        next: (data) => {
          this.complaints = data;
          this.calculateComplaintStats();
        },
        error: (error) => console.error('Error loading complaints', error)
      });
  }

  calculateComplaintStats() {
    this.stats.totalComplaints = this.complaints.length;
    this.stats.pendingComplaints = this.complaints.filter(c => c.status === 'PENDING').length;
    this.stats.resolvedComplaints = this.complaints.filter(c => c.status === 'RESOLVED').length;
  }

  createDepartment() {
    this.http.post('http://localhost:8089/api/admin/municipal-departments', this.departmentForm)
      .subscribe({
        next: () => {
          alert('Department created successfully');
          this.departmentForm = {
            cityId: '',
            municipalId: '',
            name: '',
            mobileNumber: '',
            locationLink: '',
            officeImages: '',
            pincode: '',
            address: '',
            assignedUserId: ''
          };
          this.loadDepartments();
        },
        error: (error) => alert(error.error.message || 'Error creating department')
      });
  }

  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.http.delete(`http://localhost:8089/api/admin/municipal-departments/${id}`)
        .subscribe({
          next: () => {
            alert('Department deleted successfully');
            this.loadDepartments();
          },
          error: (error) => alert(error.error.message || 'Error deleting department')
        });
    }
  }

  updateComplaintStatus(complaintId: number, status: string) {
    this.http.put(`http://localhost:8089/api/municipal-management/complaints/${complaintId}/status`, { status })
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
