import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service';

@Component({
  selector: 'app-album-list',
  template: `
  <div class="card-deck justify-content-md-center">
    <app-album-card [album]="album" class="card mb-5"
    [routerLink]="['/music', 'album', album.id]"
    *ngFor="let album of albums | async"></app-album-card>
  </div>
  `,
  styles: [`
    .card {
      cursor: pointer;
    }
  `]
})
export class AlbumListComponent implements OnInit {

  albums: any;
  query: string;
  data: any;

  constructor( private musicSearch: MusicSearchService) { }

  ngOnInit(): void {
    this.albums = this.musicSearch.getAlbumsStream();
  }

}
