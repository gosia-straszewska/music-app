import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <h3>
          <a routerLink="/" class="navbar-brand">MusicApp</a>
        </h3>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" routerLink="/music" routerLinkActive="active"> Szukaj Muzyki </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/playlist" routerLinkActive="active"> Twoje Playlisty </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
