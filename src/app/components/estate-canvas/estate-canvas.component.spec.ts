import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateCanvasComponent } from './estate-canvas.component';

describe('EstateCanvasComponent', () => {
  let component: EstateCanvasComponent;
  let fixture: ComponentFixture<EstateCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstateCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
