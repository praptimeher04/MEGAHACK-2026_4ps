import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-complaint.html',
  styleUrl: './register-complaint.css',
})
export class RegisterComplaint {
  isDropdownOpen = false;
  selectedCategory = 'Select category';
  customCategory = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  
  complaintData = {
    title: '',
    description: '',
    location: ''
  };
  
  categories = [
    'Infrastructure (Roads, Lights)',
    'Water Supply & Leakage',
    'Sanitation & Waste',
    'Public Safety',
    'Other'
  ];

  constructor(private http: HttpClient, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
    if (category !== 'Other') {
      this.customCategory = '';
    }
  }

  isOtherSelected(): boolean {
    return this.selectedCategory === 'Other';
  }

  openMap() {
    console.log('Opening Google Maps...');
    window.open('https://www.google.com/maps', '_blank');
  }

  triggerFileUpload(fileInput: HTMLInputElement) {
    console.log('Triggering system file picker...');
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File successfully selected:', file.name);
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  submitComplaint() {
    if (!this.complaintData.title || !this.complaintData.description || 
        this.selectedCategory === 'Select category' || !this.complaintData.location) {
      alert('Please fill all required fields');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first');
      return;
    }

    const finalCategory = this.selectedCategory === 'Other' ? this.customCategory : this.selectedCategory;

    const complaint = {
      userId: userId,
      title: this.complaintData.title,
      description: this.complaintData.description,
      category: finalCategory,
      customCategory: this.selectedCategory === 'Other' ? this.customCategory : '',
      location: this.complaintData.location,
      imageUrl: this.imagePreview || ''
    };

    console.log('Submitting complaint:', complaint);

    this.http.post('http://localhost:8090/api/complaints', complaint)
      .subscribe({
        next: (response) => {
          console.log('Complaint submitted successfully:', response);
          alert('Complaint submitted successfully! Status: In Progress');
          this.resetForm();
          this.router.navigate(['/dashboard/my-complaints']);
        },
        error: (error) => {
          console.error('Error submitting complaint:', error);
          alert(error.error?.message || error.message || 'Failed to submit complaint');
        }
      });
  }

  resetForm() {
    this.complaintData = { title: '', description: '', location: '' };
    this.selectedCategory = 'Select category';
    this.customCategory = '';
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
