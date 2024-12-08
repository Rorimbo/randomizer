import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonCheckbox,
  IonList,
} from '@ionic/angular/standalone';
import { Hero } from '../types/hero';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonList,
    IonItem,
    IonButtons,
    IonModal,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DialogPage {
  @ViewChild(IonModal) modal: IonModal;

  @Input() heroesList: Hero[];
  @Input() line: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
    this.modal.dismiss();
  }
}
