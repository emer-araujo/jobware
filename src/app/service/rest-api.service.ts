import { Injectable } from '@angular/core';
// importar o model
import { Employee } from '../model/employee';
import { Department } from '../model/department';
// importar os recursos para lidar com as requisições http
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importar os recursos para construir as tarefas assincronas descritas no service
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()

export class RestApiService {
  /* 1ª parte - definir o "caminho" necessário para qeu a base de dados possa ser 
  acessada
  */
  apiURL: string = 'http://localhost:8080/api/v1'
  
 /* 2ª parte - praticar a referencia de instancia da classe HttpClient para que 
 o objeto referencial gerado possa auxiliar nas requisições http que serão realizadas
 para acesso a base de dados. Realizando a injecção de dependencia da classe HttpClient
 injetada no service.
 */
  constructor(private reqHttp: HttpClient) { }

  /* 3ª parte - configurar as credenciais de acesso para que o cross-domain possa
  funcionar adequadamente 
  */
 autorizacaoAcesso = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
 }

/*
========================================================================================
        CONSTRUIR A API - SEUS RESPECTIVOS MÉTODOS E TAREFAS ASSINCRONAS
========================================================================================
*/

/* trabalhar com métodos get(), post(), put() e delete() para construção do 
CRUD (Create, Read, Update, Delete)
*/

/* 1ª tarefa assincrona: estabelecer um método/função/requisição HTTP para ler todos os dados armazenados na base
*/
 employeeReadAll(): Observable<Employee>{
  // Qual o retorno do método? R: API get() http://localhost:3000/employees 
  return this.reqHttp.get<Employee>(this.apiURL+'/employees')
  .pipe(
    /*este .pipe() estabelece um canal direto de comunicação enter a aplicação front-end
     e a aplicação back-end. De maneira precisa: estabelece um "duto" direto de comunicação entre o método lerDadosColab() com a base de dados employees. Este método tem origem no NodeJS.
    */
    retry(1),
    catchError(this.tratarErro)
  )
 }

 /* 2ª tarefa assincrona: criar um método/função/requisição HTTP para que seja acessado um unico registro - da base -  desde que seja devidamente identificado
 */
 employeeReadOne(id:any): Observable<Employee>{
  // API get() http://localhost:3000/employees/:1
  return this.reqHttp.get<Employee>(this.apiURL+'/employees/'+id)
  .pipe(
    retry(1),
    catchError(this.tratarErro)
  )
 }

 /* 3ª tarefa assincrona: criar um método/função/requisição HTTP para que a base seja acessada e, dentro da base, seja inserido um novo registro
  */
 employeeInsert(dadosRecebidos: any): Observable<Employee>{
  return this.reqHttp.post<Employee>(this.apiURL+'/employees', JSON.stringify(dadosRecebidos), this.autorizacaoAcesso)
  .pipe(
    retry(1),
    catchError(this.tratarErro)
  )
 }

 /* 4ª tarefa assincrona: criar um método/função/requisição para atualização/alteração de um registro armazenado na base e, posteriormente, rearmazena-los
 */
 employeeUpdate(id:any, novosDados:any): Observable<Employee>{
  return this.reqHttp.put<Employee>(this.apiURL+'/employees/'+id, JSON.stringify(novosDados), this.autorizacaoAcesso)
  .pipe(
    retry(1),
    catchError(this.tratarErro)
  )
 }

 /* 5ª tarefa assincrona - criar um método/função/requisição para exclusão de um registro. Para excluir um registro é necessário que o registro esteja armazenado e devidamente identificado.
 */
 employeeDelete(id: any){
  return this.reqHttp.delete<Employee>(this.apiURL+'/employees/'+id, this.autorizacaoAcesso)
  .pipe(
    retry(1),
    catchError(this.tratarErro)
  )
 }

 departmentReadAll(): Observable<Department>{
  // Qual o retorno do método? R: API get() http://localhost:3000/employees 
  return this.reqHttp.get<Department>(this.apiURL+'/departments')
  .pipe(
    /*este .pipe() estabelece um canal direto de comunicação enter a aplicação front-end
     e a aplicação back-end. De maneira precisa: estabelece um "duto" direto de comunicação entre o método lerDadosColab() com a base de dados employees. Este método tem origem no NodeJS.
    */
    retry(1),
    catchError(this.tratarErro)
  )
 }

  /* 2ª tarefa assincrona: criar um método/função/requisição HTTP para que seja acessado um unico registro - da base -  desde que seja devidamente identificado
 */
  departmentReadOne(id:any): Observable<Department>{
    return this.reqHttp.get<Employee>(this.apiURL+'/departments/'+id)
    .pipe(
      retry(1),
      catchError(this.tratarErro)
    )
  }

  /* 3ª tarefa assincrona: criar um método/função/requisição HTTP para que a base seja acessada e, dentro da base, seja inserido um novo registro
  */
  departmentInsert(dadosRecebidos: any): Observable<Department>{
    return this.reqHttp.post<Department>(this.apiURL+'/departments', JSON.stringify(dadosRecebidos), this.autorizacaoAcesso)
    .pipe(
      retry(1),
      catchError(this.tratarErro)
    )
  }

    /* 4ª tarefa assincrona: criar um método/função/requisição para atualização/alteração de um registro armazenado na base e, posteriormente, rearmazena-los
  */
  departmentUpdate(id:any, novosDados:any): Observable<Department>{
    return this.reqHttp.put<Department>(this.apiURL+'/departments/'+id, JSON.stringify(novosDados), this.autorizacaoAcesso)
    .pipe(
      retry(1),
      catchError(this.tratarErro)
    )
  }

  /* 5ª tarefa assincrona - criar um método/função/requisição para exclusão de um registro. Para excluir um registro é necessário que o registro esteja armazenado e devidamente identificado.
  */
  departmentDelete(id: any){
    return this.reqHttp.delete<Department>(this.apiURL+'/departments/'+id, this.autorizacaoAcesso)
    .pipe(
      retry(1),
      catchError(this.tratarErro)
    )
  }

 /* 4ª parte - definir uma função de tratamento de erros que auxiliará na investigação
 de onde os erros estão ocorrendo
 */
 tratarErro(erro:any){
  /*definir uma propriedade para receber o valor - informação - a respeito de onde e qual é a ocorrencia de erro
  */
 let mensagemErro: any = '' 
 
  // criar uma estrutura de verificação para saber em qual "pedaço" da aplicação o erro está ocorrendo
  if(erro.error instanceof ErrorEvent){
    // tratar o erro - se ele ocorreu no front 
    mensagemErro = erro.error.message
  }else{
    // tratar o erro - se ele ocorrer no back-end simulado
    mensagemErro = `Codigo do erro: ${erro.status}\nMensagem do erro é: ${erro.message}`
  }
  // exibir o erro numa janela de alerta
  alert(mensagemErro)
  return throwError(() => mensagemErro)
 }

}
