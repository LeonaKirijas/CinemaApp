import { TestBed } from '@angular/core/testing';

import { DataServiceOfOneMovie } from './data-of-one-movie.service';

describe('DataOfOneMovieService', () => {
  let service: DataServiceOfOneMovie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServiceOfOneMovie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
