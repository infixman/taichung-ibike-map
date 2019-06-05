import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taichung-ibike-map';
  lat: number = 24.1580195;
  lng: number = 120.6569436;
}
