import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pokemon } from '@interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  imports: [TitleCasePipe, NgClass],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();

  types: Record<string, string> = {
    grass: 'bg-green-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    bug: 'bg-lime-500',
    normal: 'bg-gray-400',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    ice: 'bg-blue-200',
    dragon: 'bg-indigo-600',
    fairy: 'bg-pink-300',
    fighting: 'bg-orange-600',
  };
}
