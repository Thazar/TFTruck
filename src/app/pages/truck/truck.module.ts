import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatSelectModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSlideToggle, MatSlideToggleModule, MatToolbarModule, MatButtonToggleModule, MatTableModule, MatPaginatorModule, MatSortModule,} from '@angular/material';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import {CustomMatPaginatorIntl} from './mapa/markers/custom-mat-paginator-int'
import {MatPaginatorIntl} from '@angular/material';


import { ThemeModule } from '../../@theme/theme.module';
import { TruckRoutingModule, routedComponents } from './truck-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NbDatepickerModule, NbSelectModule, NbTabsetModule, NbToastrModule, } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';

import { MarkersComponent } from './mapa/markers/markers.component';
import { ListComponent } from './mapa/list/list.component';
import { EditTruckComponent } from './mapa/edit-truck/edit-truck.component';
import { MapaComponent } from './mapa/mapa.component';




@NgModule({
    imports: [
      MatIconModule, MatInputModule, MatButtonModule, MatGoogleMapsAutocompleteModule.forRoot() , ReactiveFormsModule,AngularFontAwesomeModule, ReactiveFormsModule, MatAutocompleteModule, 
      NbDatepickerModule.forRoot(), NbDatepickerModule, NbSelectModule, MatSelectModule, HttpClientModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, NbTabsetModule, MatDatepickerModule, MatNativeDateModule,
      ThemeModule, MatTabsModule, MatSlideToggleModule, MatToolbarModule, MatButtonToggleModule, MatTableModule, MatPaginatorModule, MatSortModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCl_eRT8a-rXEmSZzHcXYKi7zNI0XlGb-w',
        libraries: ['places','geometry'],
      }),
      TruckRoutingModule, 
    ],
    entryComponents: [MarkersComponent,],
  bootstrap: [MarkersComponent],
  providers: [{
      provide: MatPaginatorIntl, 
      useClass: CustomMatPaginatorIntl
    }],
    exports: [],
    declarations: [
      [MarkersComponent],
      ...routedComponents,
      MarkersComponent,
      ListComponent,
      MapaComponent, 
    ],
  })

  export class TruckModule { }