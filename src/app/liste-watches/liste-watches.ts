import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Watch } from '../modele/watches.model';
import { WatchService } from '../services/watch.service';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-liste-watches',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-watches.html'
})
export class ListeWatches implements OnInit {
  watches!: Watch[];

  constructor(private watchService: WatchService,
    public authService: Auth
  ) {}

  ngOnInit() {
    this.chargerWatches();
  }

  chargerWatches() {
  this.watchService.listeWatches().subscribe((ents: Watch[]) => {
    this.watches = ents;
  });
}

  supprimerWatch(ent: Watch) {
    if (confirm("Etes-vous sûr ?")) {
      this.watchService.supprimerWatch(ent.idWatch).subscribe(() => {
        console.log("Montre supprimée");
        this.chargerWatches();
      });
    }
  }
}
