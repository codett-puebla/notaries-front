import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  linkCURP = 'https://consultas.curp.gob.mx/CurpSP/gobmx/inicio.jsp';
  linkRFC = 'https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/';
  linkNewRFC = 'https://www.sat.gob.mx/tramites/33629/realiza-tu-inscripcion-en-el-rfc-persona-fisica';
  linkISABI = 'https://portalsfa.sfapuebla.gob.mx/srl/Impuestos/Notarios/Requisitos.jsp';

  @Input() toggle;
  constructor() { }

  ngOnInit() {
  }
}
