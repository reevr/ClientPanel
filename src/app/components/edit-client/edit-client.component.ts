import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id = '';
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disabledBalanceOnEdit = true;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    // Set disabledBalanceOnEdit
    this.disabledBalanceOnEdit = this.settingsService.getSettings().disabledBalanceOnEdit;
    // Set Id
    this.id = this.route.snapshot.params['id'];
    // Get Client Details
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
      console.log(this.client);
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (valid) {
      this.clientService.updateClient(this.id, value);
      this.router.navigateByUrl('/client/' + this.id);
    } else {
      this.router.navigateByUrl('/edit-client/' + this.id);
    }
  }


}
