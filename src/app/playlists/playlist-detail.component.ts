import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService, Playlist } from './playlists.service';

@Component({
  selector: 'app-playlist-detail',
  template: `
  <div *ngIf="!playlist">
      <p>Wybierz <b>playlistę</b></p>
  </div>
  <div *ngIf="playlist">
    <h3 class="card-title">{{playlist.name}}</h3>
    <app-track-list [playlist]="playlist" [tracks]="tracks"></app-track-list>
    <div class="form-group">
      <button class="btn btn-success float-xs-right" (click)="edit(playlist)">Edytuj</button>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class PlaylistDetailComponent implements OnInit {

  playlist;
  tracks: any[];

  edit(playlist): void {
    this.router.navigate(['playlist', playlist.id, 'edit']);
  }

  constructor(private activeRoute: ActivatedRoute,
              private playlistsService: PlaylistsService,
              private router: Router ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      // tslint:disable-next-line: radix
      const id = parseInt(params.id);
      if (id) {
        this.playlistsService.getPlaylist(id)
        .subscribe( (playlist: Playlist) => {
          this.playlist = playlist;
        });

        this.playlistsService.getTracksToPlaylist(id)
        .subscribe( tracks => {
            this.tracks = tracks;
          });
        // this.playlist = Object.assign({}, playlist); // <--- KOPIA DO EDYCJI FORMULARZA
      }
    }
    );
  }
}
