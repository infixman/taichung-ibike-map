import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IbikeService {
    private env = environment;
    constructor(private http: HttpClient) {}

    getBikeStation() {
        return this.get(`${this.env.stationApiUrl}/OpenData/b134e558-c436-4af2-abc0-41d463ec9b1e`);
    }

    getBike() {
        return this.get(`${this.env.bikeApiUrl}/list`);
    }

    getHeaders() {
        let headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.append('Access-Control-Allow-Origin', '*');
        return headers;
    }

    get(url, type?) {
        let resType = type;
        if (!type) {
            resType = 'text';
        }
        
        return this.http.get(url, {
            responseType: resType,
            headers: this.getHeaders()
        });
    }
}