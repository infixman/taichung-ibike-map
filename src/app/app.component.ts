import { Component } from '@angular/core';
import { IbikeService } from 'src/app/_service/ibike.service';

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
    this.ibikeService.getBikeStation()
    .subscribe(
        data => {
            console.log(data);

            this.ibikeService.getBike().subscribe(
              data => {
                console.log(data)

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
}
