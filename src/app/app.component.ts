import { Component } from '@angular/core';
import { DataService } from './core/data.service';
import { AimagService } from './core/aimag.service';
import { StatData } from './core/stat-data';
import { Aimags } from './core/aimags';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subtitle: string;
  datatitle: string;
  mainclasses: any[] = [];
  mainclass: any[];
  parentclass: any;
  AimagValue: any;
  dataconfig: any;
  subclass: string;
  selectedDataConfig: any;
  subclassName: any;
  data_map1: StatData[];
  data_map2: StatData[];
  aimags: Aimags[];
  selectedAimag: Aimags;

  constructor(private service: DataService, private aimagService: AimagService) {

  }

  ngOnInit() {
    this.mainclass = [];
    // Load config
    this.service.getconfig().subscribe((result) => {
      this.dataconfig = result;
      this.selectedDataConfig = this.dataconfig[0];
      this.getdata_map1(this.selectedDataConfig.percent);
      this.getdata_map2(this.selectedDataConfig.percent);
    });
    this.aimagService.getdata().subscribe((result) => {
      this.aimags = result;
    })
  }

  loadMainClass(parentclass: number): any[] {
    let mainclasses = [];
    if (parentclass == 1) {
      mainclasses.push({ id: 0, Name: "Ажил мэргэжлийн ангиллаар" });
      mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      mainclasses.push({ id: 2, Name: "Эдийн засгийн үйл ажиллагааны салбарын ангиллаар " });
    }
    if (parentclass == 2) {
      mainclasses.push({ id: 0, Name: "Ажил хайж байгаа шалтгаанаар" });
      mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      // this.mainclasses.push({ id: 2, Name: "Боловсролын түвшнээр" });
    }
    this.mainclass[parentclass - 1] = 0;
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
  onSelectAimag(aimag: Aimags) {
    this.selectedAimag = aimag;
    // console.log(this.selectedAimag);
  }
}
