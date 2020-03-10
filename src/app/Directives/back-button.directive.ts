import {Directive, HostListener} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Directive({
  selector: '[appBackButton]',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class BackButtonDirective {

  constructor(public location: Location) {
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
