import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  selected = null;
  edited: object = {};
  mode = 'none';
  playlists;

  constructor(
    private playlistsService: PlaylistsService,
    ) {}

  ngOnInit(): void {
    this.playlists = this.playlistsService.getPlaylists();
  }

  select(playlist): void {
    if (playlist !== this.selected){
      this.mode = 'selected';
      this.selected = playlist;
    }
  }

  edit(playlist): void {
    this.mode = 'edit';
    this.edited = Object.assign({}, playlist);
    this.selected = playlist;
  }

  createNew(): void {
    this.mode = 'edit';
    const newPlaylist = this.playlistsService.createPlaylist();
    this.selected = newPlaylist;
    this.edited = newPlaylist;
  }

  save(playlist): void {
    this.playlistsService.savePlaylist(playlist);
  }
}
