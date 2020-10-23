import { Component, OnInit } from '@angular/core';
import { PlaylistsService, Playlist } from './playlists.service';

@Component({
  selector: 'app-playlists-list',
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Utworów </th>
          <th> Ulubiona </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let playlist of playlists, let i = index" class="playlist-row"
        [ngStyle]="{ borderBottomColor:playlist.color }"
        [routerLink]=[playlist.id]>
          <td> {{ i + 1 }} </td>
          <td> {{ playlist.name }} </td>
          <td> {{ playlist.tracks.length }} </td>
          <td>
            <label><input type="checkbox" [(ngModel)]="playlist.favourite" (click)="$event.stopPropagation()">
            Ulubiona</label>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .playlist-row {
      border-bottom: 3px solid transparent;
    }
  `]
})
export class PlaylistsListComponent implements OnInit {

  playlists: Playlist[];

  constructor( private playlistsService: PlaylistsService) { }

  ngOnInit(): void {
    this.playlistsService.getPlaylistsStrem()
    .subscribe( (playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

}
