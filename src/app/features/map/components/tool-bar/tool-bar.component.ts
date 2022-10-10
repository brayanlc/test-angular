import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Properties } from '../../state/geolocation';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarComponent implements OnInit {
  formLuminaries: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formLuminaries = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return this.fb.group({
      altura: '',
      cantidad_lamparas: '',
      distancia_eje: '',
      equipo_auxiliar: '',
      estado_lampara: '',
      estado_luminaria: '',
      estado_soporte: '',
      vial: '',
      lado_via: '',
      longitud_brazo: '',
      marca_lampara: '',
      marca_luminaria: '',
      marca_soporte: '',
      modelo_lampara: '',
    });
  }

  setForm(properties: Properties) {
    this.formLuminaries.patchValue(properties);
  }
}
