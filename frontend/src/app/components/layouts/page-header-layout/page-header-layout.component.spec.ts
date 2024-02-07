import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageHeaderLayoutComponent} from './page-header-layout.component';

describe('PaheHeaderLayoutComponent', () => {
  let component: PageHeaderLayoutComponent;
  let fixture: ComponentFixture<PageHeaderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
