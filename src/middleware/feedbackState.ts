/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertColor } from "@mui/material";
import { ActionCreatorWithoutPayload, AsyncThunk } from "@reduxjs/toolkit";

/**
 * The state of the UniversalFeedbackComponent contains all fields
 */
export interface UniversalFeedbackComponentState
  extends UniversalFeedbackComponentInput {
  isVisible: boolean;
}

/**
 * This is what the developer will be able to pass to the UniversalFeedbackComponent
 */
export interface UniversalFeedbackComponentInput {
  message: string;
  severity: AlertColor;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  buttons?: FeedbackButton[];
}

interface FeedbackButton {
  label: string;
  reducer: AsyncThunk<any, undefined, any> | ActionCreatorWithoutPayload;
}
