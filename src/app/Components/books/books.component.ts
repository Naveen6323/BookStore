import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';
import { DisplaybooksComponent } from '../displaybooks/displaybooks.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  totalItems = 0; // total number of items
  pageSize = 10;    // items per page
  totalPages = 0;
  currentPage = 1;
  visiblePages: number[] = [];
  @ViewChild(DisplaybooksComponent) display!: DisplaybooksComponent;
  @Output() bookDetailChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() search:string = '';
  
  constructor(private book:BookService) { }
  ngOnInit():void {

    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updateVisiblePages();
  }
  ngAfterViewInit() {
    this.book.getAllBooks().subscribe((res:any) => {
      console.log(res);
      this.totalItems = res.data.length; // Update the total items
      this.totalPages = Math.ceil(this.totalItems / this.pageSize); 
      this.updateVisiblePages();  
    });
    setTimeout(() => {
      console.log('Updated count:', this.totalItems); // Debugging line
    }, 0);  
  }
  onSortChange(value: any) {
    this.display.sortBooks(value); // Call the sortBooks method in the child component
  }
  onCountChange(count: number) {
    this.totalItems = count;  // Update the count when the event is emitted
    console.log('Updated count from child:', this.totalItems);
  }
  // Add any component-specific logic here
  onBookDetailReceived(book: any) {
    console.log('Book received:', book); // Debugging line
    this.bookDetailChange.emit(book); // Emit the book detail to the parent component
  }
  onPageChange(event: PageEvent) {
    this.display.getAllBooksByPageNumber(event.pageIndex); // Call the method in the child component
    console.log('Page changed:', event); // Debugging line
  }
   goToPage(page: number) {
    this.currentPage = page;
    this.display.getAllBooksByPageNumber(this.currentPage); // Call the method in the child component
    this.updateVisiblePages();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.display.getAllBooksByPageNumber(this.currentPage); // Call the method in the child component
      this.updateVisiblePages();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.display.getAllBooksByPageNumber(this.currentPage); // Call the method in the child component
      this.updateVisiblePages();
    }
  }
  updateVisiblePages() {
    const maxButtons = 10;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  
}
