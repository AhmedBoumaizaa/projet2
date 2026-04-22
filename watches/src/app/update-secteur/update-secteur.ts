import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Secteur } from '../modele/secteur.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WatchService } from '../services/watch.service';

@Component({
  selector: 'app-update-secteur',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-secteur.html',
  styles: ``
})
export class UpdateSecteur implements OnInit {

  @Input() secteur!: Secteur;
  @Input() ajout!: boolean;
  @Output() secteurUpdated = new EventEmitter<Secteur>();

  constructor(private watchService: WatchService) {}

  ngOnInit(): void {}

  saveSecteur() {
  if (this.ajout) {
    // Pour l'ajout, on utilise Partial<Secteur>
    const newSecteur: Partial<Secteur> = { nomSec: this.secteur.nomSec };

    this.watchService.ajouterSecteur(newSecteur).subscribe(
      sec => {
        this.secteurUpdated.emit(sec);
        // Réinitialiser le formulaire
        this.secteur.nomSec = '';
      },
      err => console.error('Erreur ajout secteur', err)
    );
  } else {
    // Pour la modification, on utilise le Secteur complet
    this.watchService.updateSecteur(this.secteur).subscribe(
      sec => this.secteurUpdated.emit(sec),
      err => console.error('Erreur mise à jour secteur', err)
    );
  }
}

}
