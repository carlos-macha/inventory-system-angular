import { Component } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Product } from "../../models/product";

interface ReportItem extends Product {
  date: string;
  movement: '+' | '-';
}

@Component({
  standalone: true,
  selector: 'app-report',
  imports: [RouterModule, FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './report.html',
  styleUrls: ['./report.scss']
})
export class Report {
  items: ReportItem[] = [
    { code: '1001', name: 'Produto A', amount: 10, date: '2025-12-01', movement: '+' },
    { code: '1002', name: 'Produto B', amount: 5, date: '2025-12-03', movement: '-' },
    { code: '1003', name: 'Produto C', amount: 20, date: '2025-12-05', movement: '+' },
    { code: '1004', name: 'Produto D', amount: 8, date: '2025-12-07', movement: '+' },
    { code: '1005', name: 'Produto E', amount: 15, date: '2025-12-09', movement: '-' },
    { code: '1006', name: 'Produto F', amount: 12, date: '2025-12-11', movement: '+' },
    { code: '1007', name: 'Produto G', amount: 6, date: '2025-12-12', movement: '-' },
    { code: '1008', name: 'Produto H', amount: 18, date: '2025-12-13', movement: '+' },
    { code: '1009', name: 'Produto I', amount: 9, date: '2025-12-14', movement: '+' },
    { code: '1010', name: 'Produto J', amount: 11, date: '2025-12-15', movement: '-' },
  ];

  filteredItems: ReportItem[] = [...this.items];

  searchCode: string = '';
  startDate: string = '';
  endDate: string = '';

  filterItems() {
    this.filteredItems = this.items.filter(item => {
      const codeMatch = this.searchCode ? item.code === this.searchCode : true;
      const startMatch = this.startDate ? item.date >= this.startDate : true;
      const endMatch = this.endDate ? item.date <= this.endDate : true;
      return codeMatch && startMatch && endMatch;
    });
  }

  clearFilters() {
    this.searchCode = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredItems = [...this.items];
  }
}
