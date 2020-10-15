import { hostViewClassName } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-card',
  template: `
    <img class="card-img-top img-fluid" [src]="image.url">
    <div class="card-body">
      <h5 class="card-title">{{album.name}}</h5>
    </div>
  `,
  styles: [`
  :host(){
      flex: 0 0 25% !important;
      margin-bottom: 0.625rem  !important;
      overflow:hidden;
    }

    :host():hover .card-body{
      top: 100%;
    }

    .card-body{
      background: rgba(0,0,0,0.8);
      top:70%;
      color: #fff;
      font-size: 1em !important;
      transition: .2s top ease-out;
    }
`]
})
export class AlbumCardComponent implements OnInit {
  album: any;
  image: any;

  @Input('album')
  set setAlbum(album) {
    this.album = album;
    // this.image = album.images[0];
    this.image = album.images[0];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
