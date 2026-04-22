import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Watch } from '../modele/watches.model';
import { Modele } from '../modele/modele.model';
import { WatchService } from '../services/watch.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-watch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-watch.html'
})
export class AddWatch implements OnInit {

  newWatch = new Watch();
  message!: string;
  modeles!: Modele[];
  newIdModel!: number;
  newModele!: Modele;

  constructor(private watchService: WatchService,
              private router: Router) {}

  ngOnInit() {
    this.watchService.listeModele()
      .subscribe(mods => {
        this.modeles = mods._embedded.models;
        console.log(mods);
      });
  }

 addWatch() {
  if (!this.newIdModel) return;

  this.newWatch.model =
      this.modeles.find(mod => mod.idModel == this.newIdModel)!;

  this.watchService.ajouterWatch(this.newWatch)
    .subscribe(ent => {
      console.log(ent);
      this.router.navigate(['liste-watches']);
    });
}

}
