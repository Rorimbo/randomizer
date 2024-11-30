import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
} from '@ionic/angular/standalone';
import { HEROES_LIST } from '../HEROES_LIST';
import { HeroesGroup } from '../heroesGroup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
  ],
})
export class RandomPage {
  randomHero: HeroesGroup;
  heroesList = HEROES_LIST;

  generateRandomNumber(min: number, max: number): number {
    let randomNumber: number;
    randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  setRandomHero(): void {
    let randomNumber = this.generateRandomNumber(0, this.heroesList.length);
    this.randomHero = this.heroesList[randomNumber];
  }
}
