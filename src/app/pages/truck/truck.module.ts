import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatSelectModule,} from '@angular/material';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


import { ThemeModule } from '../../@theme/theme.module';
import { TruckRoutingModule, routedComponents } from './truck-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NbDatepickerModule, NbSelectModule } from '@nebular/theme';

@NgModule({
    imports: [
      MatIconModule, MatInputModule, MatButtonModule, MatGoogleMapsAutocompleteModule.forRoot() , ReactiveFormsModule,AngularFontAwesomeModule, ReactiveFormsModule, MatAutocompleteModule, 
      NbDatepickerModule.forRoot(), NbDatepickerModule, NbSelectModule, MatSelectModule,
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
    ],
  })

  export class TruckModule { }