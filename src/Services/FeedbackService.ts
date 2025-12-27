import { Observable, throwError } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";

import api from "../config/Api";
import { catchError } from "rxjs/operators";

export default class FeedbackService
  extends ErrorHandling {
  constructor(context: MessageContextProps) {
    super(context);
  }

  //  ****************************//
  submitFeedback<Profile>(storeUserId: string, obj: object): Observable<Profile> {
    let url = `/store/` + storeUserId + `/feedback`;

    let response = api
      .post<any>(url, obj)
      .pipe
      ();
    return response;
  }

  getFeedbacks<Profile>(storeUserId: string, filters: object): Observable<Profile> {
    return api.get<Profile>(`/store/` + storeUserId + `/feedback`,
      undefined, filters
    ).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }
  getAFeedback<Profile>(feedbackId: string): Observable<Profile> {
    return api.get<Profile>(`/store/feedback/` + feedbackId).pipe(
      catchError((err: any) => {
        this.handleError("Profile error");
        console.log(err);
        return [];
      })
    );
  }

}
