import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Item {
  code: string;
  name: string;
  amount: number;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  items: Item[] = [
    { code: '1001', name: 'Produto A', amount: 10 },
    { code: '1002', name: 'Produto B', amount: 5 },
    { code: '1003', name: 'Produto C', amount: 20 }
  ];

  filteredItems: Item[] = [...this.items];
  newItem: Item = { code: '', name: '', amount: 0 };
  searchCode: string = '';

  editModalVisible = false;
  addModalVisible = false;
  subtractModalVisible = false;

  selectedItem!: Item;
  tempAmount: number = 0;

  addItem() {
    if (this.newItem.code && this.newItem.name && this.newItem.amount >= 0) {
      this.items.push({ ...this.newItem });
      this.filteredItems = [...this.items];
      this.newItem = { code: '', name: '', amount: 0 };
    }
  }

  filterItems() {
    if (!this.searchCode) {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item =>
        item.code === this.searchCode
      );
    }
  }

  clearSearch() {
    this.searchCode = '';
    this.filteredItems = [...this.items];
  }

  openEditModal(item: Item) {
    this.selectedItem = { ...item };
    this.editModalVisible = true;
  }

  saveEdit() {
    const index = this.items.findIndex(i => i.code === this.selectedItem.code);
    if (index !== -1) {
      this.items[index] = { ...this.selectedItem };
      this.filteredItems = [...this.items];
    }
    this.closeEditModal();
  }

  closeEditModal() {
    this.editModalVisible = false;
  }

  openAddModal(item: Item) {
    this.selectedItem = item;
    this.tempAmount = 0;
    this.addModalVisible = true;
  }

  addQuantity() {
    if (this.tempAmount > 0) {
      this.selectedItem.amount += this.tempAmount;
      this.filteredItems = [...this.items];
      this.closeAddModal();
    }
  }

  closeAddModal() {
    this.addModalVisible = false;
  }

  openSubtractModal(item: Item) {
    this.selectedItem = item;
    this.tempAmount = 0;
    this.subtractModalVisible = true;
  }

  subtractQuantity() {
    if (this.tempAmount > 0) {
      this.selectedItem.amount -= this.tempAmount;
      if (this.selectedItem.amount < 0) this.selectedItem.amount = 0;
      this.filteredItems = [...this.items];
      this.closeSubtractModal();
    }
  }

  closeSubtractModal() {
    this.subtractModalVisible = false;
  }
}
