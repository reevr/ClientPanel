import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disabledBalanceOnAdd = true;

  constructor(
    public router: Router,
    public clientService: ClientService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disabledBalanceOnAdd = this.settingsService.getSettings().disabledBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disabledBalanceOnAdd) {
      value.balance = 0;
    }
    if (valid) {
      this.clientService.newClient(value);
      this.router.navigateByUrl('/');
    }
  }

}
