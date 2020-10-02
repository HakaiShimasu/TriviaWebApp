import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TriviaGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
