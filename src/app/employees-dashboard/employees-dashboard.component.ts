import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from '../model/model.model';
import { ApiService } from '../shared/api.service';
import { Subscriptionscontainer } from '../shared/helpers';

@Component({
  selector: 'app-employees-dashboard',
  templateUrl: './employees-dashboard.component.html',
  styleUrls: ['./employees-dashboard.component.css']
})
export class EmployeesDashboardComponent implements OnInit, OnDestroy {

  modalRef?: BsModalRef;
  //employee: any = {};
  employees: Employee[] = [];
  isEditMode = false;
  subs = new Subscriptionscontainer();
  //@ts-ignore
  employeeForm: FormGroup;
  

  employeeId: any = 0;

  constructor(private modalService: BsModalService,
    private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cargarData()
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      password: ['', Validators.required],
      mobilNumber: ['', Validators.required],

    })
  }
  ngOnDestroy() {
    this.subs.dispose();
  }
  get ef() {
    return this.employeeForm.controls;
  }

  openModal(template: TemplateRef<any>, isEdit: boolean) {

    this.isEditMode = isEdit;

    this.modalRef = this.modalService.show(template);

  }
  addUpdateEmployee(): void {
    if (this.employeeForm.invalid) {
      return;
    }
    if (/*no es edit mode*/!this.isEditMode) {
      console.log(this.employeeForm.value)
      this.subs.add = this.api.postEmployee(this.employeeForm.value)
        .subscribe(res => {
          console.log(res)
          alert("Employee add succsefully");
          this.employeeForm.reset();
          this.employees.push(res);
          this.modalRef?.hide();
        },
          err => {
            alert("something went wrong");
          })
    } else {
      let trabajador: Employee = {

        firstName: this.ef.firstName.value,
        lastName: this.ef.lastName.value,
        email: this.ef.email.value,
        salary: this.ef.salary.value,
        password: this.ef.password.value,
        mobilNumber: this.ef.mobilNumber.value

      }
      this.subs.add = this.api.updateEmployee(trabajador, this.employeeId)
        .subscribe((res: any) => {
          let index = 0;
          this.employees.forEach((employee: Employee, i: number) => {
            if (employee.id === res.id) {
              index = i;
            }
          })
          this.employees[index] = res;
          this.modalRef?.hide();
        })
    }

  }

  public cargarData() {
    this.api.get('http://localhost:3000/posts/')
      .subscribe((res: any) => {
        this.employees = res;
      })
  }

  deleteEmployee(employee: any) {
    this.api.deleteEmployee(employee.id)
      .subscribe(res => {
        alert("employee deleted");
        this.cargarData()
      })
  }

  editEmployee(employee: Employee, template: TemplateRef<any>) {
    this.employeeId = employee.id;
    this.ef.firstName.setValue(employee.firstName);
    this.ef.lastName.setValue(employee.lastName);
    this.ef.email.setValue(employee.email);
    this.ef.salary.setValue(employee.salary);
    this.ef.password.setValue(employee.password);
    this.ef.mobilNumber.setValue(employee.mobilNumber);

    this.openModal(template, true);

    /*this.api.updateEmployee(edicion, this.employee)
    .subscribe(res=>{
      alert('Data Updated')
    })*/




  }
  addEmployee(template: TemplateRef<any>) {
    this.employeeForm.reset();
    this.openModal(template, false)
  }



}
