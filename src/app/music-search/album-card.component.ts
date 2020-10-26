import { hostViewClassName } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-card',
  template: `
  <div class="container">
    <img class="card-img-top img-fluid" [src]="image.url">
    <div class="card-body">
      <h5 class="card-title">{{album.name}}</h5>
    </div>
  </div>
  `,
  styles: [`
    :host(){
      flex: 0 0 30% !important;
      margin-bottom: 0.625rem  !important;
    }

    .container {
      padding: 0;
      margin-bottom: 1.5rem;
      position: relative;
      border: none !important;
    }

    .card {
      border: none !important;
    }

    .card-img-top {
      display: block;
      width: 100%;
      height: auto;
    }

    .card-body{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.8);
      width: 100%;
      height: 0;
      transition: .5s ease;
      color: #fff;
      visibility: hidden;
    }
    .container:hover .card-body {
      height: 30%;
      visibility: visible;
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
