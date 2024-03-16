import { Injectable } from '@angular/core';
import { IZml } from '../interfaces/zml.interface';
import { IApiExceptions } from '../interfaces/exceptions.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPassport } from '../interfaces/passport-validation.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZmlserviceService {

  private readonly baseUrl = 'https://passport-validation-6s0j.onrender.com/api/v1/passport-validation/zlm';
  //private readonly baseUrl = 'http://127.0.0.1:8080/api/v1/passport-validation/zlm';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    let exceptions = {};
    if (error.status === 400 ){
      console.log(error)
      console.log(error.error)
      exceptions = error.error;
    }
    else{
      exceptions = {
        code: -2,
        message: "Unhandled error ocurred",
        details: error
      }
    }

    return throwError(() => new Error(JSON.stringify(exceptions)));
  }

  apiRequest(data: IPassport): Observable<IZml> {
    return this.http.post<IZml>(this.baseUrl, data).
      pipe(
        catchError(this.handleError)
      );
  }
}
