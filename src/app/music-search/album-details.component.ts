import { Component, OnInit } from '@angular/core';
import { MusicSearchService} from './music-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-details',
  template: `
    <div class="row mt-1" *ngIf="album">
      <div class="col-xs">
        <app-album-card class="card" [album]="album"></app-album-card>
      </div>
      <div class="col-xs">
        <h4 class="display-3 mb-2 float-right">Utwory</h4>
        <app-track-list [tracks]="this.album['tracks'].items"></app-track-list>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AlbumDetailsComponent implements OnInit {

    album: object;
  constructor( private musicService: MusicSearchService,
               private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params.album_id;
    console.log(id);
    this.musicService.getAlbum(id)
    .subscribe(album => {
      this.album = album;
    });
  }

}
