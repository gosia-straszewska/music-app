import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from '../playlists/playlists.service';
import { PlaylistSelectionService } from './playlist-selection.service';

@Component({
  selector: 'app-track-list',
  template: `
  <audio #audio_id controls style="width:100%" class="mb-4"></audio>
  <nav *ngIf="!playlist" class="navbar navbar-light bg-faded navbar-fixed-bottom">
    <div class="container">
      <div class="row" style="width:100%">
        <div class="col-xs-6" style="width:100%">
          <app-playlist-selector></app-playlist-selector>
        </div>
      </div>
    </div>
  </nav>
    <table class="table table-striped">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Wykonawca </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let track of tracks">
          <td> {{track.track_number}} </td>
          <td> {{track.name}} </td>
          <td> {{track.artists[0].name}} </td>
          <td *ngIf="audio_id.paused"(click)="play(audio_id, track)" class="play">&#9654;</td>
          <td *ngIf="!audio_id.paused"(click)="play(audio_id, track)" class="stop">&#10074;&#10074;</td>
          <td *ngIf="!playlist"(click)="addToPlaylist(track)" class="add" style="color: green">&#10010;</td>
          <td *ngIf="playlist" (click)="deleteTrack( track.id, playlist.id )" class="stop" style="color: red">&#9644;</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
  .add {}
  .play,
  .add,
  .stop {
    cursor: pointer
  }
  `]
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks: object;

  @Input()
  playlist: Playlist;

  playlistId: number;
  equalTrack: boolean;

  constructor( private selectionService: PlaylistSelectionService) { }

  ngOnInit(): void {
  }

  play(audio, track): void {
    audio.volume = 0.1;

    if (audio.src !== track.preview_url){
      audio.src = track.preview_url;
      audio.play();
    } else if (audio.paused) {
      audio.src = track.preview_url;
      audio.play();
    } else {
      audio.pause();
    }
  }

  checkTrack(track, playlist): any {
    console.log(track, 'track');
    console.log(playlist, 'playlist');
  }

  addToPlaylist(track): void {
    this.selectionService.addToPlaylist(track);

  }

  deleteTrack( trackId, playlistId ): void {
    this.selectionService.deleteTrack( trackId, playlistId );
  }



}
