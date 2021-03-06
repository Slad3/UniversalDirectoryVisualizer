import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { TraversalWrapperComponent } from './traversal-wrapper/traversal-wrapper.component';
// import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
 
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent,
    TraversalWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
