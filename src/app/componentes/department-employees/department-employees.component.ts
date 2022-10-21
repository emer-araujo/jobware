import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../service/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-employees',
  templateUrl: './department-employees.component.html',
  styleUrls: ['./department-employees.component.css']
})
export class DepartmentEmployeesComponent implements OnInit {
  tituloComp:string = "Funcionários no Departamento"
  listaFuncionarios: any = [];
  id = this.gps.snapshot.params['id']

  constructor(
    public restApi: RestApiService,
    public roteamento: Router,
    public gps: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pegarRegistrosFuncionarios()
  }

  filtrarFuncionarios(){
    const filtragem = this.listaFuncionarios.filter((depart:any)=>{
      return depart.department === this.id})
    this.listaFuncionarios = filtragem;
  }

  pegarRegistrosFuncionarios(){
    this.restApi.employeeReadAll().subscribe((dados:{}) => {
      this.listaFuncionarios = dados
      this.filtrarFuncionarios()
    })
  }
}
