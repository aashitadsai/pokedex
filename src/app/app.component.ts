import { Component } from '@angular/core';
import { pokemon_card,pokemon_detail } from '../app/pokemon_card';
import { PokeapiService } from './services/pokeapi.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  title = 'app';
  
  loading:boolean=true;
  pokemons:pokemon_card[] = new Array<pokemon_card>()
  poke_modal:pokemon_detail = new pokemon_detail();
  progress:boolean=true;
  modal_theme:string = "";
  overlay_theme:string = "";
  modal_show="none";  //final design make it none;

  constructor(
    public poke_api_service: PokeapiService
  ) { }

    ngOnInit() {
      this.pokemons = new Array<pokemon_card>();
      this.loading = true;
      this.progress = true;
      this.poke_api_service.getPokeList()
      .then(data=>{
      data.map(poke=>{
        let pokemon = new pokemon_card();
        pokemon.name = poke.name;
        pokemon.pokemon_url = poke.url;
        
        //poke.url
        this.poke_api_service.getPokeImage(poke.url)
        .then(res=>{
          pokemon.front_default = res.front_default;
          pokemon.back_default = res.back_default;
        });
        this.pokemons.push(pokemon);

      })
      this.progress = false;
      this.loading=false;
      console.log(this.pokemons);
      })

      .catch(error=>{
        console.log(error);
      });
    }

    cardClick(poke:pokemon_card)
    {
      if(this.progress){
        return;
      }
      this.progress = true;
      let pokemon_card_detail:pokemon_detail = new pokemon_detail();
      this.poke_api_service.getPokeDetail(poke.pokemon_url)
      .then(data=>{
        this.poke_modal = data;
        this.progress = false;
        this.modal_theme = "fadeInLeft";
        this.modal_show="block";
      })
    }

    modal_close(){
      this.modal_theme = "fadeOutLeft";
    }

    next() {
      this.poke_api_service.next();
      this.ngOnInit();
    }

    previous() {
      this.poke_api_service.previous();
      this.ngOnInit();
    }

}