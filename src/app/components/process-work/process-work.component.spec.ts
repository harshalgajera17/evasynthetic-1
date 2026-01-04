import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWorkComponent } from './process-work.component';

describe('ProcessWorkComponent', () => {
  let component: ProcessWorkComponent;
  let fixture: ComponentFixture<ProcessWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
