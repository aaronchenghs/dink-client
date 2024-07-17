// import { Middleware } from "@reduxjs/toolkit";
// import { ThunkOperation } from "../services";
// import {
//   addLoadingMessage,
//   removeLoadingMessage,
//   showUniversalFeedbackComponent,
// } from "./commonSlice";

// // Made this through trail and error
// type MiddlewareActionType = {
//   /** Only present if meta.requestStatus === 'rejected' && meta.aborted === false */
//   error?: {
//     message: string;
//     name: string;
//     stack: string;
//   };
//   /** Only present if the action is from a Thunk */
//   meta?:
//     | {
//         arg: unknown;
//         requestId: string;
//         requestStatus: "pending" | "fulfilled";
//       }
//     | {
//         arg: unknown;
//         requestId: string;
//         requestStatus: "rejected";
//         aborted: boolean;
//         condition: boolean;
//         rejectedWithValue: boolean;
//       };
//   /**
//      * ### Thunks will be in this format:
//      *
// * type ThunkName = string;
//      * type Status = 'rejected' | 'pending' | 'fulfilled';
//      *
//      * // Example: 'getDocuments/pending'
//      * `${ThunkName}/${Status}`;
//      *

//      *
//      * ### Reducers will be in this format:
//      *
// * `${ThunkName}`;
//      *

//      */
//   type: string;
//   payload: unknown;
// };

// export const thunkMiddleware: Middleware =
//   (api) => (next) => (action: MiddlewareActionType) => {
//     // The action is not from a thunk, so we don't care about it
//     if (action.meta === undefined) {
//       return next(action);
//     }

//     const requestStatus = action.meta.requestStatus;
//     const thunkNameParts = action.type.split("/")[0]?.split("-") ?? [];
//     const thunkId = action.type.split("/")[0] ?? "";
//     /**
//      * Thunk name format: 'method-subject-extra/state'
//      * Example:
//      * - 'GET-Documents-By Id/pending'
//      */
//     const thunkOperation = thunkNameParts[0] as ThunkOperation;
//     const thunkSubject = thunkNameParts[1] ?? "";

//     let thunkMethodVerb = "";
//     let thunkSuccessVerb = "";
//     switch (thunkOperation) {
//       case ThunkOperation.GET: {
//         thunkMethodVerb = "Loading";
//         break;
//       }
//       case ThunkOperation.CREATE:
//       case ThunkOperation.UPSERT:
//       case ThunkOperation.UPDATE: {
//         thunkMethodVerb = "Saving";
//         thunkSuccessVerb = "saved";
//         break;
//       }
//       case ThunkOperation.DELETE: {
//         thunkMethodVerb = "Deleting";
//         thunkSuccessVerb = "deleted";
//         break;
//       }
//     }

//     const loadingMessage = `${thunkMethodVerb} ${thunkSubject}`;

//     const whiteListedThunks: string[] = ["Aspect Ratio of Intel Report"];

//     switch (requestStatus) {
//       case "pending": {
//         // Leaving for now
//         // console.log('DEBUG | Pending Action:', action);

//         api.dispatch(
//           addLoadingMessage({
//             id: thunkId,
//             message: loadingMessage,
//           })
//         );
//         break;
//       }
//       case "rejected": {
//         api.dispatch(
//           removeLoadingMessage({
//             id: thunkId,
//             message: loadingMessage,
//           })
//         );

//         // Action was aborted if this is true, so not actually 'rejected'
//         if (action.meta.aborted) {
//           break;
//         }

//         if (whiteListedThunks.includes(thunkSubject)) {
//           break;
//         }

//         // console.error('DEBUG | Rejected Action:', action);

//         api.dispatch(
//           showUniversalFeedbackComponent({
//             message: `Error while ${thunkMethodVerb} ${thunkSubject}`,
//             severity: "error",
//             vertical: "bottom",
//             horizontal: "left",
//           })
//         );

//         break;
//       }
//       case "fulfilled": {
//         // console.log('DEBUG | Fulfilled Action:', action);

//         api.dispatch(
//           removeLoadingMessage({
//             id: thunkId,
//             message: loadingMessage,
//           })
//         );

//         if (thunkOperation !== ThunkOperation.GET) {
//           api.dispatch(
//             showUniversalFeedbackComponent({
//               message: `${thunkSubject} ${thunkSuccessVerb} successfully`,
//               severity: "success",
//               vertical: "bottom",
//               horizontal: "left",
//             })
//           );
//         }

//         break;
//       }
//     }

//     return next(action);
//   };
