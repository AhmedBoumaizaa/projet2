import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modele } from '../modele/modele.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WatchService } from '../services/watch.service';

@Component({
  selector: 'app-update-model',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-model.html',
  styles: ``
})
export class UpdateModel implements OnInit {

  @Input() modele!: Modele;
  @Input() ajout!: boolean;
  @Output() modeleUpdated = new EventEmitter<Modele>();

  constructor(private watchService: WatchService) {}

  ngOnInit(): void {}

  saveModele() {
    if (this.ajout) {
      const newModele: Partial<Modele> = { nomMod: this.modele.nomMod };

      this.watchService.ajouterModele(newModele).subscribe(
        mod => {
          this.modeleUpdated.emit(mod);
          this.modele.nomMod = '';
        },
        err => console.error('Erreur ajout modèle', err)
      );
    } else {
      this.watchService.updateModele(this.modele).subscribe(
        mod => this.modeleUpdated.emit(mod),
        err => console.error('Erreur mise à jour modèle', err)
      );
    }
  }

}
