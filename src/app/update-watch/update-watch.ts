import { Component, OnInit } from '@angular/core';
import { Watch } from '../modele/watches.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchService } from '../services/watch.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modele } from '../modele/modele.model';

@Component({
  selector: 'app-update-watch',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-watch.html'
})
export class UpdateWatch implements OnInit {
  currentWatch = new Watch();
  modeles!: Modele[];
  updatedModId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private watchService: WatchService
  ) { }

  ngOnInit(): void {

    this.watchService.listeModele().subscribe(mods => {
      this.modeles = mods._embedded.models;
      
      this.watchService.consulterWatch(
        this.activatedRoute.snapshot.params['id']
      ).subscribe(ent => {
        this.currentWatch = ent;
        if (this.currentWatch.nomModel) {
          const foundMod = this.modeles.find(m => m.nomModel === this.currentWatch.nomModel);
          if (foundMod) {
            this.updatedModId = foundMod.idModel;
          }
        }
      });
    });
  }

  updateWatch() {
    this.currentWatch.model = this.modeles.find(mod => mod.idModel == this.updatedModId)!;
    this.watchService.updateWatch(this.currentWatch)
      .subscribe(() => {
        this.router.navigate(['liste-watches']);
      });
  }
}
