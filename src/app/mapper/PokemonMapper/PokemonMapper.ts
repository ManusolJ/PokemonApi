import { PokemonREST } from '@interfaces/pokemon-REST';
import { Pokemon } from '@interfaces/pokemon.interface';

export class PokemonMapper {
  static mapPokemonApiToPokemonItem(pokemonApi: PokemonREST): Pokemon {
    return {
      id: pokemonApi.id,
      name: pokemonApi.name,
      types: [
        pokemonApi.types[0].type.name,
        pokemonApi.types[1]?.type.name ?? '',
      ],
      image: pokemonApi.sprites.front_default,
    };
  }
}
