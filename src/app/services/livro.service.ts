import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  BASE_URL = `${environment.BASE_URL}/livros`;

  constructor(private httpClient: HttpClient,
    private apiService: ApiService
  ) {
  }

  findAll(): Observable<any> {
    const url = this.BASE_URL;
    return this.apiService.getHeaderAndAuth().pipe(
      switchMap(header => {
        return this.httpClient.get(url, { headers: header });
      })
    );
  }

  create(book: any): Observable<any> {
    const url = this.BASE_URL;
    return this.apiService.getHeaderAndAuth().pipe(
      switchMap(header => {
        return this.httpClient.post(url, book, { headers: header });
      })
    );
  }

  update(book: any) {
    const url = this.BASE_URL;
    return this.apiService.getHeaderAndAuth().pipe(
      switchMap(header => {
        return this.httpClient.put(url, book, { headers: header });
      })
    );
  }

  delete(id: string) {
    const url = `${this.BASE_URL}/${id}`;
    return this.apiService.getHeaderAndAuth().pipe(
      switchMap(header => {
        return this.httpClient.delete(url, { headers: header });
      })
    );
  }
}
