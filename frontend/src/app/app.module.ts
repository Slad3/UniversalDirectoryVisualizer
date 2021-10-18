import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrivePopupComponent } from './drive-popup/drive-popup.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { TraversalWrapperComponent } from './traversal-wrapper/traversal-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    DrivePopupComponent,
    VisualizationComponent,
    TraversalWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
