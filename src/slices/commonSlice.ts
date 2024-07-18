import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UniversalFeedbackComponentInput,
  UniversalFeedbackComponentState,
} from "./FeedbackState";

interface CommonState {
  settingsOpen: boolean;
  apiBuildVersion: string;
  menuOpen: boolean;
  taskBarOpen: boolean;
  accountOpen: boolean;
  helpOpen: boolean; // this is the help sidebar menu
  helpModalOpen: boolean; // this is the actual help modal
  // controls whether the snackbar feedback popup is open
  universalFeedbackComponentState: UniversalFeedbackComponentState;
  stagingDocumentsCount: number;
  loadingMessages: {
    message: string;
    id: string;
  }[];
  returnToLibraryManager: boolean;
}

const INITIAL_STATE: CommonState = {
  menuOpen: false,
  taskBarOpen: false,
  accountOpen: false,
  helpOpen: false,
  helpModalOpen: false,
  settingsOpen: false,
  apiBuildVersion: "",
  stagingDocumentsCount: 0,
  universalFeedbackComponentState: {
    isVisible: false,
    horizontal: "center",
    vertical: "top",
    message: "",
    severity: "success",
  },
  loadingMessages: [],
  returnToLibraryManager: false,
};

const slice = createSlice({
  name: "commonSlice",
  initialState: INITIAL_STATE,
  reducers: {
    changeSettingsOpen(state) {
      state.settingsOpen = !state.settingsOpen;
    },
    changeAccountOpen(state) {
      state.accountOpen = !state.accountOpen;
    },
    changeHelpOpen(state) {
      state.helpOpen = !state.helpOpen;
    },
    changeHelpModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.helpModalOpen = payload;
    },
    changeMenuOpen(state) {
      state.menuOpen = !state.menuOpen;
    },
    changeTaskbarOpen(state) {
      state.taskBarOpen = !state.taskBarOpen;
    },

    showUniversalFeedbackComponent(
      state,
      { payload }: PayloadAction<UniversalFeedbackComponentInput>
    ) {
      state.universalFeedbackComponentState = {
        isVisible: true,
        horizontal: payload.horizontal,
        vertical: payload.vertical,
        message: payload.message,
        severity: payload.severity,
        buttons: payload.buttons,
      };
    },
    hideUniversalFeedbackComponent(state) {
      state.universalFeedbackComponentState = {
        ...state.universalFeedbackComponentState,
        isVisible: false,
      };
    },

    addLoadingMessage(
      state,
      { payload }: PayloadAction<CommonState["loadingMessages"][number]>
    ) {
      state.loadingMessages.push(payload);
    },
    removeLoadingMessage(
      state,
      { payload }: PayloadAction<CommonState["loadingMessages"][number]>
    ) {
      state.loadingMessages = state.loadingMessages.filter(
        (message) => message.id !== payload.id
      );
    },
    setReturnToLibraryManager: (state, action: PayloadAction<boolean>) => {
      state.returnToLibraryManager = action.payload;
    },
  },
  extraReducers: () => {
    //Slice-internal functions
  },
});

export const reducer = slice.reducer;

export const {
  changeMenuOpen,
  changeTaskbarOpen,
  changeAccountOpen,
  changeHelpOpen,
  changeHelpModalOpen,
  changeSettingsOpen,
  hideUniversalFeedbackComponent,
  showUniversalFeedbackComponent,
  addLoadingMessage,
  removeLoadingMessage,
  setReturnToLibraryManager,
} = slice.actions;
