import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonFab,
  IonButton,
  IonFabButton,
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
import { DataService } from '../data.service';

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
    IonFab,
    IonButton,
    IonFabButton,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
  ],
  providers: [DataService],
})
export class RandomPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
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
            return hero.line.find(
              (line) => line === Line[this.line as keyof typeof Line]
            );
          });
        this.selectedHeroes = this.heroesList.filter((hero) => hero.isExists);
      });
    });
  }

  saveHeroes() {
    this.dataService.saveData(this.heroesList, this.line);
  }

  close() {
    this.selectedHeroes = this.heroesList.filter((hero) => {
      return hero.isExists;
    });
    this.saveHeroes();
    this.modal.dismiss(null, 'close');
  }

  setRandomHero(): void {
    let randomNumber = this.dataService.generateRandomNumber(
      0,
      this.selectedHeroes.length - 1
    );
    this.randomHero = this.selectedHeroes[randomNumber];
  }
}
