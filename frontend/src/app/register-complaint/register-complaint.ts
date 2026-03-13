import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-complaint.html',
  styleUrl: './register-complaint.css',
})
export class RegisterComplaint {
  isDropdownOpen = false;
  selectedCategory = 'Select category';
  
  categories = [
    'Infrastructure (Roads, Lights)',
    'Water Supply & Leakage',
    'Sanitation & Waste',
    'Public Safety',
    'Other'
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
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
      // Future logic: handle file preview or upload
    }
  }
}
