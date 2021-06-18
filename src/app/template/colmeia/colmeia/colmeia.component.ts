import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Colmeia } from 'src/app/model/colmeia.model';
import { ColmeiaService } from 'src/app/service/colmeia.service';
import { DialogColmeiaFormComponent } from '../dialog-colmeia-form/dialog-colmeia-form.component';
import { DialogColmeiaDeleteComponent } from '../dialog-colmeia-delete/dialog-colmeia-delete.component';
import { DialogColmeiaViewComponent } from '../dialog-colmeia-view/dialog-colmeia-view.component';

@Component({
  selector: 'app-colmeia',
  templateUrl: './colmeia.component.html',
  styleUrls: ['./colmeia.component.css']
})
export class ColmeiaComponent implements OnInit {

  dataSource!: MatTableDataSource<Colmeia>;
  colunas: string[] = ['indice', 'codigo', 'telefone', 'data-cadastro', 'acao'];
  searchText!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private colmeiaService: ColmeiaService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.colmeiaService.findAll().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);

      this.dataSource.sortingDataAccessor = (item: any, property: any) => {
        switch(property) {
          case 'data-cadastro': return new Date(item.dataCadastro.split('/')[2], item.dataCadastro.split('/')[1] - 1, item.dataCadastro.split('/')[0]);
          default: return item[property];
        }
      };

      this.dataSource.filterPredicate = (data: Colmeia, filter: string) => !filter || data.codigo.includes(filter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      this.showSnackBar('Erro! Não foi possível listar as colmeias!', 'bg-danger');
    });
  }

  addColmeia() {
    this.dialog.open(DialogColmeiaFormComponent, {
      data: {
        colmeia: null
      },
      width: '100%'
    })
    .afterClosed().subscribe(result => {
      
      if (result.status != undefined && result.status) {
        this.showSnackBar('Colmeia salva com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível salvar a colmeia! ' + result.message, 'bg-danger');
      }
    });
  }

  deleteColmeia(colmeia: Colmeia) {
    this.dialog.open(DialogColmeiaDeleteComponent, {
      data: {
        colmeia: colmeia
      }
    })
    .afterClosed().subscribe(result => {
      
      if (result.status != undefined && result.status) {
        this.showSnackBar('Colmeia excluida com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível excluir a colmeia! ' + result.message, 'bg-danger');
      }
    });
  }

  filterTable(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  showColmeia(colmeia: Colmeia) {

    this.dialog.open(DialogColmeiaViewComponent, {
      data: {
        colmeia: colmeia
      },
      width: '100%'
    })
  }

  showSnackBar(mensagem: string, cor: string) {
    this.snackBar.open(mensagem, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cor]
    });
  }

  updateColmeia(colmeia: Colmeia) {
    this.dialog.open(DialogColmeiaFormComponent, {
      data: {
        colmeia: colmeia
      },
      width: '100%'
    })
    .afterClosed().subscribe(result => {
      
      if (result.status != undefined && result.status) {
        this.showSnackBar('Colmeia atualizada com sucesso!', 'bg-success');
        this.ngOnInit();
      }
      
      if (result.status != undefined && !result.status) {
        this.showSnackBar('Não foi possível atualizar a colmeia! ' + result.message, 'bg-danger');
      }
    });
  }
}