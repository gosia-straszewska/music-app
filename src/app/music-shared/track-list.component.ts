import { Component, Input, OnInit } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';

@Component({
  selector: 'app-track-list',
  template: `
  <audio #audio_id controls style="width:100%" class="mb-4"></audio>
  <nav *ngIf="!playlistName" class="navbar navbar-light bg-faded navbar-fixed-bottom">
    <div class="container">
      <div class="row" style="width:100%">
        <div class="col-xs-6" style="width:100%">
          <app-playlist-selector> </app-playlist-selector>
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
          <td (click)="play(audio_id, track)">&#9654;</td>
          <td *ngIf="!playlistName"(click)="addToPlaylist(track)" style="color: green">&#10010;</td>
          <td *ngIf="playlistName" (click)="deleteFromPlaylist(track)" style="color: red">&#9644;</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
  `]
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks: object;

  @Input()
  playlistName: string;

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

  addToPlaylist(track): void {
    this.selectionService.addToPlaylist(track);
  }

  deleteFromPlaylist(track): void {
    this.selectionService.deleteFromPlaylist(track)
  }



}
