import { Pokemon } from '../interfaces/pokemon';
import { PokemonAPI } from '../interfaces/pokemon-api';

export class PokemonMapper {
  static mapPokemonApiToPokemonItem(pokemonApi: PokemonAPI): Pokemon {
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
