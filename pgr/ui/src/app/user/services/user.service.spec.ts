import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserService} from './user.service';
import {UserBaseService} from "./user-base.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {combineLatest, Subject} from "rxjs";

describe('UserService', () => {
    let getUserProfileEditSubject = new Subject();
    let getUserPublicProfileSubject = new Subject();
    let getUserProfileImageSubject = new Subject();

    let userBaseServiceMock = createSpyObj(
        "userBaseService",
        [
            "getUserProfileEdit",
            "getUserPublicProfile",
            "getUserProfileImage"
        ]
    );

    jest.spyOn(
        userBaseServiceMock,
        "getUserProfileEdit"
    ).mockReturnValue(getUserProfileEditSubject.asObservable());

    jest.spyOn(
        userBaseServiceMock,
        "getUserPublicProfile"
    ).mockReturnValue(getUserPublicProfileSubject.asObservable());

    jest.spyOn(
        userBaseServiceMock,
        "getUserProfileImage"
    ).mockReturnValue(getUserProfileImageSubject.asObservable());

    let service: UserService;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: UserBaseService,
                    useValue: userBaseServiceMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        service = TestBed.get(UserService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('setting profile data', () => {
        let profileEditData,
            publicProfileData,
            profileImageData;

        let profileSubjectData = {
            data: {
                profileEdit: {
                    email: "test@test.com",
                    username: "testusername",
                    name: "tester"
                }
            }
        };

        let publicSubjectData = {
            data: {
                publicProfile: {
                    name: "tester",
                    bio: "stuff"
                }
            }
        };

        let imageSubjectData = {
            data: {
                profileImage: {
                    profileImage: "378aflhjh234"
                }
            }
        };

        beforeEach(fakeAsync(()=>{
            combineLatest([
                service.profileInfo$,
                service.publicProfileInfo$,
                service.profileImage$
            ]).subscribe(data=>{
               profileEditData = data[0];
               publicProfileData = data[1];
               profileImageData = data[2];
            });
            service.setUsername("testusername");
            service.setPublicUsername("testusername");
            service.setImageUsername("testusername");
            getUserProfileEditSubject.next(profileSubjectData);
            getUserPublicProfileSubject.next(publicSubjectData);
            getUserProfileImageSubject.next(imageSubjectData);
            tick();
        }));

        it("should set the editable user data", fakeAsync(() => {
            expect(profileEditData).toBe(profileSubjectData.data.profileEdit);
        }));

        it("should set the public user data", fakeAsync(()=>{
            expect(publicProfileData).toBe(publicSubjectData.data.publicProfile);
        }));

        it("should set the user image data", fakeAsync(()=>{
            expect(profileImageData).toBe(imageSubjectData.data.profileImage.profileImage);
        }));
    });
});
