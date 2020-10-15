import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from as observableFrom, Observable, Subject } from 'rxjs';
import { startWith, map , tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MusicSearchService {

  albums = [];
  query: string;
  data: any;
  url: string;
  albumUrl: string;
  token: string;
  httpOptions: object;
  albumsStream = new Subject();

  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = this.auth.token;
    this.search('Lady Gaga'); // default search when enter on the web
  }

  getAlbum(id): Observable<Response> {
    this.albumUrl = `https://api.spotify.com/v1/albums/${id}`;

    return this.http.get(this.albumUrl, this.httpOptions)
    .pipe(
      map((response: Response) => response)
    );
  }

  getAlbumsStream(): Observable<any> {
    // create Observable from Subject
    return observableFrom(this.albumsStream).pipe(startWith(this.albums));
  }

  search(query): void {
    this.httpOptions = this.auth.getHeaders();
    this.url = `https://api.spotify.com/v1/search?q=${query}&type=album`;

    this.http.get(this.url, this.httpOptions)
    .pipe(
      map((response: Response) => {
        this.data = response;
        return this.data.albums.items;
      }),
      tap(albums => {
        this.albums = albums;
      })
    ).subscribe( albums => {
        this.albumsStream.next(this.albums);
      }
      );
  }
}
