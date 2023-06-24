import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLogged: boolean = false;
  email: string = "";
}
