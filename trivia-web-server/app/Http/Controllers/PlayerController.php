<?php

namespace App\Http\Controllers;


use App\Http\Resources\PlayerCollection;
use Illuminate\Http\Request;
use App\Http\Resources\Player as PlayerResource;
use App\Models\Player;

class PlayerController extends Controller
{
    public function index(){
        return new PlayerCollection(Player::all());
    }

    /* Mostra un singolo giocatore utilizzando il suo id */
    public function show($id){
        return new PlayerResource(Player::findOrFail($id));
    }

    public function store(Request $request){
        
        $request->validate([
            /* Controllo di validita' sul nome */
            'name' => 'required|max:255'
        ]);
        
        /* Inizializza un nuovo modello di player */
        $player = Player::create($request->all());

        /* Crea una nuova istanza di Player e la trasforma in una
            HTTP response che invia al server */
        return (new PlayerResource($player))
                ->response()
                ->setStatusCode(201);
    }

    /* Gestisce la risposta del giocatore */
    public function answer($id, Request $request){
        $request->merge(['correct' => (bool) json_decode($request->get('correct'))]);
        $request->validate([
            'correct' => 'required|boolean'
        ]);

        $player = Player::findOrFail($id);
        $player->answers++;
        $player->points = ($request->get('correct')
                            ? $player->points + 1
                            : $player->points - 1);

        $player->save();
        
        return new PlayerResource($player);
    }

    public function delete($id){
        $player = Player::findOrFail($id);
        $player->delete();

        return response()->json(null, 204);
    }

    public function resetAnswers($id){
        $player = Player::findOrFail($id);
        $player->answers = 0;
        $player->points = 0;
        $player->save();

        return new PlayerResource($player);
    }

}