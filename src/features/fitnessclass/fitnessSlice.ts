import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllClasses } from "../../services/fitnessAPI";

interface FitnessClass {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  maxAttendees: number;
  bookings: any[];
  remainingSpots: number; // New field
}

interface FitnessState {
  classes: FitnessClass[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FitnessState = {
  classes: [],
  status: "idle",
  error: null,
};

export const fetchClasses = createAsyncThunk(
  "fitness/fetchClasses",
  async () => {
    const classes = await getAllClasses();
    // Add `remainingSpots` calculation
    return classes.map((fitnessClass) => ({
      ...fitnessClass,
      remainingSpots: fitnessClass.maxAttendees - fitnessClass.bookings.length,
    }));
  },
);

const FitnessSlice = createSlice({
  name: "fitness",
  initialState,
  reducers: {
    updateRemainingSpots(
      state,
      action: PayloadAction<{ id: number; adjustment: number }>,
    ) {
      const fitnessClass = state.classes.find(
        (cls) => cls.id === action.payload.id,
      );
      if (fitnessClass) {
        // Update remaining spots
        fitnessClass.remainingSpots += action.payload.adjustment;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchClasses.fulfilled,
        (state, action: PayloadAction<FitnessClass[]>) => {
          state.status = "succeeded";
          state.classes = action.payload;
        },
      )
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch classes.";
      });
  },
});

export const { updateRemainingSpots } = FitnessSlice.actions;
export default FitnessSlice.reducer;
