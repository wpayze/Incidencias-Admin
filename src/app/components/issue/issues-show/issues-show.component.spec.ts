import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesShowComponent } from './issues-show.component';

describe('IssuesShowComponent', () => {
  let component: IssuesShowComponent;
  let fixture: ComponentFixture<IssuesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
