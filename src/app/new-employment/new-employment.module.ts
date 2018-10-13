import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewEmploymentRoutingModule } from './new-employment.routes';
import { FormsModule } from '@angular/forms';
import { IchartModule } from '../ichart/ichart.module';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NewEmploymentRoutingModule,
    IchartModule,
    ChartModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class NewEmploymentModule { }
