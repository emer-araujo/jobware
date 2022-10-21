import { Component, OnInit } from '@angular/core';
// Importando Service
import { RestApiService } from 'src/app/service/rest-api.service';
// Importando o Router
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  tituloComp: string = "Detalhes do Registro"

  constructor(
    // Praticar a injenção de dependência
    public restApi: RestApiService,
    public gps: ActivatedRoute
  ) { }

  copiaRota = this.gps.snapshot.params['id']
  lerDadosDetalhados: any = {}

  ngOnInit(): void {
    this.restApi.employeeReadOne(this.copiaRota).subscribe((receba:any)=>{
      this.lerDadosDetalhados = receba;
    })
  }
  // Definir um método que ao ser chamado levará o usuário de volta para a tela de lista
  voltaPraLista(){
    // Como a página pode ser acessada de mais de um lugar, usamos o history back pra voltar para a anterior
    window.history.back();
  }
}
