import { TestBed } from '@angular/core/testing';
import { UserAnnouncementService } from './Providers/user-announcement.service';


describe('UserAnnouncementService', () => {
  let service: UserAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
