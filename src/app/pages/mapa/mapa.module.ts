import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { MapaComponent } from './mapa.component'

import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbSelectModule, NbActionsModule, NbPopoverModule, NbTooltipModule, NbWindowModule, NbInputModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbButtonModule,
    NbSelectModule,
    NbActionsModule,
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    NbInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
    LeafletModule.forRoot(),
    NgxEchartsModule,
  ],
  exports: [],
  declarations: [
      MapaComponent
  ],
})
export class MapaModule { }