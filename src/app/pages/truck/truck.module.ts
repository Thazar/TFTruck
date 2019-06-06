import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatSelectModule, MatExpansionModule, MatCheckboxModule, MatDividerModule,} from '@angular/material';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


import { ThemeModule } from '../../@theme/theme.module';
import { TruckRoutingModule, routedComponents } from './truck-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NbDatepickerModule, NbSelectModule, NbTabsetModule, } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { MarkersComponent } from './mapa/map/markers/markers.component';
import { MarkerInfoComponent } from './mapa/map/markers/marker-info/marker-info.component';


@NgModule({
    imports: [
      MatIconModule, MatInputModule, MatButtonModule, MatGoogleMapsAutocompleteModule.forRoot() , ReactiveFormsModule,AngularFontAwesomeModule, ReactiveFormsModule, MatAutocompleteModule, 
      NbDatepickerModule.forRoot(), NbDatepickerModule, NbSelectModule, MatSelectModule, HttpClientModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, NbTabsetModule,
      ThemeModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCl_eRT8a-rXEmSZzHcXYKi7zNI0XlGb-w',
        libraries: ['places'],
      }),
      TruckRoutingModule, 
    ],
    exports: [],
    declarations: [
      ...routedComponents,
      MarkersComponent,
      MarkerInfoComponent,
  
    ],
  })

  export class TruckModule { }