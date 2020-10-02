import { Player, PlayerService } from '../player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

  players: Player[] = [];
  errorMessage: String;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers()
  }

  getPlayers() {
    this.playerService.getPlayers()
        .subscribe(
            (response: any)=> this.players = response.data,
            error          => this.errorMessage = <any>error,
            ()             => console.log(this.players)
        );
  }

  findPlayer(id): Player {
    return this.players.find(player => player.id === id);
  }

  appendPlayer(player : Player) {
    this.players.push(player)
  }

}
