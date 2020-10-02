import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TRIVIA_ENDPOINT: string = 'http://localhost:8000/question';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) { }

  getQuestion(){
    return this.http.get(TRIVIA_ENDPOINT);
  }
}
