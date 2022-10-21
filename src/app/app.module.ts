import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './componentes/employee-create/employee-create.component';
import { EmployeeEditComponent } from './componentes/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './componentes/employee-list/employee-list.component';
import { HomeComponent } from './componentes/home/home.component';
// importar os recursos necessários para que a API funcione corretamente
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// importar o service e registra-lo como provedor de conteudo/funcionalidade para os componentes
import { RestApiService } from './service/rest-api.service';
import { EmployeeDetailsComponent } from './componentes/employee-details/employee-details.component';
import { DepartmentCreateComponent } from './componentes/department-create/department-create.component';
import { DepartmentListComponent } from './componentes/department-list/department-list.component';
import { DepartmentEditComponent } from './componentes/department-edit/department-edit.component';
import { DepartmentEmployeesComponent } from './componentes/department-employees/department-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    HomeComponent,
    EmployeeDetailsComponent,
    DepartmentCreateComponent,
    DepartmentListComponent,
    DepartmentEditComponent,
    DepartmentEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
