import { createSlice, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { fetchNews } from "../thunks/newsThunk";
import { INews } from "../../Interfaces/INews";

type INewsState = {
  news: INews[];
  loading: boolean;
  error: string | null;
  searchFilterValue: string;
};

const initialState: INewsState = {
  news: [],
  loading: false,
  error: null,
  searchFilterValue: "",
};
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setFilterValue(state, action) {
      state.searchFilterValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilterValue } = newsSlice.actions;
export default newsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
