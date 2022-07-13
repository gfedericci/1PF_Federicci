import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/alumno';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.scss']
})
export class FormAlumnoComponent implements OnInit {
  today = new Date();
  formAlumno!: FormGroup;

  cursos = ['Angular', 'Data Analitics', 'JS', 'Scrum', 'SQL'];

  @Input() alumnoEditar!: Alumno;
  @Input() alumnos!: Alumno[];

  @Output() alumnoAgregar = new EventEmitter<Alumno>();
  @Output() alumnoActualizar = new EventEmitter<Alumno>();


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.fb = fb;
  }

  ngOnInit(): void {
    var alumno = this.alumnoEditar || <Alumno>{};
    this.formAlumno = this.fb.group({
      index: this.fb.control(alumno.index, []),
      nombre: this.fb.control(alumno.nombre, [Validators.required, Validators.minLength(2)]),
      apellido: this.fb.control(alumno.apellido, [Validators.required, Validators.minLength(2)]),
      fechaNacimiento: this.fb.control(alumno.fechaNacimiento, [Validators.required]),
      curso: this.fb.control(alumno.curso, [Validators.required]),
      email: this.fb.control(alumno.email, [Validators.required, Validators.email]),
      activo: this.fb.control(alumno.activo, [])
    });
  }

  submit() {
    if (this.alumnoEditar) this.editAlumno();
    else this.addAlumno();
  }

  addAlumno() {
    if (this.formAlumno.valid) {
      var nuevoAlumno: Alumno;
      nuevoAlumno = { ...this.formAlumno.value };
      this.alumnoAgregar.emit(nuevoAlumno);
      this._snackBar.open('El alumno ha sido registrado', '✔️');
    }
  }

  editAlumno() {
    if (this.formAlumno.valid) {
      var alumnoActualizado: Alumno;
      alumnoActualizado = { ...this.formAlumno.value };
      this.alumnoActualizar.emit(alumnoActualizado);
      this._snackBar.open('El alumno ha sido actualizado', '✔️');
    }
  }
}