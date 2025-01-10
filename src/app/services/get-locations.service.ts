import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitsResponse } from '../interfaces/location-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLocationsService {
  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      console.log(data);
    });
  }

  getAllLocations(): Observable<UnitsResponse> {
    return this.httpClient.get<UnitsResponse>(this.apiUrl);
  }
}
