import { Component, Input, OnInit } from '@angular/core';

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
        <tr *ngFor="let track of tracks" (click)="play(audio_id, track)">
          <td> {{track.track_number}} </td>
          <td> {{track.name}} </td>
          <td> {{track.artists[0].name}} </td>
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

  constructor() { }

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

}
