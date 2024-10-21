import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Ticket } from 'src/models/ticket';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  uri = "https://localhost:7059/api/Tickets/";
  constructor(private http:HttpClient) { }
  GetTickets():Observable<Ticket[]>
  {
    return this.http.get<Ticket[]>(this.uri);
  }
  getTicketsLimited(pageNumber: number, pageSize: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.uri+`?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

  GetTicket(id:number|null):Observable<Ticket>
  {
    return this.http.get<Ticket>(this.uri+id);
  }
  AddTicket(Ticket:Ticket):Observable<Ticket>
  {
    return this.http.post<Ticket>(this.uri,Ticket);
  }
  UpdateTicket(Ticket:Ticket):Observable<Ticket>
  {
    return this.http.put<Ticket>(this.uri,Ticket);
  }
  DeleteTicket(ticketId:number):Observable<Ticket>
  {
    return this.http.delete<Ticket>(this.uri+ticketId);
  }
}
