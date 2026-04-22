import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Watch } from '../modele/watches.model';
import { WatchService } from '../services/watch.service';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNom implements OnInit {

  searchTerm: string = '';
  nomEnt: string = '';
  watches: Watch[] = [];
  allWatches: Watch[] = [];

  constructor(
    private watchService: WatchService,
    private router: Router,
    public authService: Auth
  ) { }

  ngOnInit(): void {
  this.watchService.listeWatches().subscribe(ent => {
    this.allWatches = ent; // 👈 charger une seule fois
  });
  this.watches = [];
}

  onKeyUp(filterText: string) {
    if (!filterText.trim()) {
      this.watches = [];
      return;
    }
    this.watchService.listeWatches().subscribe(ent=>{
      this.allWatches=ent;
    this.watches = this.allWatches.filter(ent =>
      ent.nomEnt.toLowerCase().includes(filterText.toLowerCase())
    );
  });
}
  
  rechercherWatches() {
    if (!this.nomEnt.trim()) {
      this.watches = [];  
      return;
    }
    this.watchService.rechercherWatchParNom(this.nomEnt).subscribe(ent => {
      console.log(ent);
      this.watches = ent;
    });
  }

  modifierWatch(ent: Watch) {
    this.router.navigate(['updateWatch', ent.idEnt]);
  }

  supprimerWatch(ent: Watch) {
    if (confirm("Voulez-vous vraiment supprimer cette montre ?")) {
      this.watchService.supprimerWatch(ent.idEnt).subscribe(() => {
        this.watches = this.watches.filter(e => e.idEnt !== ent.idEnt);
      });
    }
  }
}
