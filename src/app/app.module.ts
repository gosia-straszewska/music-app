import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistsModule } from './playlists/playlists.module';
import { AuthService } from './auth.service';
import { MusicSearchModule } from './music-search/music-search.module';
import { routerModule } from './app.routing';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    PlaylistsModule,
    MusicSearchModule,
    routerModule
  ],
  providers: [
    AuthService
],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private auth: AuthService){
    this.auth.getToken();
  }
 }
