import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {EventoComponent} from './evento/evento.component';
import {MatDialog} from '@angular/material';

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
        this.openDialog(event, 'Editar');
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
      title: 'Nuevo evento',
      color: {primary: '#0FF', secondary: '#F0F'},
      start: new Date(),
      draggable: true,
      actions: this.actions,
      meta: {
        description: 'Sin descripción',
      }
    },
  ];

  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  refresh = new Subject<void>();

  constructor(public dialog: MatDialog) {
  }


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
      title: 'Nuevo evento',
      color: {primary: '#0FF', secondary: '#000'},
      draggable: true,
      actions: this.actions,
      meta: {
        description: 'Sin descripción',
      }
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

  openDialog(event, type): void {
    const index = this.events.indexOf(event);
    console.log(event);
    event.meta.type = type;
    const dialogRef = this.dialog.open(EventoComponent, {
      width: '300px',
      data: event
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result);
      this.refresh.next();
    });
  }

  addExternalEvent() {
    this.externalEvents.push({
      start: new Date(),
      title: 'Nuevo evento',
      color: {primary: '#0FF', secondary: '#000'},
      draggable: true,
      actions: this.actions,
      meta: {
        description: 'Sin descripción',
      }
    });
    this.refresh.next();
  }

  deleteExternalEvent(index) {
    this.externalEvents.splice(index, 1);
    this.refresh.next();
  }

  editExternalEvent(event) {
    this.openDialog(event, 'Añadir');
    this.refresh.next();
  }
}
