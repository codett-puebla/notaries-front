import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  CalendarView = CalendarView;

  view = CalendarView.Month;

  viewDate = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        console.log(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    }
  ];

  externalEvents: CalendarEvent[] = [
    {
      title: 'Event 1',
      color: {primary: '#0FF', secondary: '#F0F'},
      start: new Date(),
      draggable: true,
      actions: this.actions,
    },
  ];

  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  refresh = new Subject<void>();

  eventDropped({
                 event,
                 newStart,
                 newEnd,
                 allDay
               }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.externalEvents.indexOf(event);

    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];
  }

  externalDrop(event: CalendarEvent) {
    if (this.externalEvents.indexOf(event) === -1) {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.externalEvents.push(event);
    }
  }

  addEvent(date: Date) {
    this.events.push({
      start: date,
      title: 'New event',
      color: {primary: '#0FF', secondary: '#000'},
      draggable: true,
      actions: this.actions
    })
    ;
    this.viewDate = date;
    this.activeDayIsOpen = true;
    this.refresh.next();
  }

  setCurrentDay(event) {
    const date = event.day.date;
    if (this.viewDate.getDay() === date.getDay()) {
      this.activeDayIsOpen = !this.activeDayIsOpen;
    } else {
      this.activeDayIsOpen = true;
    }
    this.viewDate = date;
  }

  deleteEvent(event) {
    const index = this.events.indexOf(event);
    this.events.splice(index, 1);
    this.refresh.next();
  }
}
