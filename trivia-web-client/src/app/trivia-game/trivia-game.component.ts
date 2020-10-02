import { TriviaService } from '../trivia.service';
import { Player, PlayerService } from '../player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

  players: Player[] = [];
  errorMessage: String = '';
  isLoading: boolean = true;
  question: any[] = [];

  constructor(private playerService: PlayerService,
              private triviaService: TriviaService) { }

  ngOnInit() {
    this.getPlayers()
    //this.getQuestion();
  }

  /*getQuestion(){
    this.triviaService
      .getQuestion()
      .subscribe(
        (response: any) => this.question = response.data,
        error => this.errorMessage = <any>error,
        () => console.log(this.question)
      );
  }*/

  getPlayers() {
    this.playerService.getPlayers()
        .subscribe(
            (response: any)=> {
              this.players = response.data
              this.isLoading = false;
            },
            error          => {
              this.errorMessage = <any>error,
              this.isLoading = false;
            }
        );
  }

  deletePlayers(id) {
    let player = this.findPlayer(id);
    this.playerService.deletePlayer(id)
      .subscribe(
        response => {
          let index = this.players.findIndex(player => player.id === id)
          this.players.splice(index, 1)
        },
        error => this.errorMessage = <any>error,
      );
  }

  findPlayer(id): Player {
    return this.players.find(player => player.id === id);
  }

  appendPlayer(player : Player) {
    this.players.push(player)
  }
}
