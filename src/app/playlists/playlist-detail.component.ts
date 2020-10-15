import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'app-playlist-detail',
  template: `
  <div *ngIf="!playlist">
      <p>Wybierz <b>playlistę</b></p>
  </div>
  <div *ngIf="playlist">
    <h3 class="card-title">{{playlist.name}}</h3>
    <div class="form-group">
      <button class="btn btn-success float-xs-right" (click)="edit(playlist)">Edytuj</button>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class PlaylistDetailComponent implements OnInit {
  @Input()
  playlist;

  @Output()
  edited = new EventEmitter<any>();

  edit(playlist): void {
    this.edited.emit(playlist);
  }

  constructor( private activeRoute: ActivatedRoute,
               private playlistsService: PlaylistsService ) {
    // tslint:disable-next-line: radix
    const id = parseInt(this.activeRoute.snapshot.params.id);
    if (id) {
      this.playlist = this.playlistsService.getPlaylist(id)
    }
               }

  ngOnInit(): void {
  }

}
