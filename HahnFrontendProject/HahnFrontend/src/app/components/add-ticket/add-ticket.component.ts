import { Component } from '@angular/core';
import { Ticket } from 'src/models/ticket';
import { TicketsService } from 'src/services/tickets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent {
  constructor(private ticketService:TicketsService, private router:Router){}
  Description: string = '';
  selectStatusValue: string = '';
  DescriptionError = '';
  StatusError = '';
ticket = new Ticket()
  onSubmit() {
    if(this.Description == "" || this.Description==null) this.DescriptionError = "Description Required"
    if(this.selectStatusValue == "" || this.Description==null) this.StatusError = "Please choose an option"
    if (this.Description && this.selectStatusValue) {
      this.ticket.description=this.Description;
      this.ticket.status=this.selectStatusValue;
     this.ticketService.AddTicket(this.ticket).subscribe(response=>{
        console.log(JSON.stringify(response));
        Swal.fire({
          title: 'Success!',
          text: 'Ticket Added successfully',
          icon: 'success',
          timer: 1500
        });
     },error=>{
      console.log(JSON.stringify(error));
      Swal.fire({
        title: 'Error!',
        text: 'Error occured while adding your ticket',
        icon: 'error',
        timer: 1500
      });
     })
      this.Description = '';
      this.selectStatusValue = '';
    } 
  }
  goBack()
  {
    this.router.navigate(['/tickets']);
  }
}
