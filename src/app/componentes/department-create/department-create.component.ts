import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  tituloComp:string = "Criar Departamento"

  @Input() dadosDepartamento = {
    name: '',
  }
  constructor(
    public restApi: RestApiService,
    public roteamento: Router
  ) {}

  ngOnInit(): void {}
  inserirDepartamento(){
      // chamar a injeção de dependencia para enviar os dados e, posteriormente, ser roteado para outro componente
      this.restApi.departmentInsert(this.dadosDepartamento).subscribe(() => {
        // essa arrow function faz acesso ao objeto referencial roteamento para, assim que a tarefa de inserção for concluida o usuario seja redirecionado para outro componente
        this.roteamento.navigate(['/department-list'])
      })
  }
}
