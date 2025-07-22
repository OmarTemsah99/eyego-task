import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  id: number;
  title: string;
  status: string;
}

interface IssueState {
  issues: Issue[];
}

const initialState: IssueState = {
  issues: [],
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },
  },
});

export const { setIssues } = issueSlice.actions;
export default issueSlice.reducer;
