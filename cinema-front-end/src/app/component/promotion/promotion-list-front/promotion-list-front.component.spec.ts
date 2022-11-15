import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionListFrontComponent } from './promotion-list-front.component';

describe('PromotionListFrontComponent', () => {
  let component: PromotionListFrontComponent;
  let fixture: ComponentFixture<PromotionListFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionListFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
