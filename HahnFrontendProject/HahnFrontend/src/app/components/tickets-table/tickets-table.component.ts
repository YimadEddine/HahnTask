import { Component , OnInit} from '@angular/core';
import { Ticket } from 'src/models/ticket';
import { TicketsService } from 'src/services/tickets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css']
})
export class TicketsTableComponent {
  NoTicketsMessage = "";
  filteredTickets: Ticket[] = [];
  filterText: string = '';
  sortDirection: string = 'asc';
  sortKey: keyof Ticket = 'description';
  pageNumber: number = 1;
  pageSize: number = 3;
  Tickets: Ticket[] = [];
  
  constructor(private ticketsService:TicketsService, private router:Router){}
  ngOnInit(): void {
  this.LoadTickets();
 }
 LoadTickets(){
  this.ticketsService.getTicketsLimited(this.pageNumber, this.pageSize).subscribe(response =>{
    this.Tickets = response as Ticket[];
    this.filteredTickets = this.Tickets;
    
   console.log(JSON.stringify(this.Tickets));
  },
  error => {
    console.error('Error fetching tickets:', error);
    this.showErrorAlert("while fetching data");
    
   
  });
 }
   updateTicket(ticketId: any) {
 
     this.router.navigate(['/update', ticketId]);
   }
 
   deleteTicket(ticketId: number) {
     Swal.fire({
       title: 'Warning',
       text: 'Do you want to delete the ticket with id '+ticketId+' ?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes',
       cancelButtonText: 'No'
     }).then((result) => {
       if (result.isConfirmed) {
         this.ticketsService.DeleteTicket(ticketId).subscribe(response=>{
           console.log(JSON.stringify(response))
           this.showSuccessAlert();
           this.filteredTickets=this.filteredTickets?.filter(t=>t.id != ticketId)
         },error=>{
           this.showErrorAlert();
         })
         
       }
       
     });
     this.Tickets = this.Tickets!.filter(ticket => ticket.id !== ticketId);
     console.log('Deleted ticket with ID:', ticketId);
   }
   GoToAddNew():void{
     this.router.navigate(['/add']);
   }
   showSuccessAlert() {
     Swal.fire({
       title: 'Success!',
       text: 'Your action was successful.',
       icon: 'success',
       confirmButtonText: 'Okay'
     });
   }
   showErrorAlert(additionalInfo:string='') {
     Swal.fire({
       title: 'Error!',
       text: 'An Error has occured '+additionalInfo,
       icon: 'error',
       confirmButtonText: 'Okay'
     });
   }

   filterTickets() {
    this.filteredTickets = this.Tickets.filter(ticket =>
        ticket.description!.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.sortTickets();
}

sortTickets() {
  this.filteredTickets.sort((a, b) => {
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      if (a[this.sortKey]!< b[this.sortKey]!) return -1 * modifier;
      if (a[this.sortKey]! > b[this.sortKey]!) return 1 * modifier;
      return 0;
  });
}

toggleSort(key: keyof Ticket) {
  console.log("clicked");
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortTickets();
}
goToNextPage() {
  this.pageNumber++;
  this.LoadTickets();
}

goToPreviousPage() {
  if (this.pageNumber > 1) {
      this.pageNumber--;
      this.LoadTickets();
  }
}
}
