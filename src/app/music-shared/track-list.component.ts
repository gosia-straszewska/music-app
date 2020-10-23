import { Component, Input, OnInit } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';

@Component({
  selector: 'app-track-list',
  template: `
  <audio #audio_id controls style="width:100%"></audio>
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
          <td (click)="play(audio_id, track)">Graj</td>
          <td (click)="addToPlaylist(track)">Dodaj</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks: object;

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

}
