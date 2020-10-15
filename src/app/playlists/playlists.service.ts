import { Inject, Injectable, Optional } from '@angular/core';
import playlistsData from './playlists.data';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  playlists = [];

  // tslint:disable-next-line: no-shadowed-variable
  constructor(@Optional() @Inject('PlaylistsData') playlistsData) {
    this.playlists = playlistsData === null ? this.playlists : playlistsData;
  }

  savePlaylist(playlist): void {
    if (playlist.id){
      const index = this.playlists.findIndex( oldPlaylist =>
        oldPlaylist.id === playlist.id
      );
      this.playlists.splice(index, 1, playlist);
      console.log('Zapisano', playlist);
    } else {
      playlist.id = Date.now();
      this.playlists.push(playlist);
    }
  }

  createPlaylist(): object {
    const newPlaylist = {
      name: '',
      tracks: 0,
      color: '#0000FF',
      favourite: false,
    };
    return Object.assign({}, newPlaylist);
  }

  getPlaylists(): Array<object>{
    return this.playlists;
  }
  getPlaylist(id): Array<object> {
    return this.playlists.find(playlist => playlist.id === id);
  }
}
