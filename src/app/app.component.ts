import { Component } from '@angular/core';
import { IbikeService } from 'src/app/_service/ibike.service';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  
  ngOnInit() {
    let station;
    let bike;
    this.ibikeService.getBikeStation()
    .subscribe(
        data => {
            station = this.csv2obj(data);
            this.ibikeService.getBike().subscribe(
              data => {
                bike = this.getTableJson(data);
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

  getTableJson(htmlstr) {
    var table = this.str2dom(htmlstr).getElementById('myTable');
    const result = [];
    [].forEach.call(
      table.querySelectorAll('tr'),
      (lineElement) => {
        const rows = lineElement.querySelectorAll('td');
        if(rows.length >= 2) {
          let position = rows[1].innerText.trim().split('\n');
          result.push({
            name: position[0].trim(),
            address: position[1].trim(),
            bikes: rows[2].innerText.trim(),
            empty: rows[3].innerText.trim(),
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
    return JSON.stringify(result);
 }
}
