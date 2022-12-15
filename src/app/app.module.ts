import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RafflesModule } from './raffles/rafles.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './shared/login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModuleModule } from './users/user-module.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialExampleModule,
    AppRoutingModule,
    MatToolbarModule,
    RafflesModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModuleModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
