import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.css']
})
export class ExternalLinksComponent {

  externalUrl: string;

  constructor(private _activateRouter: ActivatedRoute) {
    this._activateRouter.params.subscribe(params => this.externalUrl = params.external);
  }

}
