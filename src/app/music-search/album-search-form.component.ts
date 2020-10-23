import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-album-search-form',
  template: `
  <form [formGroup]="searchForm">
    <div class="input-group mb-5">
      <input type="text" formControlName="query" class="form-control" placeholder="Słowa kluczowe">
    </div>
  </form>
  `,
  styles: []
})
export class AlbumSearchFormComponent implements OnInit {

  query: string;
  albums: [];
  searchForm: FormGroup;

  constructor(
    private musicSearch: MusicSearchService
  ) {
    this.searchForm = new FormGroup({
      query: new FormControl('Lady Gaga')
    });
    this.searchForm.get('query').valueChanges
      .pipe(
        filter(query => query.length >= 3),
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe(query => {
        this.musicSearch.search(query);
      });
  }

  ngOnInit(): void {
  }

  search(query): void {
    this.musicSearch.search(query);
  }

}
