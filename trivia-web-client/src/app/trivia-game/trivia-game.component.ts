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
  question: any;

  constructor(private playerService: PlayerService,
              private triviaService: TriviaService) { }

  ngOnInit() {
    this.getPlayers()
    this.getQuestion();
  }

  getQuestion(){
    this.triviaService
      .getQuestion()
      .subscribe(
        question => this.question = question[0],
        error => this.errorMessage = <any>error,
      );
  }

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
      this.getPlayers()
  }

  answer(id, data) {
    let player = this.findPlayer(id)
    this.playerService
      .answer(id, data)
      .subscribe(
        (response: any) => {
          player = response
          this.getPlayers()
        },
        error => this.errorMessage = <any>error
      )
  }

  rightAnswer(id) {
    let data = {
      correct: true
    }
    this.answer(id, data)
  }

  wrongAnswer(id) {
    let data = {
      correct: false
    }
    this.answer(id, data)
  }

  resetAnswers(){
    for(var i = 0; i < this.players.length; i++){
      let player = this.findPlayer(this.players[i].id)
      this.playerService
      .resetAnswer(player.id)
      .subscribe(
        (response: any) => {
          player = response
          console.log(player)
          this.getPlayers()
        },
        error => this.errorMessage = <any>error
        )
    }
  }
}
