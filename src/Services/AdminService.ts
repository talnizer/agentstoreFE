import { EMPTY, Observable } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";
import IService from "./IService";

import api from "../config/Api";
import { catchError } from "rxjs/operators";
import { User } from "../models/User";
import { idText } from "typescript";

export default class AdminService extends ErrorHandling {
  constructor(context: MessageContextProps) {
    super(context);
  }

  fetchAllLocations<User>(obj: object): Observable<User[] | void> {
    return api.get<User[]>(`/admin/locations`, undefined, obj).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        // console.log(err);
        // return [];
        throw err;
      })
    );
  }
  approveLocation<Ride>(id: string): Observable<Ride> {
    return api
      .post<any>(`/admin/locations/approve/` + id, {})
      .pipe
      ();
  }
  editLocation<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/admin/locations/` + id, obj)
      .pipe
      ();
  }

  fetchUsers<User>(obj: object): Observable<User[] | void> {
    return api.get<User[]>(`/admin/users`, undefined, obj).pipe(
    );
  }
  editUser<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/admin/users/` + id, obj)
      .pipe
      ();
  }
  getUserProfile<User>(userId: string): Observable<User[] | void> {
    return api.get<User[]>(`/admin/users/profile/` + userId).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        throw err;
      })
    );
  }
  editProfile<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/admin/users/profile/` + id, obj)
      .pipe
      ();
  }

  get<Ride>(id: string): Observable<Ride[]> {
    return api.get<Ride[]>(`/rides/` + id).pipe(
    );
  }
  post<Ride>(obj: Ride): Observable<Ride> {
    return api
      .post<any>(`/rides`, { obj })
      .pipe
      ();
  }
  patch<T>(arg: T): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  delete<T>(id: string): Observable<T[]> {
    throw new Error("Method not implemented.");
  }

  fetchRides<User>(filters: object): Observable<User[] | void> {
    return api.get<User[]>(`/admin/rides`, undefined, filters).pipe(
    );
  }
  fetchARide<User>(id: string): Observable<User[] | void> {
    return api.get<User[]>(`/admin/rides/` + id).pipe(
    );
  }
  editRide<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/admin/rides/` + id, obj)
      .pipe
      ();
  }
  fetchBookingsOfARide<User>(id: string): Observable<User[] | void> {
    return api.get<User[]>(`/admin/bookings/ride/` + id).pipe(
    );
  }

  fetchBookings<User>(): Observable<User[] | void> {
    return api.get<User[]>(`/admin/bookings`).pipe(
    );
  }
  fetchABooking<User>(id: string): Observable<User[] | void> {
    return api.get<User[]>(`/admin/bookings/` + id).pipe(
    );
  }
  editBooking<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/admin/bookings/` + id, obj)
      .pipe
      ();
  }

  ///features apis
  getUserPermissions<User>(userId: string): Observable<User[] | void> {
    return api.get<User[]>(`/users/` + userId + `/features`).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        throw err;
      })
    );
  }
  fetchFeatures<User>(obj: object): Observable<User[] | void> {
    return api.get<User[]>(`/features`, undefined, obj).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        throw err;
      })
    );
  }

  editFeature<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/features/` + id, obj)
      .pipe
      ();
  }

  addFeature<Ride>(obj: object): Observable<Ride> {
    return api
      .post<any>(`/features/`, obj)
      .pipe
      ();
  }

  // Plans APIs

  fetchPlans<User>(obj: object): Observable<User[] | void> {
    return api.get<User[]>(`/plans`, undefined, obj).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        throw err;
      })
    );
  }

  editPlan<Ride>(id: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/plans/` + id, obj)
      .pipe
      ();
  }

  addPlan<Ride>(obj: object): Observable<Ride> {
    return api
      .post<any>(`/plans`, obj)
      .pipe
      ();
  }
  fetchPlanFeatures<User>(planId: object): Observable<User[] | void> {
    return api.get<User[]>(`plans/` + planId + `/features`).pipe(
      catchError((err: any) => {
        this.handleError("Ride error");
        throw err;
      })
    );
  }
  attachFeatureToPlan<Ride>(planId: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/plans/` + planId + '/feature/attach', obj)
      .pipe
      ();
  }

  detachFeatureFromPlan<Ride>(planId: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/plans/` + planId + '/feature/detach', obj)
      .pipe
      ();
  }

  updatePlanFeatures<Ride>(planId: string, obj: object): Observable<Ride> {
    return api
      .post<any>(`/plans/` + planId + '/features/update', obj)
      .pipe
      ();
  }

  // ////////
}
