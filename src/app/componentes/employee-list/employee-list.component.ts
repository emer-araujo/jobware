import { Component, OnInit } from '@angular/core';
// importar o service
import { RestApiService } from '../../service/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // propriedade que dará titulo ao componente
  tituloComp: string = 'Lista de Funcionários - Employees List'

  /* 1ª parte - criar propriedade para ser a coleção iteravel de dados 
  com a qual o componente vai lidar
  */
  listaColaboradores: any = []
  listaDepartamentos: any = []
  /* 2ª parte - praticar a referencia de instancia e utilizar a injeção de dependencia  gerada a partir do service
  */
  constructor(
    public restApi: RestApiService
  ) { }

  /* 3ª parte - "priorizar" o carregamento de algum conteudo na view componente
  */
  ngOnInit(): void {
    // fazer a chamada da função exibirRegistros
    this.exibirRegistros()
    this.pegarDepartamentos()
  }

  /* 4ª parte - criar um método/função para acessar a tarefa assincrona - descrita no service - que recupera todos os dados da base e dispõe ao componente
  */
  exibirRegistros(){
    // chamar a injeção de dependencia para trazer os dados para o componente
    this.restApi.employeeReadAll().subscribe((dados:{}) => {
      // acessar a propridades listaColaboradores = [] e atribuir à ela o conjunto de dados recebidos pela arrow function
      this.listaColaboradores = dados
    })
  }

  pegarDepartamentos(){
    this.restApi.departmentReadAll().subscribe((receba:any)=>{
      this.listaDepartamentos = receba;
    })
  }

  filtrarDepartamento(id:any){
    if(isNaN(id)){
      return id;
    }
    const filtragem = this.listaDepartamentos.filter((depart:any)=>{
      return depart.id == id})
    return filtragem[0]&&filtragem[0].name;
  }

  /* 5ª parte - criar um método/função para acessar a tarefa assincrona - descrita no service - que exclui um registro da base - desde que seja devidamente identificado
  */
 excluirColaborador(id:any){
  // verificar se o usuario deseja, realmente, excluir o registro selecionado
  if(confirm('Tem certeza que deseja excluir este registro?')){
    // chamar a injeção de dependencia para acessar a tarefa assincrona de exclusão
    this.restApi.employeeDelete(id).subscribe(() => {
      this.exibirRegistros()
    })
  }
 }

}
