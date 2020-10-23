import { Injectable } from '@angular/core';
import { PlaylistsService } from '../playlists/playlists.service';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistSelectionService {

  selectedId: number;

  selectedIdStrem = new Subject();

  constructor( private playlistsService: PlaylistsService) {
    this.playlistsService.getPlaylistsStrem()
      .subscribe( playlists => {
      if (!this.selectedId) {
        this.select(playlists);
        }
      });
  }

  getSelectionStream(): Observable<any>{
    return this.selectedIdStrem.pipe(startWith(this.selectedId));
  }

  select(playlistId): void {
    this.selectedId = playlistId;
    this.selectedIdStrem.next(this.selectedId);
  }

  addToPlaylist(track): void {
    this.playlistsService.addToPlaylist(this.selectedId, track);
  }
}