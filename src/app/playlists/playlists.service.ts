import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Playlist {
  id?: number;
  name: string;
  tracks: any;
  color: string;
  favourite: boolean;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {


  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) {
    this.httpOptions = this.auth.httpOptions;
  }

  playlists;
  serverUrl = 'http://localhost:3000/playlists/';
  httpOptions;
  request: any;
  playlist: Playlist;
  trackIndexToDelete;

  playlistsStream$ = new Subject<Playlist[]>();

  addToPlaylist(playlistId, track): void {
    this.playlist = this.playlists.find(playlist => playlist.id.toString() === playlistId);
    const duplicate = this.playlist.tracks.some(el => el.id === track.id);
    if (!duplicate) {
      this.playlist.tracks.push(track);
    } else {
      return alert(`Ten utwór istnieje na playliście ${this.playlist.name}`);
    }
    this.savePlaylist(this.playlist);
    //  .subscribe( () => {
    //   // ...
    //  });
  }

  // TODO:

  deletePlaylist(playlist): any {
    const playlistToDelete = playlist.id;

    return this.http.delete(this.serverUrl + playlistToDelete)
    .pipe(
      map( response => response),
      // tslint:disable-next-line: no-shadowed-variable
      tap( playlist => {
        this.getPlaylists();
      })
    )
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe( playlist => {
      this.router.navigate(['playlist']);
    });
  }

  deleteTrack(playlistId, track): void {
    this.playlist = this.playlists.find(playlist => playlist.id === playlistId);
    this.trackIndexToDelete = this.playlist.tracks.findIndex(item => item.id === track.id);
    console.log(this.trackIndexToDelete, 'del', track, playlistId);
    this.playlist = this.playlist.tracks.splice(this.trackIndexToDelete, 1);
    // this.playlist.tracks.push(track);
    this.deleteFromPlaylist(playlistId);
    //  .subscribe( () => {
    //   // ...
    //  });
  }

  deleteFromPlaylist(playlistId): any {
    return this.http.delete(this.serverUrl + playlistId)
      .pipe(
        map(response => response)
      )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(playlist => {
        this.updatePlaylist(playlistId);
      });
  }

  updatePlaylist(playlistId): any {
    return this.http.post(this.serverUrl + playlistId, this.playlist);
  }

  savePlaylist(playlist): any {
    if (playlist.id) {
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
    );
      // tslint:disable-next-line: no-shadowed-variable
      // .subscribe( playlist => {
      //   this.getPlaylists();
      // });
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
