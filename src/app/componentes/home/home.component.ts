import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../service/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public restApi: RestApiService
  ) { }
  listaColaboradoresCount: number = 0
  listaDepartamentosCount: number = 0

  ngOnInit(): void {
    this.exibirRegistros()
    this.pegarDepartamentos()
  }

  // definir uma propriedade 
  tituloComp: string = 'Bem-vindo ao Jobware'
  exibirRegistros(){
    // chamar a injeção de dependencia para trazer os dados para o componente
    this.restApi.employeeReadAll().subscribe((dados:any) => {
      // acessar a propridades listaColaboradores = [] e atribuir à ela o conjunto de dados recebidos pela arrow function
      this.listaColaboradoresCount = dados.length
    })
  }

  pegarDepartamentos(){
    this.restApi.departmentReadAll().subscribe((receba:any)=>{
      this.listaDepartamentosCount = receba.length;
    })
  }
}
