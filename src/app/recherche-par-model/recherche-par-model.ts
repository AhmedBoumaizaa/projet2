import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Watch } from '../modele/watches.model';
import { Modele } from '../modele/modele.model';
import { WatchService } from '../services/watch.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-model.html'
})
export class RechercheParModel implements OnInit {

  watches!: Watch[] 
  modeles!: Modele[] 
  idModel!: number;

  constructor(
    private watchService: WatchService,
    private router: Router,
    public authService: Auth
  ) {}

  ngOnInit(): void {
    this.watchService.listeModele().subscribe(mod => {
        this.modeles = mod._embedded.models;
        console.log(mod);
       });
  }

  onChange() {
    this.watchService.rechercherWatchParModele(this.idModel).subscribe(ent => {
        this.watches = ent;
    });
  }

  supprimerWatch(ent: Watch) {
    if (confirm("Voulez-vous vraiment supprimer cette montre ?")) {
      this.watchService.supprimerWatch(ent.idWatch).subscribe(() => {
        this.watches = this.watches.filter(e => e.idWatch !== ent.idWatch);
      });
    }
  }

  modifierWatch(e: Watch) {
    this.router.navigate(['updateWatch', e.idWatch]);
  }
}
