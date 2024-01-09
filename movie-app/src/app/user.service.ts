import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEmailSource = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSource.asObservable();

  setUserEmail(email: string | null) {
    this.userEmailSource.next(email);
  }
}
