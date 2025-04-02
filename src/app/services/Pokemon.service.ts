import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  from,
  map,
  mergeMap,
  toArray,
  Observable,
  catchError,
  throwError,
  concatMap,
  filter,
  of,
  tap,
} from 'rxjs';

import { environment } from '@envs/environment';
import { PokemonListREST } from '@interfaces/pokemon-list-REST.interface';
import { PokemonREST } from '@interfaces/pokemon-REST';
import { PokemonMapper } from '../mapper/PokemonMapper/PokemonMapper';
import { Pokemon } from '@interfaces/pokemon.interface';
import { PokemonCache } from '@interfaces/pokemonCache.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private pokemonCache = new Map<string, PokemonCache>();

  pokemonCount = signal<number>(0);

  getAllPokemon(limit: number = 18, offset: number = 0): Observable<Pokemon[]> {
    const key = `${limit}-${offset}`;
    if (this.pokemonCache.has(key)) {
      this.pokemonCount.set(this.pokemonCache.get(key)?.count!);
      return of(this.pokemonCache.get(key)?.pokemon!);
    }
    return this.http
      .get<PokemonListREST>(`${environment.url}/`, {
        params: { offset, limit },
      })
      .pipe(
        tap((res) => this.pokemonCount.set(res.count)),
        mergeMap((res) => from(res.results)),
        concatMap((pokemonRESTListItem) =>
          this.getPokemonByUrl(pokemonRESTListItem.url)
        ),
        toArray(),
        tap((pokemonList) =>
          this.pokemonCache.set(key, {
            pokemon: pokemonList,
            count: this.pokemonCount(),
          })
        ),
        catchError((error) => {
          return throwError(
            () => new Error('No se pudo obtener la lista de pokemon.', error)
          );
        })
      );
  }

  getPokemonByName(
    limit: number = 2000,
    offset: number = 0,
    query: string
  ): Observable<Pokemon[]> {
    const key = `${limit}-${offset}-${query}`;
    if (this.pokemonCache.has(key)) {
      this.pokemonCount.set(this.pokemonCache.get(key)?.count!);
      return of(this.pokemonCache.get(key)?.pokemon!);
    }

    return this.http
      .get<PokemonListREST>(`${environment.url}`, {
        params: { limit, offset },
      })
      .pipe(
        mergeMap((res) =>
          from(res.results).pipe(
            filter((list) => list.name.includes(query)),
            toArray(),
            tap((allMatches) => this.pokemonCount.set(allMatches.length)),
            map((allMatches) => allMatches.slice(0, 18))
          )
        ),
        concatMap((filtered) =>
          from(filtered).pipe(
            concatMap((pokemonRESTListItem) =>
              this.getPokemonByUrl(pokemonRESTListItem.url)
            ),
            toArray()
          )
        ),
        tap((pokemonList) =>
          this.pokemonCache.set(key, {
            pokemon: pokemonList,
            count: this.pokemonCount(),
          })
        ),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                'No se pudo obtener el resultado de la búsqueda.',
                error
              )
          );
        })
      );
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<PokemonREST>(url).pipe(
      map((PokemonREST) =>
        PokemonMapper.mapPokemonApiToPokemonItem(PokemonREST)
      ),
      catchError((error) => {
        return throwError(
          () =>
            new Error('No se pudo obtener el resultado de la búsqueda.', error)
        );
      })
    );
  }

  getPokemonCount(): Observable<number> {
    return this.http
      .get<PokemonListREST>(environment.url)
      .pipe(map((pokemonREST) => pokemonREST.count));
  }

  saveTeamToLocalStorage(team: (Pokemon | undefined)[]): void {
    localStorage.setItem('team', JSON.stringify(team));
  }

  getTeamFromLocalStorage(): (Pokemon | undefined)[] | null {
    const team = localStorage.getItem('team');
    if (!team) return null;
    return (JSON.parse(team) as (Pokemon | null)[]).map((p) => p ?? undefined);
  }
}
