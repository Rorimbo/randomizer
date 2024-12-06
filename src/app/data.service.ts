import { Injectable } from '@angular/core';
import { Hero } from './types/hero';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  generateRandomNumber(min: number, max: number): number {
    let randomNumber: number;
    randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  async saveData(heroesList: Hero[], line: string) {
    await Preferences.set({
      key: 'Heroes' + line,
      value: JSON.stringify(heroesList),
    });
  }

  async getData(line: string) {
    const { value } = await Preferences.get({ key: 'Heroes' + line });
    if (value != null) {
      return JSON.parse(value);
    }
    return null;

    // const data = localStorage.getItem(key);
    // return data ? JSON.parse(data) : null;
  }
}
