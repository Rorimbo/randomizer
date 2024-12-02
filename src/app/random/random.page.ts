import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { HEROES_LIST } from '../consts/HEROES_LIST';
import { Hero } from '../types/hero';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Line } from '../enums/line.enum';

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
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
  randomHero: Hero;
  heroesList: Hero[];
  line: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.line = params['line'];
      this.heroesList = HEROES_LIST.filter((hero) => {
        return hero.line === Line[this.line as keyof typeof Line];
      });
    });
  }

  generateRandomNumber(min: number, max: number): number {
    let randomNumber: number;
    randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  setRandomHero(): void {
    let randomNumber = this.generateRandomNumber(0, this.heroesList.length - 1);
    this.randomHero = this.heroesList[randomNumber];
  }
}
