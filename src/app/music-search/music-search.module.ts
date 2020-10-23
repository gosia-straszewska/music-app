import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album-list.component';
import { AlbumCardComponent } from './album-card.component';
import { MusicSearchComponent } from './music-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicSearchService } from './music-search.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AlbumSearchFormComponent } from './album-search-form.component';
import { routerModule } from './music-search.routing';
import { AlbumDetailsComponent } from './album-details.component';
import { MusicSharedModule} from '../music-shared/music-shared.module';


@NgModule({
  declarations: [
    MusicSearchComponent,
    AlbumListComponent,
    AlbumCardComponent,
    AlbumSearchFormComponent,
    AlbumDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MusicSharedModule,
    routerModule
  ],
  exports: [
    MusicSearchComponent
  ],
  providers: [
    MusicSearchService,
    AuthService
  ]
})

export class MusicSearchModule { }
