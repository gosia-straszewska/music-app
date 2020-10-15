import { RouterModule, Routes } from '@angular/router';

const routesConfig: Routes = [
    { path: '', redirectTo: 'music', pathMatch: 'full' },
    { path: '**', redirectTo: 'music', pathMatch: 'full' },
];

export const routerModule = RouterModule.forRoot(routesConfig, {
    // enableTracing: true,
    // useHash: true
});
