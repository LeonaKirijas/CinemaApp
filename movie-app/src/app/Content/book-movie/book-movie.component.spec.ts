import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMovieComponent } from './book-movie.component';

describe('BookMovieComponent', () => {
  let component: BookMovieComponent;
  let fixture: ComponentFixture<BookMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
