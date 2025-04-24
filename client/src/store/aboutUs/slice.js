import { createSlice } from "@reduxjs/toolkit";
import { getAboutUsThunk } from "./thunk";

const initialState = {
  loading: true,
  error: "",
  message: "",
  qualitySectionData: [],
  video:
    "https://assets.mixkit.co/videos/preview/mixkit-placing-exhibitors-necklaces-in-a-jewelry-34213-large.mp4",
  teamMembers: [],
};

const slice = createSlice({
  name: "AboutUsSlice",
  initialState,
  reducers: {
    setTeamSectionData(state, action) {
      state.teamMembers = action?.payload;
    },
    setQualitySectionData(state, action) {
      state.qualitySectionData = action?.payload;
    },
  },
  extraReducers: (builder) => {
    // getAboutUsThunk
    builder.addCase(getAboutUsThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getAboutUsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(getAboutUsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
  },
});

export const { setTeamSectionData, setQualitySectionData } = slice.actions;
export default slice.reducer;
