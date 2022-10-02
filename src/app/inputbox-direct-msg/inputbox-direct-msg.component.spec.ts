import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputboxDirectMsgComponent } from './inputbox-direct-msg.component';

describe('InputboxDirectMsgComponent', () => {
  let component: InputboxDirectMsgComponent;
  let fixture: ComponentFixture<InputboxDirectMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputboxDirectMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputboxDirectMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
