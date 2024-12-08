import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { HEROES_LIST } from '../consts/HEROES_LIST';
import { Hero } from '../types/hero';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Line } from '../enums/line.enum';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { DialogPage } from '../dialog/dialog.page';

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [
    IonFab,
    IonFabButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
    DialogPage,
  ],
  providers: [DataService],
})
export class RandomPage implements OnInit {
  randomHero: Hero;
  heroesList: Hero[];
  selectedHeroes: Hero[];
  line: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.line = params['line'];
      this.dataService.getData(this.line).then((savedHeroes) => {
        this.heroesList =
          savedHeroes ||
          HEROES_LIST.filter((hero) => {
            return (
              hero.line.findIndex((line) => {
                return line === Line[this.line as keyof typeof Line];
              }) > -1
            );
          });
        this.updateSelectedHeroes();
      });
    });
  }

  setRandomHero(): void {
    let randomNumber = this.dataService.generateRandomNumber(
      0,
      this.selectedHeroes.length - 1
    );
    this.randomHero = this.selectedHeroes[randomNumber];
  }

  updateSelectedHeroes() {
    this.selectedHeroes = this.heroesList.filter((hero) => hero.isExists);
    this.saveHeroes();
  }

  saveHeroes() {
    this.dataService.saveData(this.heroesList, this.line);
  }
}
