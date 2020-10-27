import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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


  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) {
    this.httpOptions = this.auth.httpOptions;
  }

  playlists;
  tracks;
  playlistServerUrl = 'http://localhost:3000/playlists/';
  tracksServerUrl = 'http://localhost:3000/tracks/';
  httpOptions;
  request: any;
  playlist: Playlist;
  trackIndexToDelete;
  trackToAdd: any;

  playlistsStream$ = new Subject<Playlist[]>();

  // OK

  addToPlaylist(playlistId, track): any {
    this.trackToAdd = track;
    this.trackToAdd.playlistId = playlistId;

    this.playlist = this.playlists.find(playlist => playlist.id.toString() === playlistId);
    const duplicate = this.playlist.tracks.some(el => el.id === track.id);
    if (!duplicate) {
      this.playlist.tracks.push(track);
    } else {
      return alert(`Ten utwór istnieje na playliście ${this.playlist.name}`);
    }
    this.savePlaylist(this.playlist)
    .subscribe( playlist => playlist);

    return this.http.post(this.tracksServerUrl, this.trackToAdd)
    .pipe(
      map( response => response)
    ).subscribe ();
  }

  deletePlaylist(playlist): any {
    const playlistToDelete = playlist.id;

    return this.http.delete(this.playlistServerUrl + playlistToDelete)
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

  // TODO:

  deleteTrack(playlistId, trackId): any {
    this.playlist = this.playlists.find(playlist => playlist.id === playlistId);
    this.trackIndexToDelete = this.playlist.tracks.findIndex(item => item.id === trackId);
    // console.log(this.playlist.tracks.length, 'length 1');
    // // console.log(this.trackIndexToDelete, 'del', track, playlistId);
    // this.playlist = this.playlist.tracks.splice(this.trackIndexToDelete, 1);
    // console.log(this.playlist.tracks.length, 'length 2');
    // this.playlist.tracks.push(track);
    // this.trackToDelete(trackId);
    return this.http.delete(this.playlistServerUrl + playlistId + '/tracks/' + this.trackIndexToDelete, this.options)
    // .pipe(
    //   map(response => response)
    // )
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(playlist => playlist
    );
  }

  savePlaylist(playlist): any {
    if (playlist.id) {
      this.request = this.http.put(this.playlistServerUrl + playlist.id, playlist);
    } else {
      this.request = this.http.post(this.playlistServerUrl, playlist);
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
    return this.http.get(this.playlistServerUrl)
      .pipe(
        map((response) => response)
      )
      .subscribe( playlists => {
        this.playlists = playlists;
        this.playlistsStream$.next(this.playlists);
      });
  }

  getTracksToPlaylist(id): any {
    return this.http.get(this.playlistServerUrl + `${id}/tracks`)
    .pipe(
      map( response => response)
    );
  }

  getPlaylistsStrem(): Observable<any> {
    if (!this.playlists) {
      this.getPlaylists();
    }
    return this.playlistsStream$.pipe(startWith(this.playlists));
  }

  getPlaylist(id): Observable<any> {
    return this.http.get(this.playlistServerUrl + id)
      .pipe(
        map( response => response)
      );
  }
}
