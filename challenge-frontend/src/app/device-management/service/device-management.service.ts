import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ChallengeHttpResponse } from 'src/models/challenge-http-response';
import { DeviceManagement } from '../models/device-management';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DeviceManagementService {

    //#region Constructor

    constructor(private http: HttpClient) {}

    //#endregion

    //#region Methods

    //#region Select

    public getAll(): Observable<ChallengeHttpResponse<DeviceManagement>> {
        return this.http.get<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices`);
    }

    //#endregion

    //#region Insert

    public insert(device: DeviceManagement): Observable<ChallengeHttpResponse<DeviceManagement>> {
        return this.http.post<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/insert`, device);
    }

    //#endregion

    //#endregion
}
