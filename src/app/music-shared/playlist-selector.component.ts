import { Component, OnInit } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';
import { PlaylistsService} from '../playlists/playlists.service';

@Component({
  selector: 'app-playlist-selector',
  template: `
  <div class="input-group">
    <label class="col-xs-4 col-form-label">Aktywna Playlista: </label>
    <select class="form-control" [ngModel]="selectedId" (ngModelChange)="setSelected('playlist.id')">
      <option *ngFor="let playlist of playlists" [value]="playlist.id">{{playlist.name}} ({{playlist.tracks.length}})</option>
    </select>
  </div>
  `,
  styles: []
})
export class PlaylistSelectorComponent implements OnInit {

  selectedId: number;
  playlists = [];

  constructor( private selectionService: PlaylistSelectionService,
               private playlistsService: PlaylistsService) { }

  ngOnInit(): void {
    this.selectionService.getSelectionStream()
    .subscribe( id => {
      this.selectedId = id;
    });

    this.playlistsService.getPlaylistsStrem()
      .subscribe( playlists => {
        this.playlists = playlists;
      });
  }

  setSelected(id): void {
    this.selectionService.select(id);
  }
}
