import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicao } from 'src/app/model/medicao.model';
import { ColmeiaService } from 'src/app/service/colmeia.service';

@Component({
  selector: 'app-dialog-colmeia-view',
  templateUrl: './dialog-colmeia-view.component.html',
  styleUrls: ['./dialog-colmeia-view.component.css']
})
export class DialogColmeiaViewComponent implements OnInit {

  dataSource!: MatTableDataSource<Medicao>;
  paginator!: MatPaginator;
  sort!: MatSort;
  colunas: string[] = ['indice', 'data-hora-cadastro', 'temperatura', 'umidade', 'peso'];

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private colmeiaService: ColmeiaService) { }

  ngOnInit(): void {
    this.colmeiaService.findById(this.data.colmeia).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.medicoes);

      this.dataSource.sortingDataAccessor = (item: any, property: any) => {
        let dateTime = item.dataHoraCadastro.replaceAll('/', ' ').replaceAll(':', ' ').split(' ');
        switch(property) {
          case 'data-hora-cadastro': return new Date(dateTime[2], dateTime[1] - 1, dateTime[0], dateTime[3], dateTime[4], dateTime[5]);
          default: return item[property];
        }
      };

      this.dataSource.filterPredicate = (data: Medicao, filter: string) => !filter || data.dataHoraCadastro.includes(filter);
    });
  }

  filterTable(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}