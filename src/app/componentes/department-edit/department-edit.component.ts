import { Component, OnInit } from '@angular/core';
// importar o service 
import { RestApiService } from 'src/app/service/rest-api.service';
// importar a classe Router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  tituloComp:string = "Editar departamentos"
  constructor(
    public restApi: RestApiService,
    public roteamento: Router,
    public gps: ActivatedRoute
  ) { }

  atualizarDados: any = {}
  copiaRota = this.gps.snapshot.params['id']

  ngOnInit(): void {
    this.restApi.departmentReadOne(this.copiaRota).subscribe((receba: any) =>{
      this.atualizarDados = receba
    })
  }

  // 6ª parte - recebaaaaaaaaaaaaaaa os dados, Pai! criar um método/função para acessar a tarefa assincrona e reenviar os dados alterados pra base
  atualizacaoDados(){
    // verificar se, realmente, o usuario quer alterar os registros
    if(confirm('Tem certeza que deseja alterar o registro?')){
      // chamar a injeção de dependencia
      this.restApi.departmentUpdate(this.copiaRota, this.atualizarDados).subscribe(() =>{
        this.roteamento.navigate(['/employee-list'])
      })
    }
  }
}
