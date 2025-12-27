import { Observable } from "rxjs";
import { MessageContextProps } from "../contexts/MessageContext";
import ErrorHandling from "./ErrorHandling";
import IService from "./IService";

import api from "../config/Api";
import { catchError } from "rxjs/operators";

export default class AuthService extends ErrorHandling implements IService {
  constructor(context: MessageContextProps) {
    super(context);
  }

  login<User>(email: string, password: string): Observable<User[] | void> {
    return api.post<User[]>(`/auth/token`, { payload: { email, password } }).pipe(
      catchError((err: any) => {
        this.handleError("Login error");
        throw err;
      })
    );
  }
  logout(): Observable<void> {
    return api.post<void>(`/auth/logout`, {}).pipe(
      catchError((err: any) => {
        this.handleError("Logout error");
        throw err;
      })
    );
  }

  verifyEmail<User>(email: string, otp: number): Observable<User[] | void> {
    return api.post<User[]>(`/otp/email/verify`, { email, otp }).pipe(
      catchError((err: any) => {
        this.handleError(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
        throw err;
        // return [];
      })
    );
  }
  resendOtp<User>(email: string): Observable<User[] | void> {
    return api.post<User[]>(`/otp/generate/email`, { email }).pipe(
      catchError((err: any) => {
        this.handleError(err?.response?.message);
        throw err;
      })
    );
  }
  sendForgotPasswordOtpEmail<User>(user?: object, email?: string): Observable<User[] | void> {
    var path = `/otp/forgot-password/email`;
    if (user) {
      path = `/otp/forgot-password/email`;
    }
    return api.post<User[]>(path, { email }).pipe(
      catchError((err: any) => {
        this.handleError(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
        throw err;
      })
    );
  }
  resetForgotPasswordThroughEmail<User>(
    input: object, user?: object
  ): Observable<User[] | void> {
    var path = `/otp/forgot/password/reset`;
    if (user) {
      path = `/otp/forgot/password/reset/user`;
    }
    return api.post<User[]>(path, input).pipe(
      catchError((err: any) => {
        this.handleError(err?.response?.data?.message);
        console.log(err);
        throw err;
      })
    );
  }
  get<T>(id: string): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  patch<T>(arg: T): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  post<T>(arg: T): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  delete<T>(id: string): Observable<T[]> {
    throw new Error("Method not implemented.");
  }

  register<User>(input: object): Observable<User[] | void> {
    return api.post<User[]>(`/auth/register`, input).pipe(
      catchError((err: any) => {
        this.handleError("Register error");
        // console.log(err);
        // return [];
        throw err;
      })
    );
  }

  sendPhoneOtp<User>(phone: string, captcha: string): Observable<User[] | void> {
    let payload = {
      phone: phone,
      captcha: captcha
    };
    return api.post<User[]>(`/phone/otp/resend`, payload).pipe(
      catchError((err: any) => {
        this.handleError(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
        throw err;
      })
    );
  }

  verifyPhone<User>(email: string, otp: number, capthca: object): Observable<User[] | void> {
    return api.post<User[]>(`/email/verify`, { email, otp }).pipe(
      catchError((err: any) => {
        this.handleError(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
        throw err;
        // return [];
      })
    );
  }
}
