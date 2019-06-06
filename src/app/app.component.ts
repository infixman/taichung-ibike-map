import { Component } from '@angular/core';
import { IbikeService } from 'src/app/_service/ibike.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private env = environment;
  title = 'Taichung iBike Map';
  lat: number = 24.1580195;
  lng: number = 120.6569436;
  zoomValue: number = 16;

  // style from https://snazzymaps.com/style/37/lunar-landscape
  styles = [
    {
        "stylers": [
            {
                "hue": "#ff1a00"
            },
            {
                "invert_lightness": true
            },
            {
                "saturation": -100
            },
            {
                "lightness": 33
            },
            {
                "gamma": 0.5
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2D333C"
            }
        ]
    }
  ];

  constructor(
    private ibikeService: IbikeService
  ) {}
  
  mapping = [];

  ngOnInit() {
    let station;
    let bike;
    this.ibikeService.getBikeStation()
    .subscribe(
        data => {
            station = this.csv2obj(data);
            this.ibikeService.getBike().subscribe(
              data => {
                bike = this.table2obj(data);
                this.mapping = this.mappingObj(station, bike);
                console.log(this.mapping);
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
    );
  }

  str2dom(htmlstr) {
    return new DOMParser().parseFromString(htmlstr, "text/html");
  }

  table2obj(htmlstr) {
    var table = this.str2dom(htmlstr).getElementById('myTable');
    const result = [];
    [].forEach.call(
      table.querySelectorAll('tr'),
      (lineElement) => {
        const rows = lineElement.querySelectorAll('td');
        if(rows.length >= 2) {
          let position = rows[1].innerText.trim().split('\n');
          result.push({
            Position: position[0].trim(),
            AvailableCNT: rows[2].innerText.trim(),
            EmpCNT: rows[3].innerText.trim(),
          });
        }
      }
    );

    return result;
  }

  csv2obj(csvStr) {
    var lines = csvStr.split("\n"); 
    var result = []; 
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length-1; i++) { 
        var obj = {};
        var currentline = lines[i].split(","); 
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
 
        result.push(obj);
    }
    return JSON.parse(JSON.stringify(result));
 }

  mappingObj(station, bike) {    
    for (var i = 0; i < station.length; i++) {
      for (var j = 0; j < bike.length; j++) {
        if (station[i].Position === bike[j].Position) {
          station[i].AvailableCNT = bike[j].AvailableCNT;
          station[i].EmpCNT = bike[j].EmpCNT;
        }
      }
    }
    return station;
  }

  parseFloat(n) {
    return parseFloat(n)
  }

  getIcon(item) {
    if ((item.AvailableCNT === 0 || item.AvailableCNT === '0') && (item.EmpCNT === 0 || item.EmpCNT === '0')) return this.env.repoName + '/assets/icon_service.png';
    if (item.AvailableCNT === 0 || item.AvailableCNT === '0') return this.env.repoName + './assets/icon_nobike.png';
    if (item.EmpCNT === 0 || item.EmpCNT === '0') return this.env.repoName + '/assets/icon_full.png';
    return this.env.repoName + '/assets/icon_nomo.png';
  }

  getService(item) {
    if ((item.AvailableCNT === 0 || item.AvailableCNT === '0') && (item.EmpCNT === 0 || item.EmpCNT === '0')) return `**維修中**
`;
    return '';

  }
}
