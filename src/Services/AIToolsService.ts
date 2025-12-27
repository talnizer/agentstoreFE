import { EMPTY, Observable, throwError } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";
import IService from "./IService";

import api from "../config/Api";
import { catchError } from "rxjs/operators";
import { User } from "../models/User";

export default class AIToolsService
  extends ErrorHandling {
  constructor(context: MessageContextProps) {
    super(context);
  }

  fetchDraftPosts<User>(obj: object): Observable<User[]> {
    return api.get<User[]>(`/posts/drafts`, obj).pipe(
      catchError((err: any) => {
        this.handleError("Store error");
        // console.log(err);
        return [];
        // throw err;
      })
    );
  }

  login<User>(email: string, password: string): Observable<User[] | void> {
    console.log("logging in");
    return api.post<User[]>(`/auth/token`, { email, password }).pipe(
      catchError((err: any) => {
        this.handleError("Login error");
        throw err;
      })
    );
  }

  register(obj: object): Observable<User> {
    console.log(obj);
    let response = api
      .post<any>(`/auth/register`, obj)
      .pipe
      ();
    return response;
  }
  generatePost(obj: object): Observable<User> {
    console.log(obj);
    let response = api
      .post<any>(`/posts/generate`, obj)
      .pipe
      ();
    return response;
  }

  postOnSocialNetwork(draftId: string, provider: string, obj: object): Observable<User> {
    console.log(obj);
    let response = api
      .post<any>(`/social/post/${draftId}/${provider}`, obj)
      .pipe
      ();
    return response;
  }
  patch<T>(arg: T): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  delete<T>(id: string): Observable<T[]> {
    throw new Error("Method not implemented.");
  }

  deleteDraftPost(draftId: string): Observable<User> {
    // console.log(obj);
    let response = api
      .delete<any>(`/posts/drafts`, draftId)
      // .post<any>(`/drafts`, {})
      .pipe
      ();
    return response;
  }

  uploadCSV(obj: object | Blob): Observable<User> {
    console.log(obj);
    var headers = {
      "Content-Type": "multipart/form-data",
    };

    let response = api
      .post<any>(`/v1/upload-sales`, obj, headers)
      .pipe
      ();
    return response;
  }


  fetchInsights<Store>(id: string): Observable<Store[]> {
    return api.get<Store[]>(`/v1/insights/` + id).pipe(
      catchError((err: any) => {
        this.handleError("Store error");
        // console.log(err);
        return [];
        // throw err;
      })
    );
  }


  fetchItems<Store>(id: string, obj: object): Observable<Store[]> {
    return api.get<Store[]>(`/v1/restaurants/` + id, {}, obj).pipe(
      catchError((err: any) => {
        this.handleError("Store error");
        // console.log(err);
        return [];
        // throw err;
      })
    );
  }

  runInsight(obj: object): Observable<User> {
    console.log(obj);
    let response = api
      .post<any>(`/v1/run-insights`, obj)
      .pipe
      ();
    return response;
  }

}
