import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChallengeHttpResponse } from 'src/models/challenge-http-response';
import { CategoryManagement } from '../models/category-management';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {

    //#region Constructor

    constructor(private http: HttpClient) {}

    //#endregion

    //#region Methods

    //#region Select

    public getAll(): Observable<ChallengeHttpResponse<CategoryManagement>> {
        return this.http.get<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories`);
    }

    public getById(id: number): Observable<ChallengeHttpResponse<CategoryManagement>> {
        return this.http.get<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/${id}`);
    }
    
    //#endregion

    //#region Insert

    public insert(category: CategoryManagement): Observable<ChallengeHttpResponse<CategoryManagement>> {
        return this.http.post<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/insert`, category);
    }

    //#endregion

    //#region Update

    public update(id: number, category: CategoryManagement): Observable<ChallengeHttpResponse<CategoryManagement>> {
        return this.http.patch<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/${id}`, category);
    }

    //#endregion

    //#region Delete

    public delete(id: number): Observable<ChallengeHttpResponse<CategoryManagement>> {
        return this.http.delete<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/${id}`);
    }

    //#endregion

    //#endregion
}
