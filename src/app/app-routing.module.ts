/*tslint:disable*/
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './page/home/home.module#HomePageModule'
    },
    {
        path: 'login',
        loadChildren: './page/login/login.module#LoginPageModule'
    },
    {
        path: 'region-list',
        loadChildren: './page/region-list/region-list.module#RegionListPageModule'
    },
    {
        path: 'location-list',
        loadChildren: './page/location-list/location-list.module#LocationListPageModule'
    },
    {
        path: 'region-new', loadChildren: './page/region-new/region-new.module#RegionNewPageModule'
    },
    {
        path: 'location-new', loadChildren: './page/location-new/location-new.module#LocationNewPageModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
