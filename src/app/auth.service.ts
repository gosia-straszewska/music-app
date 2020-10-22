import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  httpOptions: object;

  constructor(private http: HttpClient) {
  }

  getHeaders(): object {
    return this.httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line: object-literal-key-quotes
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'Accept': 'application/json'
      })
    };
  }

  getToken(): any {
    this.token = localStorage.getItem('token');

    if (this.token === null) {
      const match = window.location.hash.match(/#access_token=(.*?)&/);
      this.token = match && match[1];
      localStorage.setItem('token', this.token);
    }

    if (this.token === null) {
      this.authorize();
    }

    console.log(this.token);
    return this.token;
  }
  // DO ĆWICZENIA POBIERANIA DANYCH Z API

  // getData(): any {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //         // tslint:disable-next-line: object-literal-key-quotes
  //         'Authorization': 'Bearer ' + this.token,
  //         'Content-Type': 'application/json',
  //         // tslint:disable-next-line: object-literal-key-quotes
  //         'Accept': 'application/json'
  //     })
  //   };

  //   return this.http.get('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy?market=ES', httpOptions)
  //         ribe(res => console.log(res));
  // }

  authorize(): void {
    localStorage.removeItem('token');

    const clientId = 'ae84c6332df74973a0176a7edc3984f1';
    const redirectUri = 'http://localhost:4200/';

    window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`);
  }
}
