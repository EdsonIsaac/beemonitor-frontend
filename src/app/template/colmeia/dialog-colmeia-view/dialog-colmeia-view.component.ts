import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicao } from 'src/app/model/medicao.model';
import { ColmeiaService } from 'src/app/service/colmeia.service';

declare var $: any;

@Component({
  selector: 'app-dialog-colmeia-view',
  templateUrl: './dialog-colmeia-view.component.html',
  styleUrls: ['./dialog-colmeia-view.component.css']
})
export class DialogColmeiaViewComponent implements OnInit {

  dataSource!: MatTableDataSource<Medicao>;
  colunas: string[] = ['indice', 'data-hora-cadastro', 'temperatura', 'umidade', 'peso'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private colmeiaService: ColmeiaService) { }

  ngOnInit(): void {
    this.colmeiaService.findById(this.data.colmeia).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.medicoes);

      this.dataSource.sortingDataAccessor = (item: any, property: any) => {
        switch(property) {
          case 'data-hora-cadastro': return new Date(item.dataHoraCadastro);
          default: return item[property];
        }
      };
      this.dataSource.filterPredicate = (data: Medicao, filter: string) => new Date(data.dataHoraCadastro).toLocaleDateString().includes(filter);
      this.dataSource.sort = this.sort;
    });
  }

  filterTable(value: any) {
    this.dataSource.filter = value;
  }
}