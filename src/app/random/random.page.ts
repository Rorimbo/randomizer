import { Component, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonFab,
  IonButton,
  IonModal,
  IonButtons,
  IonList,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { HEROES_LIST } from '../consts/HEROES_LIST';
import { Hero } from '../types/hero';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Line } from '../enums/line.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonList,
    IonButtons,
    IonModal,
    IonButton,
    IonFab,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class RandomPage {
  @ViewChild(IonModal) modal: IonModal;
  randomHero: Hero;
  heroesList: Hero[];
  selectedHeroes: Hero[];
  line: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.line = params['line'];
      this.heroesList = HEROES_LIST.filter((hero) => {
        return hero.line.find(
          (line) => line === Line[this.line as keyof typeof Line]
        );
      });
      this.selectedHeroes = this.heroesList.filter((hero) => {
        return hero.isExists;
      });
    });
  }

  generateRandomNumber(min: number, max: number): number {
    let randomNumber: number;
    randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  setRandomHero(): void {
    let randomNumber = this.generateRandomNumber(
      0,
      this.selectedHeroes.length - 1
    );
    this.randomHero = this.selectedHeroes[randomNumber];
  }

  cancel() {
    this.selectedHeroes = this.heroesList.filter((hero) => {
      return hero.isExists;
    });
    this.modal.dismiss(null, 'cancel');
  }
}
