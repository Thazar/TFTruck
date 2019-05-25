import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { MapaComponent } from './mapa.component'
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';

import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbSelectModule, NbActionsModule, NbPopoverModule, NbTooltipModule, NbWindowModule, NbInputModule } from '@nebular/theme';

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ThemeModule,
    NbButtonModule,
    NbSelectModule,
    NbActionsModule,
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    NbInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCl_eRT8a-rXEmSZzHcXYKi7zNI0XlGb-w',
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
