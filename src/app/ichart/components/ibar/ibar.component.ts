import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-ibar',
  templateUrl: './ibar.component.html',
  styleUrls: ['./ibar.component.css']
})
export class IbarComponent implements OnInit {
  chart: Chart;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() categories: any[];
  @Input() xtitle: string;
  @Input() ytitle: string;
  @Input() series_name: string;
  @Input() data: any[];


  constructor() { }

  ngOnInit() {
    console.log(this.series_name);
    console.log(this.data);
    this.chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subtitle
      },
      xAxis: {
        categories: this.categories,
        title: {
          text: this.xtitle
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: this.ytitle,
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: this.series_name,
        data: this.data
      }]
    });
  }

}
