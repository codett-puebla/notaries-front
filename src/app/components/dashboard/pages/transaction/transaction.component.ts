import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageHelper} from '../../../../Utils/MessageHelper';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {TransactionModel} from '../../../../models/transaction.model';
import {Subject} from 'rxjs';
import {TransactionService} from '../../../../services/transaction.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {getFilterPredicate} from '../../../../Utils/Utils';
import * as _ from 'lodash';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<TransactionModel>;
  dataCollection: TransactionModel[] = [];
  isLoading = false;
  ngUnsubscribe = new Subject();

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(public transactionService: TransactionService,
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
    this.transactionService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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
    this.router.navigate(['../dashboard/cost-form', 0]);
  }

  edit(row: any) {
    this.router.navigate(['../dashboard/cost-form', row.id]);
  }

  delete(id: number) {
    MessageHelper.deleteMessage(id, () => {
      this.transactionService.delete(id).subscribe(
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
