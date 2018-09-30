import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImapComponent } from './components/imap/imap.component';
import { IbarComponent } from './components/ibar/ibar.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    ChartModule 
  ],
  declarations: [
    ImapComponent,
    IbarComponent
  ],
  exports: [ImapComponent, IbarComponent]
})
export class IchartModule { }
