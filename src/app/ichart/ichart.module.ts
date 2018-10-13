import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImapComponent } from './components/imap/imap.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    ChartModule
  ],
  declarations: [
    ImapComponent,
  ],
  exports: [ImapComponent]
})
export class IchartModule { }
