import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-list',
  template: `
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

}
