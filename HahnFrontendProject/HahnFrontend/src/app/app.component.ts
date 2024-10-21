import { Component , OnInit} from '@angular/core';
import { Ticket } from 'src/models/ticket';
import { TicketsService } from 'src/services/tickets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import{response} from 'express'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {

}
