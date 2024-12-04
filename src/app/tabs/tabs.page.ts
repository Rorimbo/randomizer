import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { Line } from '../enums/line.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, CommonModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  lines = Object.values(Line).filter((value) => typeof value === 'string');

  constructor() {
    addIcons({ triangle, ellipse, square });
  }
}
