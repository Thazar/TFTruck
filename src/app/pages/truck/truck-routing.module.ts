import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruckComponent } from './truck.component'
import { MapaComponent } from './mapa/mapa.component'
import { AddTruckComponent } from './mapa/add-truck/add-truck.component';

const routes: Routes = [{
    path: '',
    component: TruckComponent,
    children: [{
      path: 'mapa',
      component: MapaComponent,
    }],
  }];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

  export class TruckRoutingModule { }

  export const routedComponents = [
    TruckComponent,
    MapaComponent,
  ];
  