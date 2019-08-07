import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header-calendar',
  templateUrl: './header-calendar.component.html',
  styleUrls: ['./header-calendar.component.css']
})
export class HeaderCalendarComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'es';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
