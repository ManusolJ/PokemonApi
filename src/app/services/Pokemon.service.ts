import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PokemonListApi } from '../interfaces/pokemon-list-api';
import { environment } from '@envs/environment';
import { PokemonAPI } from '../interfaces/pokemon-api';
import { from, map, mergeMap, tap, toArray } from 'rxjs';
import { PokemonMapper } from '../mapper/pokemon.mapper';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  constructor() {}

  getAllPokemon(offset: number = 0, limit: number = 20) {
    return this.http
      .get<PokemonListApi>(`${environment.pokemonUrl}/`, {
        params: { offset, limit },
      })
      .pipe(
        mergeMap((res) => from(res.results)),
        mergeMap((pokemon) =>
          this.getPokemonByUrl(pokemon.url).pipe(
            map((pokemonApi) =>
              PokemonMapper.mapPokemonApiToPokemonItem(pokemonApi)
            )
          )
        ),
        toArray()
      );
  }

  getPokemonByUrl(url: string) {
    return this.http.get<PokemonAPI>(url);
  }
}
