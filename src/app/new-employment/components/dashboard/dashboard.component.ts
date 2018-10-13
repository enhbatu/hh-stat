import { Component, OnInit } from '@angular/core';
import { StatData } from 'src/app/core/stat-data';
import { Aimags } from 'src/app/core/aimags';
import { Chart } from 'angular-highcharts';
import { DataService } from 'src/app/core/data.service';
import { AimagService } from 'src/app/core/aimag.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subtitle: string;
  datatitle: string;
  mainclasses: any[] = [];
  mainclass: any = '';
  parentclass: any;
  AimagValue: any;
  dataconfig: any;
  subclass: string;
  selectedDataConfig: any;
  subclassName: any;
  data_map: StatData[];
  data_bar: any[][] = [];
  aimags: Aimags[];
  selectedAimag: Aimags;
  BarChart: Chart;
  BarChartBySex: Chart;
  data_barBySex: any[];

  constructor(private service: DataService, private aimagService: AimagService) { }

  ngOnInit() {
    this.mainclasses = this.loadMainClass(1);
    this.data_bar = [];
    // Load config
    this.service.getconfig().subscribe((result) => {
      this.dataconfig = result;
      this.selectedDataConfig = this.dataconfig[0];
      this.getdata_map(this.selectedDataConfig.percent);
      this.getdata_bar(0, this.mainclass, this.dataconfig);
      this.getdata_barBySex(0, this.mainclass, this.dataconfig);
    });
    this.aimagService.getdata().subscribe((result) => {
      this.aimags = result;
    })
  }

  InitBarChart(title: string, subtitle: string, categories: string[], xtitle: string, ytitle: string, series_name: string, data: any[]) {
    this.BarChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        categories: categories,
        title: {
          text: xtitle
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ytitle,
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            click: function (event) {
              // console.log(event.point.id);
            }
          }
        }
      },
      series: [{
        name: series_name,
        data: data,
      }]
    });
  }
  loadMainClass(parentclass: number): any[] {
    let mainclasses = [];
    if (parentclass == 1) {
      mainclasses.push({ id: 0, Name: "Ажил мэргэжлийн ангиллаар" });
      mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      mainclasses.push({ id: 2, Name: "Эдийн засгийн үйл ажиллагааны салбарын ангиллаар " });
      this.mainclass = 0;
    }
    if (parentclass == 2) {
      mainclasses.push({ id: 0, Name: "Ажил хайж байгаа шалтгаанаар" });
      mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      // this.mainclasses.push({ id: 2, Name: "Боловсролын түвшнээр" });
      this.mainclass = 0;
    }
    return mainclasses;
  }

  loadSubClass(parentclass: number, mainclass: number): void {
    this.service.getconfig().subscribe((result) => {
      if (this.dataconfig != undefined) {
        this.dataconfig = result.filter(x => x.parentclass == parentclass && x.mainclass == mainclass);
        this.subclass = "0";
        this.selectData(parentclass, this.subclass);
      }
    });
  }

  selectData(parentclass: number, subclass: string): void {
    if (this.dataconfig != undefined) {
      this.getDataName(this.subclass);
      this.getdata_map(this.selectedDataConfig.percent);
    }
  }

  getdata_map(datakey: any) {
    this.service.getdata(1).subscribe((result) => {
      this.data_map = result;
      this.loadDataForMap(this.data_map, this.selectedDataConfig.percent);
    });
  }

  loadDataForMap(data: any[], datakey: any) {
    this.service.sortDataById(
      this.service.calcCPercentData(data, datakey),
      datakey
    );
  }
  getDataName(id: any) {
    if (this.dataconfig != undefined) {
      for (var i = 0; i < this.dataconfig.length; i++) {
        if (id == this.dataconfig[i].id) {
          this.selectedDataConfig = this.dataconfig[i];
          this.subclassName = this.dataconfig[i].Name;
          return;
        }
      }
    }
  }
  getdata_bar(aimagid: number, mainclass: number, dataconfig: any[]) {
    this.service.getdata(1).subscribe((result) => {
      this.data_bar = this.service.groupBy(dataconfig, result, 1, mainclass, aimagid);
      this.InitBarChart("", "", this.data_bar[0], "", "", "", this.data_bar[1])
    });
  }
  getdata_barBySex(aimagid: number, mainclass: number, dataconfig: any[]) {
    this.service.getdata(1).subscribe((result) => {
      this.data_barBySex = this.service.groupBySex(dataconfig, result, 1, mainclass, aimagid);
      console.log(this.data_barBySex);
      // this.InitBarChartBySex("", "", data[0], "", "", "", data[1]);
    });
  }
  OnChangeMainClass(mainclass: number) {
    this.mainclass = mainclass
    if (this.selectedAimag != undefined) {
      this.getdata_bar(this.selectedAimag.AimagID, mainclass, this.dataconfig);
    }
    else {
      this.getdata_bar(0, mainclass, this.dataconfig);
    }
  }
  onSelectAimag(aimag: Aimags) {
    this.selectedAimag = aimag;
    // console.log(this.selectedAimag);
  }
}
