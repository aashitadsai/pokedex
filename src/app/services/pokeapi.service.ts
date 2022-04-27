import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { promise } from "selenium-webdriver";
import { abilities, pokemon_detail } from "../pokemon_card";
import { element } from "protractor";

@Injectable()
export class PokeapiService {
  constructor(private http: HttpClient) {}

  private pokeapi_list: string =
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";

  count: number = 0;

  next() {
    this.count += 20;
  }

  previous() {
    if (this.count >= 20) {
      this.count -= 20;
    }
  }

  getPokeList(): Promise<any> {
    return this.http
      .get(this.pokeapi_list + this.count)
      .toPromise()
      .then((data) => {
        return data["results"] as any;
      })
      .catch((err) => console.log(err));
  }

  getPokeImage(pokemon_url: string): Promise<any> {
    return this.http
      .get(pokemon_url)
      .toPromise()
      .then((data) => {
        return data["sprites"] as any;
      });
  }

  getAbilityDetail(ability_url: string): Promise<abilities> {
    let ability: abilities = new abilities();

    return this.http
      .get(ability_url)
      .toPromise()
      .then((data) => {
        ability.name = data["name"];
        data["effect_entries"].map((element) => {
          ability.description = element["short_effect"];
        });
        return ability;
      });
  }

  getPokeDetail(pokemon_url: string): Promise<pokemon_detail> {
    let pokemon: pokemon_detail = new pokemon_detail();

    return this.http
      .get(pokemon_url)
      .toPromise()
      .then((data) => {
        //name
        pokemon.name = data["name"];

        //image
        this.getPokeImage(pokemon_url).then((res) => {
          pokemon.front_default = res.front_default;
          pokemon.back_default = res.back_default;
        });

        //weight
        pokemon.weight = data["weight"];

        pokemon.base_experience = data["base_experience"];
        pokemon.height = data["height"];

        //abilities
        pokemon.abilities = new Array<abilities>();
        data["abilities"].map((element) => {
          this.getAbilityDetail(element["ability"]["url"]).then((a) => {
            pokemon.abilities.push(a);
          });
        });
        return pokemon;
      });
  }
}
