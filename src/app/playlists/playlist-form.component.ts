import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { PlaylistsService, Playlist } from './playlists.service';

@Component({
  selector: 'app-playlist-form',
  template: `
      <div *ngIf="playlist">
        <form #formRef="ngForm" (ngSubmit)="save(formRef.valid, playlist)">
        <div class="form-group">
          <label>Nazwa:</label>
          <input type="text" #nameRef="ngModel" required minlength="3"
          [(ngModel)]="playlist.name" class="form-control" name="name">
          <div *ngIf="formRef.touched || formRef.dirty || formRef.submitted">
            <div *ngIf="nameRef.errors?.required" style="color: red">To pole jest wymagane.</div>
            <div *ngIf="nameRef.errors?.minlength" style="color: red">To pole musi mieć przynajmniej {{nameRef.errors.minlength.requiredLength}} znaki.</div>
          </div>
        </div>
        <div class="form-group">
          <label>Opis:</label>
          <textarea #descriptionRef="ngModel" [(ngModel)]="playlist.description"
          maxlength="200" class="form-control" name="description"></textarea>
        </div>
        <div class="form-group">
          <label>Kategoria:</label>
          <select class="form-control" [(ngModel)]="playlist.category" name="category">
            <option *ngFor="let category of categories" [value]="category">{{category}}</option>
          </select>
        </div>
        <!-- <div class="form-group">
          <label>Kategoria:</label>
          <div *ngFor="let category of categories">
          <label class="form-check">
            <input class="form-check-input" type="radio" [(ngModel)]="playlist.category" name="category" [value]="category">{{category}}
          </label>
          </div>
        </div> -->
        <div class="form-group">
          <label>Kolor:</label>
          <input type="color" [(ngModel)]="playlist.color" name="color">
        </div>
        <div class="form-group">
          <label><input type="checkbox" [(ngModel)]="playlist.favourite" name="favourite">
          Ulubiona</label>
        </div>
        <div class="form-group row justify-content-between">
          <button class="btn btn-success float-xs-right ml-3"
          type="submit">Zapisz</button>
          <button class="btn btn-danger float-xs-right mr-3"
          (click)="deletePlaylist(playlist)">Usuń</button>
        </div>
        </form>
      </div>
  `,
  styles: [`
    input.ng-dirty.ng-invalid,
    textarea.ng-dirty.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class PlaylistFormComponent implements OnInit {

  playlist;
  categories: string[] = ['Filmowa', 'Rock', 'Inna'];
  deleted = false;

  constructor(private activeRoute: ActivatedRoute,
              private playlistsService: PlaylistsService,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      // tslint:disable-next-line: radix
      const id = parseInt(params.id);
      if (id) {
        this.playlistsService.getPlaylist(id)
        .subscribe( (playlist: Playlist) => {
          this.playlist = playlist;
          this.playlist = Object.assign({}, playlist); // <--- KOPIA DO EDYCJI FORMULARZA
        });
      } else {
        this.playlist = this.playlistsService.createPlaylist();
      }
    }
    );
  }

  save(valid, playlist): void {
    const playlistId = playlist.id;
    if (!valid) {
      return;
    } else if (valid && this.deleted === false) {
      this.playlistsService.savePlaylist(playlist)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe( playlist => {
        playlistId ? this.router.navigate(['playlist/' + playlistId]) : this.router.navigate(['playlist']);
      });
    }
  }

  deletePlaylist(playlist): any {
    this.deleted = true;
    this.playlistsService.deletePlaylist(playlist);
  }

}
