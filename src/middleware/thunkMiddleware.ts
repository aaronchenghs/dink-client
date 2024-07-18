/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware } from "@reduxjs/toolkit";
import { ThunkOperation } from "../services";
import {
  addLoadingMessage,
  removeLoadingMessage,
  showUniversalFeedbackComponent,
} from "../slices/commonSlice";

// Define the MiddlewareActionType
type MiddlewareActionType = {
  error?: {
    message: string;
    name: string;
    stack: string;
  };
  meta?: {
    arg: unknown;
    requestId: string;
    requestStatus: "pending" | "fulfilled" | "rejected";
    aborted?: boolean;
    condition?: boolean;
    rejectedWithValue?: boolean;
  };
  type: string;
  payload: unknown;
};

// Type guard to check if the action is of type MiddlewareActionType
function isMiddlewareActionType(action: any): action is MiddlewareActionType {
  return typeof action.type === "string" && action.meta !== undefined;
}

export const thunkMiddleware: Middleware =
  (api) => (next) => (action: unknown) => {
    // Use type guard to check if action is MiddlewareActionType
    if (!isMiddlewareActionType(action) || !action.meta) {
      return next(action);
    }

    const requestStatus = action.meta.requestStatus;
    const thunkNameParts = action.type.split("/")[0]?.split("-") ?? [];
    const thunkId = action.type.split("/")[0] ?? "";
    const thunkOperation = thunkNameParts[0] as ThunkOperation;
    const thunkSubject = thunkNameParts[1] ?? "";

    let thunkMethodVerb = "";
    let thunkSuccessVerb = "";
    switch (thunkOperation) {
      case ThunkOperation.GET: {
        thunkMethodVerb = "Loading";
        break;
      }
      case ThunkOperation.CREATE:
      case ThunkOperation.UPSERT:
      case ThunkOperation.UPDATE: {
        thunkMethodVerb = "Saving";
        thunkSuccessVerb = "saved";
        break;
      }
      case ThunkOperation.DELETE: {
        thunkMethodVerb = "Deleting";
        thunkSuccessVerb = "deleted";
        break;
      }
    }

    const loadingMessage = `${thunkMethodVerb} ${thunkSubject}`;
    const whiteListedThunks: string[] = ["Aspect Ratio of Intel Report"];

    switch (requestStatus) {
      case "pending": {
        api.dispatch(
          addLoadingMessage({
            id: thunkId,
            message: loadingMessage,
          })
        );
        break;
      }
      case "rejected": {
        api.dispatch(
          removeLoadingMessage({
            id: thunkId,
            message: loadingMessage,
          })
        );

        if (action.meta.aborted) {
          break;
        }

        if (!whiteListedThunks.includes(thunkSubject)) {
          api.dispatch(
            showUniversalFeedbackComponent({
              message: `Error while ${thunkMethodVerb} ${thunkSubject}`,
              severity: "error",
              vertical: "bottom",
              horizontal: "left",
            })
          );
        }

        break;
      }
      case "fulfilled": {
        api.dispatch(
          removeLoadingMessage({
            id: thunkId,
            message: loadingMessage,
          })
        );

        if (thunkOperation !== ThunkOperation.GET) {
          api.dispatch(
            showUniversalFeedbackComponent({
              message: `${thunkSubject} ${thunkSuccessVerb} successfully`,
              severity: "success",
              vertical: "bottom",
              horizontal: "left",
            })
          );
        }

        break;
      }
    }

    return next(action);
  };
