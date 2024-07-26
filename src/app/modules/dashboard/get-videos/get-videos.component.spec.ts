import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVideosComponent } from './get-videos.component';

describe('GetVideosComponent', () => {
  let component: GetVideosComponent;
  let fixture: ComponentFixture<GetVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
