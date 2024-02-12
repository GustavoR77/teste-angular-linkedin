import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

describe('myService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    })
  );

  it('should have getData function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUsers).toBeTruthy();
  });

  it('should have getDataId function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUsersByID).toBeTruthy();
  });

  it('should have postData function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.postUsers).toBeTruthy();
  });

  it('should have putData function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.putUsers).toBeTruthy();
  });
});
