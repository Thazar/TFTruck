import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { ThemeModule } from '../../@theme/theme.module';
import { TruckRoutingModule, routedComponents } from './truck-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      MatIconModule, MatInputModule, MatButtonModule, MatGoogleMapsAutocompleteModule.forRoot() , ReactiveFormsModule,
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