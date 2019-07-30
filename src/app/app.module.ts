/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { AddTokenInterceptor } from './add-token-interceptor';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from './auth.guard';
import { NbWindowService, NbWindowModule, NbDatepickerModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatButtonModule, MatIconModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSlideToggleModule, MatToolbarModule, MatButtonToggleModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { EditTruckComponent } from './pages/truck/mapa/edit-truck/edit-truck.component';
import { AddTruckComponent } from './pages/truck/mapa/add-truck/add-truck.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    NbWindowModule.forRoot(), MatIconModule, MatInputModule, MatButtonModule, MatGoogleMapsAutocompleteModule.forRoot() , ReactiveFormsModule,AngularFontAwesomeModule, ReactiveFormsModule, MatAutocompleteModule, 
    NbDatepickerModule.forRoot(), NbDatepickerModule, NbSelectModule, MatSelectModule, HttpClientModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, NbTabsetModule, MatDatepickerModule, MatNativeDateModule,
    ThemeModule, MatTabsModule, MatSlideToggleModule, MatToolbarModule, MatButtonToggleModule, MatTableModule, MatPaginatorModule, MatSortModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCl_eRT8a-rXEmSZzHcXYKi7zNI0XlGb-w',
      libraries: ['places','geometry'],
    }),
   
    ToastrModule.forRoot({
      timeOut: 15000,
      maxOpened: 1,
      positionClass: 'toast-top-center'
    }),

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  entryComponents: [EditTruckComponent, AddTruckComponent,],
  declarations: [AppComponent, EditTruckComponent, AddTruckComponent, ],
  bootstrap: [AppComponent],
  providers: [
    NbWindowService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: MAT_DATE_LOCALE, useValue: 'pl' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
  },
  AuthGuard
  ],
})
export class AppModule {
}
