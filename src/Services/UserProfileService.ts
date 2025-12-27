import { EMPTY, Observable, throwError } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";
import IService from "./IService";

import api from "../config/Api";
import { catchError } from "rxjs/operators";
import { User } from "../models/User";
import AuthUser from "../Components/Common/AuthUser";
import { map } from "rxjs/operators";

export default class UserProfileService
  extends ErrorHandling
  implements IService {
  constructor(context: MessageContextProps) {
    super(context);
  }

  get<Profile>(id: string): Observable<Profile[]> {
    return api.get<Profile[]>(`/user/profile/` + id).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }

  getPhoneForRequest<Profile>(request_id: string): Observable<Profile[]> {
    return api.get<Profile[]>(`/cotravel/request/phone`, undefined, { id: request_id }).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }
  myprofile<Profile>(): Observable<Profile> {
    return api.get<Profile>(`/profile/myprofile`).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }
  getUserProfile<Profile>(id: string): Observable<Profile> {
    return api.get<Profile>(`/user/profile`, undefined, { id: id }).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }

  // post<Ride>(arg: Ride): Observable<Ride[]> {
  post<Profile>(id: string, obj: object | Blob, action?: string): Observable<Profile> {
    let url = `/profile/`;
    if (action === 'N') {
      url += 'brand/';
    } else if (action === 'A') {
      url += 'about/';
    } else if (action === 'S') {
      url += 'services/';
    } else if (action === 'L') {
      url += 'locations/';
    } else if (action === 'C') {
      url += 'contact/';
    } else if (action === 'I') {
      url += 'image/';
      var headers = {
        "Content-Type": "multipart/form-data",
      };
      let response = api
        .post<any>(url + id, obj, headers)
        .pipe
        ();
      return response;
    }
    let response = api
      .post<any>(url + id, obj)
      .pipe
      ();
    return response;
  }
  patch<T>(arg: T): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  // post<T>(arg: T): Observable<T[]> {
  //   throw new Error("Method not implemented.");
  // }
  delete<T>(id: string): Observable<T[]> {
    let response = api.delete<any>(`/rides/status`, id).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        // console.log(err);
        return err;
      })
    );
    // console.log(response);
    return response;
  }

  updateStatus<T>(ride_id: string, status: string): Observable<T[]> {
    let response = api
      .post<any>(`/rides/status`, { ride_id: ride_id, status: status })
      .pipe(
        catchError((err: any) => {
          this.handleError("Ride error");
          // console.log(err);
          return err;
        })
      );
    // console.log(response);
    return response;
  }

  /** Menu API */
  getStoreMenu<T>(id: string): Observable<T> {
    return api.get<T>(`/menu/store/` + id).pipe(
      catchError((err: any) => {
        this.handleError("Menu error");
        console.log(err);
        return [];
      })
    );
  }
  getMyStoreMenu<Profile>(): Observable<Profile> {
    return api.get<Profile>(`/mymenu`).pipe(
      catchError((err: any) => {
        this.handleError("Menu error");
        console.log(err);
        return [];
      })
    );
  }
  addMenu<T>(id: string, obj: object | Blob, action?: string): Observable<T> {
    let url = `/menu/`;
    // if (action === 'I') {
    // url += 'image/';
    var headers = {
      "Content-Type": "multipart/form-data",
    };
    let response = api
      .post<any>(url + id, obj, headers)
      .pipe
      ();
    return response;

  }

  applyToBeStoreEmployee<T>(storeId: string): Observable<T> {
    let url = `/store/employee/apply`;
    let response = api
      .post<any>(url + storeId, {})
      .pipe
      ();
    return response;
  }

}
