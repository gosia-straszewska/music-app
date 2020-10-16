import { RouterModule, Routes } from '@angular/router';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistFormComponent } from './playlist-form.component';

const routesConfig: Routes = [
    { path: 'playlist', component: PlaylistsComponent,
        children: [
          { path: '', component: PlaylistDetailComponent },
          { path: 'new', component: PlaylistFormComponent },
          { path: ':id', component: PlaylistDetailComponent },
          { path: ':id/edit', component: PlaylistFormComponent },
        ]
      },
];

export const routerModule = RouterModule.forChild(routesConfig);
