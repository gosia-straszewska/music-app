import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { ContentCardComponent } from './content-card.component';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistFormComponent } from './playlist-form.component';
import { PlaylistsListComponent } from './playlists-list.component';
import { FormsModule } from '@angular/forms';
import { PlaylistsService } from './playlists.service';
import playlistsData from './playlists.data';
import { routerModule } from './playlists.routing';
import { AppModule } from '../app.module';

@NgModule({
  declarations: [
    PlaylistsComponent,
    ContentCardComponent,
    PlaylistFormComponent,
    PlaylistsListComponent,
    PlaylistDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    routerModule
  ],
  exports: [
    // PlaylistsComponent
  ],
  providers: [
    PlaylistsService,
    {provide: 'PlaylistsData', useValue: playlistsData}
  ]
})
export class PlaylistsModule { }
