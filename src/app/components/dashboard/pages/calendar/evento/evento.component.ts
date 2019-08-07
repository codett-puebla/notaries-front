import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEvent) {
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
