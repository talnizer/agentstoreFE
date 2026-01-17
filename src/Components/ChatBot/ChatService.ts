import { catchError, EMPTY, Observable, throwError } from "rxjs";
import ErrorHandling from "../../Services/ErrorHandling";
import { MessageContextProps } from "../../contexts/MessageContext";
import api from "../../config/Api";

export default class ChatService
  extends ErrorHandling {
  constructor(context: MessageContextProps) {
    super(context);
  }

  sendChatRequest(userInput: any): Observable<Response> {
    // Assuming your backend expects 'message' as a query param for GET
    // or you can switch this to a POST version if needed
    return api.postStream(`/chat/stream`, userInput).pipe(
      catchError((err: any) => {
        this.handleError("Stream connection error");
        throw err;
      })
    );
  }

}
