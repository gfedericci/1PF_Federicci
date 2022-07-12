import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Alumno } from 'src/app/alumno';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() alumnos: Alumno[] = [];
  columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Curso", "Activo", "Actions"];
  @Output() alumnoEditar = new EventEmitter<number>();
  @Output() alumnoEliminar = new EventEmitter<number>();
  
  @ViewChild(MatTable)
  table!: MatTable<Alumno>;
  
  constructor() {
  }

  ngOnInit(): void {
 
  }

  eliminar(index: number){
    this.alumnoEliminar.emit(index);
    this.table.renderRows();
  }

  editar(index: number){
    this.alumnoEditar.emit(index);
  }

}
