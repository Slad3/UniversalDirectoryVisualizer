import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrivePopupComponent } from './drive-popup/drive-popup.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'drivePopup', component: DrivePopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
