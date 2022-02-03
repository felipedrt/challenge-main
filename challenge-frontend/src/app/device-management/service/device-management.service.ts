import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ChallengeHttpResponse } from 'src/models/challenge-http-response';
import { CategoryManagement } from '../models/category-management';
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

    public getById(id: number): Observable<ChallengeHttpResponse<DeviceManagement>> {
        return this.http.get<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/${id}`);
    }
    
    public getCategories(): Observable<ChallengeHttpResponse<CategoryManagement>> {
        return this.http.get<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories`);
    }

    //#endregion

    //#region Insert

    public insert(device: DeviceManagement): Observable<ChallengeHttpResponse<DeviceManagement>> {
        return this.http.post<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/insert`, device);
    }

    //#endregion

    //#region Update

    public Update(id: number, device: DeviceManagement): Observable<ChallengeHttpResponse<DeviceManagement>> {
        return this.http.patch<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/${id}`, device);
    }

    //#endregion

    //#region Delete

    public delete(id: number): Observable<ChallengeHttpResponse<DeviceManagement>> {
        return this.http.delete<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/${id}`);
    }

    //#endregion

    //#endregion
}
