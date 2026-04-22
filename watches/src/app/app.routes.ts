import { Routes } from '@angular/router';
import { Watches } from './watches/watches';
import { AddWatch } from './add-watch/add-watch';
import { UpdateWatch } from './update-watch/update-watch';
import { RechercheParModel } from './recherche-par-model/recherche-par-model';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { watchGuard } from './services/watch-guard';
import { ListeModels } from './liste-models/liste-models';


export const routes: Routes = [
    { path: "watches", component: Watches},
    { path: "add-watch", component: AddWatch ,canActivate:[watchGuard]},
    { path: "updateWatch/:id", component: UpdateWatch,canActivate:[watchGuard]},
    { path: "RechercheParModel", component :RechercheParModel},
    { path: "rechercheParNom", component :RechercheParNom},
    { path: "login", component: Login},
    { path: "app-forbidden", component: Forbidden},
    { path: "ListeModels", component: ListeModels,canActivate:[watchGuard]},
    { path: "", redirectTo: "watches", pathMatch: "full" }
];
