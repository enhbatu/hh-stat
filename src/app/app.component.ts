import { Component } from '@angular/core';
import { DataService } from './core/data.service';
import { AimagService } from './core/aimag.service';
import { StatData } from './core/stat-data';
import { Aimags } from './core/aimags';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subtitle: string;
  datatitle: string;
  mainclasses1: any[] = [];
  mainclasses2: any[] = [];
  mainclass1: any = '';
  mainclass2: any = '';
  parentclass: any;
  AimagValue: any;
  dataconfig: any;
  subclass: string;
  selectedDataConfig: any;
  subclassName: any;
  data_map1: StatData[];
  data_map2: StatData[];
  data_bar1: any[][] = [];
  aimags: Aimags[];
  selectedAimag: Aimags;
  BarChart: Chart;

  constructor(private service: DataService, private aimagService: AimagService) { }

  ngOnInit() {
    this.mainclasses1 = this.loadMainClass(1);
    this.mainclasses2 = this.loadMainClass(2);
    this.data_bar1[0] = [];
    this.data_bar1[1] = [];
    // Load config
    this.service.getconfig().subscribe((result) => {
      this.dataconfig = result;
      this.selectedDataConfig = this.dataconfig[0];
      this.getdata_map1(this.selectedDataConfig.percent);
      this.getdata_map2(this.selectedDataConfig.percent);
      this.getdata_bar1(0, this.mainclass1, this.dataconfig);
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
              console.log(event.point.id);
            }
          }
        }
      }
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
      this.mainclass1 = 0;
    }
    if (parentclass == 2) {
      mainclasses.push({ id: 0, Name: "Ажил хайж байгаа шалтгаанаар" });
      mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      // this.mainclasses.push({ id: 2, Name: "Боловсролын түвшнээр" });
      this.mainclass2 = 0;
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
      this.getdata_map1(this.selectedDataConfig.percent);
    }
  }

  getdata_map1(datakey: any) {
    this.service.getdata(1).subscribe((result) => {
      this.data_map1 = result;
      this.loadDataForMap(this.data_map1, this.selectedDataConfig.percent);
    });
  }

  getdata_map2(datakey: any) {
    this.service.getdata(2).subscribe((result) => {
      this.data_map2 = result;
      this.loadDataForMap(this.data_map2, this.selectedDataConfig.percent);
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
  getdata_bar1(aimagid: number, mainclass: number, dataconfig: any[]) {
    this.service.getdata(1).subscribe((result) => {
      this.data_bar1 = this.service.groupBy(dataconfig, result, 1, mainclass, aimagid);
      this.InitBarChart("", "", this.data_bar1[0], "", "", "", this.data_bar1[1])
    });
  }
  OnChangeMainClass(mainclass: number) {
    console.log(this.mainclass1);
    if (this.selectedAimag != undefined) {
      this.getdata_bar1(this.selectedAimag.AimagID, mainclass, this.dataconfig);
    }
    else {
      this.getdata_bar1(0, mainclass, this.dataconfig);
    }
  }
  onSelectAimag(aimag: Aimags) {
    this.selectedAimag = aimag;
    // console.log(this.selectedAimag);
  }
}
