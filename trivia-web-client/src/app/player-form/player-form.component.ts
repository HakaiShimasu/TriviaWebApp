import { PlayerService, Player } from '../player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  errors: string = '';
  isLoading: boolean = false;

  constructor(private playerService: PlayerService) { }

  @Output()
  playerAdded: EventEmitter<Player> = new EventEmitter<Player>();

  ngOnInit(): void {
  }

  addPlayer(name){
    this.isLoading = true;
    this.playerService
      .addPlayers({
        name: name
      }).subscribe(
        player => {
          this.isLoading = false;
          this.playerAdded.emit(player)
        },
        error  => this.errors = error.json().errors
      );
  }

}