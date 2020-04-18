import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../modules/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private ClientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    //Get id from URL
    this.id = this.route.snapshot.params['id'];
    //Get client
    this.ClientService.getClient(this.id).subscribe((client) => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.ClientService.deleteClient(this.client);
      this.flashMessage.show('Client removed', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
      this.router.navigate(['/']);
    }
  }

  updateBalance() {
    this.ClientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }
}
