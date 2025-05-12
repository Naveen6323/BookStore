import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';
import { DisplaybooksComponent } from '../displaybooks/displaybooks.component';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  @ViewChild(DisplaybooksComponent) display!: DisplaybooksComponent;
  @Output() bookDetailChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() search:string = '';
  count:number = 0;
  constructor() { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.count = this.display.count;
      console.log('Updated count:', this.count); // Debugging line
    }, 0);  }
  
  onSortChange(value: any) {
    this.display.sortBooks(value); // Call the sortBooks method in the child component
  }
  onCountChange(count: number) {
    this.count = count;  // Update the count when the event is emitted
    console.log('Updated count from child:', this.count);
  }
  // Add any component-specific logic here
  onBookDetailReceived(book: any) {
    console.log('Book received:', book); // Debugging line
    this.bookDetailChange.emit(book); // Emit the book detail to the parent component
  }

}
