import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatSelectModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSlideToggle, MatSlideToggleModule, MatToolbarModule,} from '@angular/material';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


import { ThemeModule } from '../../@theme/theme.module';
import { TruckRoutingModule, routedComponents } from './truck-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NbDatepickerModule, NbSelectModule, NbTabsetModule, } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { MarkersComponent } from './mapa/map/markers/markers.component';



@NgModule({
    imports: [
      MatIconModule, MatInputModule, MatButtonModule, MatGoogleMapsAutocompleteModule.forRoot() , ReactiveFormsModule,AngularFontAwesomeModule, ReactiveFormsModule, MatAutocompleteModule, 
      NbDatepickerModule.forRoot(), NbDatepickerModule, NbSelectModule, MatSelectModule, HttpClientModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, NbTabsetModule, MatDatepickerModule, MatNativeDateModule,
      ThemeModule, MatTabsModule, MatSlideToggleModule, MatToolbarModule,
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
   
  
    ],
  })

  export class TruckModule { }