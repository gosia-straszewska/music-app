import { Component, OnInit } from '@angular/core';
import { MusicSearchService} from './music-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-details',
  template: `
  <div class="container">
    <h4 class="display-3 mb-3 row justify-content-end mt-3">Utwory</h4>
    <div class="row mt-1 justify-content-center" *ngIf="album">
      <div class="col-4 mr-5">
        <app-album-card class="card" [album]="album"></app-album-card>
      </div>
      <div class="col-6">
        <app-track-list [tracks]="this.album['tracks'].items"></app-track-list>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .card {
    border: none !important;
  }
  `]
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
    console.log(this.album);
  }

}
