import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../service/rest-api.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  tituloComp: string = 'Lista de Departamentos - Departments List'
  listaDepartamentos: any = [];
  listaDepartamentosFiltrada: any = [];
  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit(): void {
    this.exibirRegistros() 
  }

  filtrarDepartamento(registro:any){
    const filtragem = this.listaDepartamentos.filter((depart:any)=>{
      return depart.id.toString().includes(registro) || depart.name.toString().includes(registro)})
    this.listaDepartamentosFiltrada = filtragem;
  }

  exibirRegistros(){
    this.restApi.departmentReadAll().subscribe((dados:{}) => {
      this.listaDepartamentos = dados
      this.listaDepartamentosFiltrada = dados
      console.log(dados);
    })
  }
  
  excluirDepartamento(id:any){
  if(confirm('Tem certeza que deseja excluir este registro?')){
    this.restApi.departmentDelete(id).subscribe(() => {
      this.exibirRegistros()
    })
  }
 }

}
