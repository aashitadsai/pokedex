import { Component, OnInit, Input } from '@angular/core';
import { pokemon_card } from '../pokemon_card';


@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent implements OnInit {

  @Input('pokemon') pokemon:pokemon_card = new pokemon_card();

  constructor() { 
  
  }

  ngOnInit() {

  }

}
