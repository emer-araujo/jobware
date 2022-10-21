import { Component, OnInit, Input } from '@angular/core';
//importar o service para fazer no componente
import { RestApiService } from '../../service/rest-api.service';
// importar a classe Router
import { Router } from '@angular/router';



@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  // definir a propriedade que dará titulo ao componente
  tituloComp: string = 'Criar Registro'

  /* 1ª parte - definir um objeto literal que possa atuar como o conjunto de dados
  que será enviado e armazando na base - passando pela tarefa assincrona descrita no service
  */
  @Input() dadosRegistro = {
    name: '',
    email: '',
    phone: '',
    hiring: '',
    department: '',
  }

  listaDepartamentos: any = []

  /* 2ª parte - definir as referencias de instancia - a partir do construtor - e praticar a injeção de dependencia com as classes RestApiService e Router
  */
  constructor(
    public restApi: RestApiService,
    public roteamento: Router
  ) { }

  ngOnInit(): void {
    this.exibirRegistros()
  }

  /* 3ª parte - criar um método/função para enviar o dados capturados - a partir da view - para o service. Neste momento será chamada à execução a tarefa assincrona - descrita no service - que realiza a inserção de dados na base
  */
  inserirDados(){
    // chamar a injeção de dependencia para enviar os dados e, posteriormente, ser roteado para outro componente
    this.restApi.employeeInsert(this.dadosRegistro).subscribe(() => {
      // essa arrow function faz acesso ao objeto referencial roteamento para, assim que a tarefa de inserção for concluida o usuario seja redirecionado para outro componente
      this.roteamento.navigate(['/employee-list'])
    })
  }

  exibirRegistros(){
    // chamar a injeção de dependencia para trazer os dados para o componente
    this.restApi.departmentReadAll().subscribe((dados:{}) => {
      // acessar a propridades listaColaboradores = [] e atribuir à ela o conjunto de dados recebidos pela arrow function
      this.listaDepartamentos = dados
      console.log(dados)
    })
  }

}
