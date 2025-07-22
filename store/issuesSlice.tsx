import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Issue = {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
  updatedAt: string;
};

type State = {
  issues: Issue[];
  sortKey: keyof Issue;
  sortOrder: "asc" | "desc";
  filterStatus: "ALL" | "OPEN" | "IN_PROGRESS" | "CLOSED";
  page: number;
  perPage: number;
};

const initialState: State = {
  issues: [],
  sortKey: "id",
  sortOrder: "asc",
  filterStatus: "ALL",
  page: 1,
  perPage: 10,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues(state, action: PayloadAction<Issue[]>) {
      state.issues = action.payload;
    },
    setSort(state, action: PayloadAction<{ key: keyof Issue }>) {
      if (state.sortKey === action.payload.key) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = action.payload.key;
        state.sortOrder = "asc";
      }
    },
    setFilter(state, action: PayloadAction<State["filterStatus"]>) {
      state.filterStatus = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setIssues, setSort, setFilter, setPage } = issuesSlice.actions;
export default issuesSlice.reducer;
