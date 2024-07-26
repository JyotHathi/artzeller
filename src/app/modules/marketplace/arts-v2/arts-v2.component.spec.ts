import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsV2Component } from './arts-v2.component';

describe('ArtsV2Component', () => {
  let component: ArtsV2Component;
  let fixture: ComponentFixture<ArtsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtsV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
