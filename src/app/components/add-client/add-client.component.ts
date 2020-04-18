import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../modules/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  constructor(
    private flashMessage: FlashMessagesService,
    private ClientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      //show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      //Add new Client
      this.ClientService.newClient(value);
      //show message
      this.flashMessage.show('New user added!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      //redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
