import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

//Servicios
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

//Rutas
import {AppRoutingModule} from './app-routing.module';

//Componentes
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {SideBarComponent} from './components/shared/side-bar/side-bar.component';
import {NavBarComponent} from './components/shared/nav-bar/nav-bar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

//Angular Material and fonts
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MaterialModule} from './components/dashboard/pages/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    SideBarComponent,
    NavBarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
