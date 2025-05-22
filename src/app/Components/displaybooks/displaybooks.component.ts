import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';

@Component({
  selector: 'app-displaybooks',
  standalone: false,
  templateUrl: './displaybooks.component.html',
  styleUrl: './displaybooks.component.scss'
})
export class DisplaybooksComponent implements OnInit,OnChanges {
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() bookDetailChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() search: string = '';
  count:number = 0;
  books:any;
  filteredBooks: any;
  originalBooks: any;
  constructor(private book:BookService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search']) {
      if(this.search.trim()===''){
        this.filteredBooks=this.books
        return;
      }
      this.filteredBooks=this.books.filter((book: any) => {
        return book.bookName.toLowerCase().includes(this.search.toLowerCase().trim()) || book.author.toLowerCase().includes(this.search.toLowerCase().trim());
      });
  }
}
  ngOnInit(): void {
    this.getAllBooks();
    this.getAllBooksByPageNumber(1);
  }
  getAllBooks() {
    this.book.getAllBooks().subscribe((res:any) => {
      console.log(res);
      this.count = res.data.length;
      this.updateCount();
    }, (error) => {
      // Handle HTTP error
      console.error('Error fetching books:', error);
    });
  }
  getAllBooksByPageNumber(pageNumber:number) {
    this.book.getAllBooksByPageNumber(pageNumber).subscribe((res:any) => {
      console.log(res);
      this.books = res.data;
      this.filteredBooks=[...res.data];
      this.originalBooks = [...res.data];
    }, (error) => {
      // Handle HTTP error
      console.error('Error fetching books:', error);
    });
  }
  sortBooks(value:any) {
    if (value.target.value === 'price') {
      this.filteredBooks=this.books.sort((a: any, b: any) => a.discountPrice - b.discountPrice);
    }else if(value.target.value==='desc'){
      this.filteredBooks=this.books.sort((a: any, b: any) => b.discountPrice - a.discountPrice);

    } else {
      this.filteredBooks=this.originalBooks;
    }
  }
  updateCount() {
    this.countChange.emit(this.count);
  }
  onBookClick(book: any) {
    // Handle book click event here
    this.bookDetailChange.emit(book);
  }

}
