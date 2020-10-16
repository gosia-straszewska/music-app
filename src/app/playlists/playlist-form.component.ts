import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'app-playlist-form',
  template: `
      <div *ngIf="playlist">
        <div class="form-group">
          <label>Nazwa:</label>
          <input type="text" [(ngModel)]="playlist.name" class="form-control">
        </div>
        <div class="form-group">
          <label>Utwory:</label>
          <input type="text" [value]="playlist.tracks + ' utwory'" disabled class="form-control">
        </div>
        <div class="form-group">
          <label>Kolor:</label>
          <input type="color" [(ngModel)]="playlist.color">
        </div>
        <div class="form-group">
          <label><input type="checkbox" [(ngModel)]="playlist.favourite">
          Ulubiona</label>
        </div>
        <div class="form-group">
          <button class="btn btn-success float-xs-right" (click)="save(playlist)">Zapisz</button>
        </div>
      </div>
  `,
  styles: [
  ]
})
export class PlaylistFormComponent implements OnInit {

  playlist;

  save(playlist): void {
    this.playlistsService.savePlaylist(playlist);
    this.router.navigate(['playlist', playlist.id ]);
  }

  constructor(private activeRoute: ActivatedRoute,
              private playlistsService: PlaylistsService,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      // tslint:disable-next-line: radix
      const id = parseInt(params.id);
      if (id) {
        const playlist = this.playlistsService.getPlaylist(id);
        this.playlist = Object.assign({}, playlist); // <--- KOPIA DO EDYCJI FORMULARZA
      } else {
        this.playlist = this.playlistsService.createPlaylist();
      }
    }
    );
  }

}
