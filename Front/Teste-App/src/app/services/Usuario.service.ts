import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  baseURL = 'https://localhost:5001/api/Usuarios';

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL);
  }

  public getUsuariosByNome(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/${nome}/nome`);
  }
  public getUsuariosById(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/${id}`);
  }

  public put(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.baseURL+`/${id}`, usuario);
  }

  public post(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL, usuario);
  }

  public delete(id: number) {
    return this.http.delete(this.baseURL+`/${id}`);
  }
}
