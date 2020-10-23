import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSelectorComponent } from './playlist-selector.component';
import { FormsModule } from '@angular/forms';
import { TrackListComponent} from './track-list.component'



@NgModule({
  declarations: [
    PlaylistSelectorComponent,
    TrackListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PlaylistSelectorComponent,
    TrackListComponent
  ]
})
export class MusicSharedModule { }
