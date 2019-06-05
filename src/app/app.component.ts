import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    "../../node_modules/snazzy-info-window/dist/snazzy-info-window.css"
  ]
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
}
