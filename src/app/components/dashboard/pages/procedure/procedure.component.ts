import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageHelper} from '../../../../Utils/MessageHelper';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {getFilterPredicate} from '../../../../Utils/Utils';
import {takeUntil} from 'rxjs/operators';
import {ProcedureModel} from '../../../../models/procedure.model';
import {Subject} from 'rxjs';
import {ProcedureService} from '../../../../services/procedure.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'type', 'description', 'actions'];
  dataSource: MatTableDataSource<ProcedureModel>;
  dataCollection: ProcedureModel[] = [];
  isLoading = false;
  ngUnsubscribe = new Subject();

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(public procedureService: ProcedureService,
              public change: ChangeDetectorRef, public router: Router) {

  }

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.updateTable();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable() {
    this.isLoading = true;
    this.procedureService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      response => {
        console.log(response);
        this.dataCollection = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.dataCollection);
        this.change.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = getFilterPredicate();
        this.dataSource.sortingDataAccessor = _.get;
      }, error => {
        this.isLoading = false;
        MessageHelper.errorMessage('Ocurrio un problema al cargar datos, intente más tarde');
      }
    );
  }

  add() {
    this.router.navigate(['../dashboard/procedure-form', 0]);
  }

  edit(row: any) {
    this.router.navigate(['../dashboard/procedure-form', row.id]);
  }

  delete(id: number) {
    MessageHelper.deleteMessage(id, () => {
      this.procedureService.delete(id).subscribe(
        response => {
          MessageHelper.successMessage('Eliminado', 'Se ha eliminado el area correctamente');
          this.updateTable();
        },
        error => {
          MessageHelper.errorMessage('Ocurrio un problema al tratar de eliminar el area, intente más tarde');
        }
      );
    });
  }
}
