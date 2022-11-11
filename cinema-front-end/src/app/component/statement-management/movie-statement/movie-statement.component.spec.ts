import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieStatementComponent } from './movie-statement.component';

describe('MovieStatementComponent', () => {
  let component: MovieStatementComponent;
  let fixture: ComponentFixture<MovieStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
