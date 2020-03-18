import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {DocumentModel} from '../../../../models/document.model';
import {Subject} from 'rxjs';
import {DocumentService} from '../../../../services/document.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {MessageHelper} from '../../../../Utils/MessageHelper';
import {getFilterPredicate} from '../../../../Utils/Utils';
import * as _ from 'lodash';

@Component({
  selector: 'app-catalog-document',
  templateUrl: './catalog-document.component.html',
  styleUrls: ['./catalog-document.component.css']
})
export class CatalogDocumentComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<DocumentModel>;
  dataCollection: DocumentModel[] = [];
  isLoading = false;
  ngUnsubscribe = new Subject();

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(public documentService: DocumentService,
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
    this.documentService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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
    this.router.navigate(['../dashboard/document-form', 0]);
  }

  edit(row: any) {
    this.router.navigate(['../dashboard/document-form', row.id]);
  }

  delete(id: number) {
    MessageHelper.deleteMessage(id, () => {
      this.documentService.delete(id).subscribe(
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
