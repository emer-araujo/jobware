import { Component, OnInit } from '@angular/core';
// importar o service 
import { RestApiService } from 'src/app/service/rest-api.service';
// importar a classe Router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  // 1ª parte - definir a propriedade que dará titulo ao componente
  tituloComp: string = 'Alterar Registro'

  // 2ª parte - praticar as referencias de instancia das recursos importados
  constructor(
    public restApi: RestApiService,
    public roteamento: Router,
    public gps: ActivatedRoute
  ) { }

  // 3ª parte - criar uma propriedade para ser uma "cópia(tirar uma foto)" da rota 
  // pela qual o conjunto de dados vai circular
  copiaRota = this.gps.snapshot.params['id']

  // 4ª parte - criar uma propriedade para receber os dados alterar/alterados
  atualizarDados: any = {}
  listaDepartamentos: any = []
  // 5ª parte - "priorizar" o carregamento do registro selecionado para receber as 
  // alterações
  ngOnInit(): void {
    // chamar a injeção de dependencia e acessar a tarefa assincrona que recupera
    // um unico registro da base - desde que esteja devidamente identificado: acessarUmRegistro()
    // aqui, a tarefa assincrona é acessada e o método subscribe() executa a mesma.
    // Eventualmente, além de executar a tarefa assincrona, o método subscribe pode executar uma outra tarefa qualquer - desde que essa tarefa seja devidamente indicada instrução de uma função anônima - o famoso "callback"
    this.exibirRegistrosDepartment()
    this.restApi.employeeReadOne(this.copiaRota).subscribe((receba: any) =>{
      this.atualizarDados = receba
    })
  }

  // 6ª parte - recebaaaaaaaaaaaaaaa os dados, Pai! criar um método/função para acessar a tarefa assincrona e reenviar os dados alterados pra base
  atualizacaoDados(){
    // verificar se, realmente, o usuario quer alterar os registros
    if(confirm('Tem certeza que deseja alterar o registro?')){
      // chamar a injeção de dependencia
      this.restApi.employeeUpdate(this.copiaRota, this.atualizarDados).subscribe(() =>{
        this.roteamento.navigate(['/employee-list'])
      })
    }
  }

  exibirRegistrosDepartment(){
    // chamar a injeção de dependencia para trazer os dados para o componente
    this.restApi.departmentReadAll().subscribe((dados:{}) => {
      // acessar a propridades listaColaboradores = [] e atribuir à ela o conjunto de dados recebidos pela arrow function
      this.listaDepartamentos = dados
      console.log(dados)
    })
  }

}
