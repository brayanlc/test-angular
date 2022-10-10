import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Properties } from '../../state/geolocation';
import { GeolocationService } from '../../state/geolocation.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  formLuminaries: FormGroup;
  highcharts = Highcharts;
  updateFlag = true;
  tipoForm = new FormControl('');
  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Browser market shares in March, 2022',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Brands',
        type: 'pie',
        colorByPoint: true,
        data: [],
      },
    ],
  };
  tab: 'info' | 'graph' = 'info';

  constructor(
    private fb: FormBuilder,
    private geolocationService: GeolocationService,
  ) {
    this.formLuminaries = this.initForm();
  }

  hola(type: string) {
    this.geolocationService.getDataPie(type).subscribe(data => {
      (this.chartOptions.series as Highcharts.SeriesOptionsType[])[0] = {
        name: 'Brands',
        type: 'pie',
        colorByPoint: true,
        data,
      };
      this.updateFlag = true;
      setTimeout(() => {
        this.updateFlag = true;
      }, 500);
      console.log(this.chartOptions);
    });
  }

  ngOnInit(): void {
    console.log(this.chartOptions);
    this.tipoForm.valueChanges.subscribe(value => {
      this.hola(value);
    });
  }

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

  setTap(tab: 'info' | 'graph') {
    this.tab = tab;
  }
}
