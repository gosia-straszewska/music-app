import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-playlist-form',
  template: `
      <div>
        <div class="form-group">
          <label>Nazwa:</label>
          <input type="text" [(ngModel)]="playlist.name" class="form-control">
        </div>
        <div class="form-group">
          <label>Utwory:</label>
          <input type="text" [value]="playlist.tracks + ' utwory'" disabled class="form-control">
        </div>
        <div class="form-group">
          <label>Kolor:</label>
          <input type="color" [(ngModel)]="playlist.color">
        </div>
        <div class="form-group">
          <label><input type="checkbox" [(ngModel)]="playlist.favourite">
          Ulubiona</label>
        </div>
        <div class="form-group">
          <button class="btn btn-success float-xs-right" (click)="save(playlist)">Zapisz</button>
        </div>
      </div>
  `,
  styles: [
  ]
})
export class PlaylistFormComponent implements OnInit {
  @Input()
  playlist;

  @Output()
  saved = new EventEmitter();

  save(playlist): void {
    this.saved.emit(playlist);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
