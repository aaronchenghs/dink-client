import {
  Alert,
  Button,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppState, dispatch } from "../../store";
import { hideUniversalFeedbackComponent } from "../../slices/commonSlice";
import "./feedback.styles.scss";

/**
 * Universal Error/Success/Info/Warning feedback component
 */
export const UniversalFeedback = (): React.ReactElement | null => {
  const { horizontal, isVisible, message, severity, vertical, buttons } =
    useSelector(
      (state: AppState) => state.common.universalFeedbackComponentState
    );

  /**
   * @param event Not used
   * @param reason This is nullable for compatibility with the MUI Alert
   */
  const closeFeedbackComponent = (
    _: Event | React.SyntheticEvent<unknown>,
    reason?: SnackbarCloseReason
  ) => {
    dispatch(hideUniversalFeedbackComponent());
  };

  /**
   * Transition component for snackbar notifications
   *
   * https://mui.com/material-ui/react-snackbar/#notistack
   */
  const TransitionComponent: React.ComponentType<SlideProps> = (props) => {
    return <Slide {...props} direction="left" />;
  };

  return !isVisible ? null : (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      autoHideDuration={6000}
      className={"snackbar"}
      onClose={closeFeedbackComponent}
      open={true}
      TransitionComponent={TransitionComponent}
    >
      <Alert
        action={
          <>
            {buttons &&
              buttons.map((button) => (
                <Button
                  color="primary"
                  key={button.label}
                  onClick={(event) => {
                    void dispatch(button.reducer());
                    closeFeedbackComponent(event);
                  }}
                  size="small"
                >
                  {button.label}
                </Button>
              ))}
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={closeFeedbackComponent}
              size="small"
            >
              X
            </IconButton>
          </>
        }
        onClose={closeFeedbackComponent}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
