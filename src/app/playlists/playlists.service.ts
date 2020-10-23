import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

export interface Playlist {
      id?: number;
      name: string;
      tracks: any[];
      color: string;
      favourite: boolean;
      category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {


  constructor( private http: HttpClient, private auth: AuthService) {
    this.httpOptions = this.auth.httpOptions;
  }

  playlists;
  serverUrl = 'http://localhost:3000/playlists/';
  httpOptions;
  request: any;
  playlist: Playlist;

  playlistsStream$ = new Subject<Playlist[]>();

  addToPlaylist(playlistId, track): void {
    this.playlist = this.playlists.find( playlist => playlist.id.toString() === playlistId);
    this.playlist.tracks.push(track);
    this.savePlaylist(this.playlist);
    //  .subscribe( () => {
    //   // ...
    //  });
  }

  // TODO:

  deleteFromPlaylist(playlistId, track): void {
    this.playlist = this.playlists.find( playlist => playlist.id.toString() === playlistId);
    this.playlist.tracks = this.playlist.tracks.filter(trackItem => trackItem !== track);
    // this.playlist.tracks.push(track);
    this.savePlaylist(this.playlist);
    //  .subscribe( () => {
    //   // ...
    //  });
  }

  savePlaylist(playlist): any {
    if (playlist.id){
      this.request = this.http.put(this.serverUrl + playlist.id, playlist);
    } else {
      this.request = this.http.post(this.serverUrl, playlist);
    }
    return this.request.pipe(
      map( response => response),
      // tslint:disable-next-line: no-shadowed-variable
      tap( playlist => {
        this.getPlaylists();
      })
    )
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe( playlist => {
      this.getPlaylists();
    });
  }

  createPlaylist(): Playlist {
    return {
      name: '',
      tracks: [],
      color: '#0000FF',
      favourite: false,
    };
  }

  getPlaylists(): any {
    return this.http.get(this.serverUrl)
    .pipe(
      map((response) => response)
    )
    .subscribe( playlists => {
      this.playlists = playlists;
      this.playlistsStream$.next(this.playlists);
    });
  }

  getPlaylistsStrem(): Observable<any> {
    if (!this.playlists) {
        this.getPlaylists();
    }
    return this.playlistsStream$.pipe(startWith(this.playlists));
  }

  getPlaylist(id): Observable<any> {
    return this.http.get(this.serverUrl + id)
    .pipe(
      map( response => response)
    );
  }
}
