import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;
  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Set Id
    this.id = this.route.snapshot.params['id'];
    // Get Client Details
    this.clientService.getClient(this.id).subscribe((client) => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
      console.log(this.client);
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
    this.router.navigateByUrl('/client/' + this.id);
  }

  onDeleteClick() {
    if (confirm('Are you sure to Delete ?')) {
      this.clientService.deleteClient(this.id);
      this.router.navigateByUrl('/');
    }
  }

}
