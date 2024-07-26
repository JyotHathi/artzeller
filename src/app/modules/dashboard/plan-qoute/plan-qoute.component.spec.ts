import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanQouteComponent } from './plan-qoute.component';

describe('PlanQouteComponent', () => {
  let component: PlanQouteComponent;
  let fixture: ComponentFixture<PlanQouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanQouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanQouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
