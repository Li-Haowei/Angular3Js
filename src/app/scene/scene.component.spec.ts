import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneComponent } from './scene.component';

describe('CubeComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
