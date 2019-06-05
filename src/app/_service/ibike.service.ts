import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class IbikeService {
    constructor(private http: HttpClient) {}

    getBikeStation() {
        let fileUrl = '/OpenData/b134e558-c436-4af2-abc0-41d463ec9b1e';
        let headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.get(fileUrl, {
            responseType: 'text',
            headers: headers
        });
    }
}