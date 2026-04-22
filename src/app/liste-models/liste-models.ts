import { Component, OnInit } from '@angular/core';
import { Modele } from '../modele/modele.model';
import { WatchService } from '../services/watch.service';
import { CommonModule } from '@angular/common';
import { UpdateModel } from '../update-model/update-model';

@Component({
  selector: 'app-liste-models',
  standalone: true,
  imports: [CommonModule, UpdateModel],
  templateUrl: './liste-models.html'
})
export class ListeModels implements OnInit {

  modeles!: Modele[];
  updatedMod: Modele = { "idModel": 0, "nomModel": "" };
  ajout: boolean = true;

  constructor(private watchService: WatchService) {}

  ngOnInit(): void {
    this.chargerModeles();
  }

  chargerModeles() {
    this.watchService.listeModele()
      .subscribe(mod => {
        this.modeles = mod._embedded.models;
      });
  }

  modeleUpdated(mod: Modele) {
    if (this.ajout) {
      this.watchService.ajouterModele(mod)
        .subscribe(() => this.chargerModeles());
    } else {
      this.watchService.updateModele(mod)
        .subscribe(() => this.chargerModeles());
    }

    // Réinitialiser le formulaire
    this.updatedMod = { "idModel": 0, "nomModel": "" };
    this.ajout = true;
  }

  updateMod(mod: Modele) {
    this.updatedMod = { ...mod }; // clonage pour éviter modification directe
    this.ajout = false;
  }
}
