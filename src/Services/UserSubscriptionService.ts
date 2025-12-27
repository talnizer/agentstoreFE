import { EMPTY, Observable, throwError } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";
import IService from "./IService";

import api from "../config/Api";
import { catchError } from "rxjs/operators";
import { User } from "../models/User";
import AuthUser from "../Components/Common/AuthUser";
import { map } from "rxjs/operators";

export default class UserSubscriptionService
  extends ErrorHandling
  implements IService {
  constructor(context: MessageContextProps) {
    super(context);
  }

  get<Profile>(id: string): Observable<Profile[]> {
    return api.get<Profile[]>(`/profile/` + id).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }

  fetchSubscriptions<Profile>(obj?: object): Observable<Profile> {
    return api.get<Profile>(`/mysubscriptions`, undefined, obj).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }

  fetchPlanFeatures<User>(planId: string): Observable<User[] | void> {
    return api.get<User[]>(`plans/` + planId + `/features`).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        throw err;
      })
    );
  }

  subscribe<Ride>(planId: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/subscribe/` + planId, obj)
      .pipe
      ();
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

}
