import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesDashboardComponent } from './employees-dashboard.component';

describe('EmployeesDashboardComponent', () => {
  let component: EmployeesDashboardComponent;
  let fixture: ComponentFixture<EmployeesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
