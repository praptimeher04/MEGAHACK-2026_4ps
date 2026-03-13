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
  activeTab = 'dashboard';
  showStateForm = false;


  states: any[] = [];
  stateForm = { stateCode: '', stateName: '' };

  cities: any[] = [];
  cityForm = { stateId: '', cityCode: '', cityName: '' };

  municipalDepartments: any[] = [];
  departments: any[] = [];
  showNewDeptModal: boolean = false;
  showNewMunicipalModal: boolean = false;
  showNewCityModal: boolean = false;
  showNewStateModal: boolean = false;
  
  indianStates = [
    { name: 'Andhra Pradesh', code: 'AP' }, { name: 'Arunachal Pradesh', code: 'AR' },
    { name: 'Assam', code: 'AS' }, { name: 'Bihar', code: 'BR' },
    { name: 'Chhattisgarh', code: 'CG' }, { name: 'Goa', code: 'GA' },
    { name: 'Gujarat', code: 'GJ' }, { name: 'Haryana', code: 'HR' },
    { name: 'Himachal Pradesh', code: 'HP' }, { name: 'Jharkhand', code: 'JH' },
    { name: 'Karnataka', code: 'KA' }, { name: 'Kerala', code: 'KL' },
    { name: 'Madhya Pradesh', code: 'MP' }, { name: 'Maharashtra', code: 'MH' },
    { name: 'Manipur', code: 'MN' }, { name: 'Meghalaya', code: 'ML' },
    { name: 'Mizoram', code: 'MZ' }, { name: 'Nagaland', code: 'NL' },
    { name: 'Odisha', code: 'OR' }, { name: 'Punjab', code: 'PB' },
    { name: 'Rajasthan', code: 'RJ' }, { name: 'Sikkim', code: 'SK' },
    { name: 'Tamil Nadu', code: 'TN' }, { name: 'Telangana', code: 'TG' },
    { name: 'Tripura', code: 'TR' }, { name: 'Uttar Pradesh', code: 'UP' },
    { name: 'Uttarakhand', code: 'UK' }, { name: 'West Bengal', code: 'WB' },
    { name: 'Delhi', code: 'DL' }, { name: 'Jammu & Kashmir', code: 'JK' },
    { name: 'Ladakh', code: 'LA' }, { name: 'Puducherry', code: 'PY' }
  ];

  deptForm = {
    municipalId: '',
    name: '',
    deptCode: '',
    category: ''
  };
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

  constructor(private router: Router, private http: HttpClient) { }

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
    this.loadDepartments();
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

  onStateNameChange() {
    const selected = this.indianStates.find(s => s.name === this.stateForm.stateName);
    if (selected) {
      this.stateForm.stateCode = selected.code;
    }
  }

  onStateCodeChange() {
    const selected = this.indianStates.find(s => s.code === this.stateForm.stateCode);
    if (selected) {
      this.stateForm.stateName = selected.name;
    }
  }

  openNewStateModal() {
    this.showNewStateModal = true;
    this.stateForm = { stateCode: '', stateName: '' };
  }

  closeNewStateModal() {
    this.showNewStateModal = false;
  }

  createState() {
    if (!this.stateForm.stateName || !this.stateForm.stateCode) {
      alert('Please fill all fields');
      return;
    }

    this.http.post('http://localhost:8089/api/admin/states', this.stateForm)
      .subscribe({
        next: (response) => {
          console.log('State created successfully', response);
          this.closeNewStateModal();
          this.loadStates();
        },
        error: (error) => {
          console.error('Error creating state', error);
          alert('Error: ' + (error.error?.message || error.message));
        }
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

  openNewCityModal() {
    this.showNewCityModal = true;
    this.cityForm = { stateId: '', cityCode: '', cityName: '' };
  }

  closeNewCityModal() {
    this.showNewCityModal = false;
  }

  createCity() {
    if (!this.cityForm.stateId || !this.cityForm.cityName || !this.cityForm.cityCode) {
      alert('Please fill all fields');
      return;
    }

    this.http.post('http://localhost:8089/api/admin/cities', this.cityForm)
      .subscribe({
        next: (response) => {
          console.log('City created successfully', response);
          this.closeNewCityModal();
          this.loadCities();
        },
        error: (error) => {
          console.error('Error creating city', error);
          alert('Error: ' + (error.error?.message || error.message));
        }
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

  loadDepartments() {
    this.http.get<any[]>('http://localhost:8089/api/admin/departments')
      .subscribe({
        next: (data) => this.departments = data,
        error: (error) => console.error('Error loading departments', error)
      });
  }

  openNewDeptModal() {
    this.showNewDeptModal = true;
  }

  closeNewDeptModal() {
    this.showNewDeptModal = false;
    this.deptForm = { municipalId: '', name: '', deptCode: '', category: '' };
  }

  saveDepartment() {
    if (!this.deptForm.municipalId || !this.deptForm.name || !this.deptForm.deptCode || !this.deptForm.category) {
      alert('Please fill all fields');
      return;
    }

    this.http.post('http://localhost:8089/api/admin/departments', this.deptForm)
      .subscribe({
        next: (response) => {
          console.log('Department created successfully', response);
          this.closeNewDeptModal();
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error creating department', error);
          alert('Error creating department: ' + (error.error?.message || error.message));
        }
      });
  }

  openNewMunicipalModal() {
    this.showNewMunicipalModal = true;
    this.municipalForm = { cityId: '', municipalId: '', name: '', mobileNumber: '', locationLink: '', officeImages: '', pincode: '', address: '', assignedUserId: '' };
  }

  closeNewMunicipalModal() {
    this.showNewMunicipalModal = false;
  }

  createMunicipalDepartment() {
    if (!this.municipalForm.cityId || !this.municipalForm.name || !this.municipalForm.municipalId) {
      alert('Please fill all required fields');
      return;
    }

    this.http.post('http://localhost:8089/api/admin/municipal', this.municipalForm)
      .subscribe({
        next: (response) => {
          console.log('Municipal entity created successfully', response);
          this.closeNewMunicipalModal();
          this.loadMunicipalDepartments();
        },
        error: (error) => {
          console.error('Error creating municipal entity', error);
          alert('Error: ' + (error.error?.message || error.message));
        }
      });
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
