import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadDrawerComponent } from './thread-drawer.component';

describe('ThreadDrawerComponent', () => {
  let component: ThreadDrawerComponent;
  let fixture: ComponentFixture<ThreadDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
