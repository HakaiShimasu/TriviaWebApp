import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL: string = 'http://localhost:8000/api';

export interface Player {
  id: Number,
  name: String,
  answers: Number,
  points: Number
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(API_URL + '/players');
  }

  addPlayers(player): Observable<Player> {
    return this.http.post<Player>(API_URL + '/players', player);
  }

  deletePlayer(id): Observable<Player> {
    return this.http.delete<Player>(API_URL + "/players/"+ id);
  }
}
