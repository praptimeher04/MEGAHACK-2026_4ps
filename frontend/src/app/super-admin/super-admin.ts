import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-super-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './super-admin.html',
  styleUrl: './super-admin.css',
})
export class SuperAdminComponent implements OnInit {
  activeTab = 'states';
  
  states: any[] = [];
  stateForm = { stateCode: '', stateName: '' };
  
  cities: any[] = [];
  cityForm = { stateId: '', cityCode: '', cityName: '' };
  
  municipalDepartments: any[] = [];
  municipalForm = {
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
  
  users: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const userType = localStorage.getItem('userType');
    if (userType !== '1') {
      alert('Access denied. Super admin only.');
      this.router.navigate(['/dashboard/home']);
      return;
    }
    this.loadStates();
    this.loadCities();
    this.loadMunicipalDepartments();
    this.loadUsers();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadStates() {
    this.http.get<any[]>('http://localhost:8089/api/admin/states')
      .subscribe({
        next: (data) => this.states = data,
        error: (error) => console.error('Error loading states', error)
      });
  }

  createState() {
    this.http.post('http://localhost:8089/api/admin/states', this.stateForm)
      .subscribe({
        next: () => {
          alert('State created successfully');
          this.stateForm = { stateCode: '', stateName: '' };
          this.loadStates();
        },
        error: (error) => alert(error.error.message || 'Error creating state')
      });
  }

  deleteState(id: number) {
    if (confirm('Are you sure you want to delete this state?')) {
      this.http.delete(`http://localhost:8089/api/admin/states/${id}`)
        .subscribe({
          next: () => {
            alert('State deleted successfully');
            this.loadStates();
          },
          error: (error) => alert(error.error.message || 'Error deleting state')
        });
    }
  }

  loadCities() {
    this.http.get<any[]>('http://localhost:8089/api/admin/cities')
      .subscribe({
        next: (data) => this.cities = data,
        error: (error) => console.error('Error loading cities', error)
      });
  }

  createCity() {
    this.http.post('http://localhost:8089/api/admin/cities', this.cityForm)
      .subscribe({
        next: () => {
          alert('City created successfully');
          this.cityForm = { stateId: '', cityCode: '', cityName: '' };
          this.loadCities();
        },
        error: (error) => alert(error.error.message || 'Error creating city')
      });
  }

  deleteCity(id: number) {
    if (confirm('Are you sure you want to delete this city?')) {
      this.http.delete(`http://localhost:8089/api/admin/cities/${id}`)
        .subscribe({
          next: () => {
            alert('City deleted successfully');
            this.loadCities();
          },
          error: (error) => alert(error.error.message || 'Error deleting city')
        });
    }
  }

  loadMunicipalDepartments() {
    this.http.get<any[]>('http://localhost:8089/api/admin/municipal-departments')
      .subscribe({
        next: (data) => this.municipalDepartments = data,
        error: (error) => console.error('Error loading municipal departments', error)
      });
  }

  createMunicipalDepartment() {
    this.http.post('http://localhost:8089/api/admin/municipal-departments', this.municipalForm)
      .subscribe({
        next: () => {
          alert('Municipal department created successfully');
          this.municipalForm = {
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
          this.loadMunicipalDepartments();
        },
        error: (error) => alert(error.error.message || 'Error creating municipal department')
      });
  }

  deleteMunicipalDepartment(id: number) {
    if (confirm('Are you sure you want to delete this municipal department?')) {
      this.http.delete(`http://localhost:8089/api/admin/municipal-departments/${id}`)
        .subscribe({
          next: () => {
            alert('Municipal department deleted successfully');
            this.loadMunicipalDepartments();
          },
          error: (error) => alert(error.error.message || 'Error deleting municipal department')
        });
    }
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8089/api/admin/users')
      .subscribe({
        next: (data) => this.users = data,
        error: (error) => console.error('Error loading users', error)
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
