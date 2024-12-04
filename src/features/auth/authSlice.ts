import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// State shape for auth
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registrationError: string | null; // Added registrationError field
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationError: null, // Initialize registrationError
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Ensure cookies are sent with requests
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      return data; // Token and user data
    } catch (err) {
      return rejectWithValue("Network error");
    }
  },
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Ensure cookies are sent with requests
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Registration failed");
      }

      const data = await response.json();
      return data; // Token and user data
    } catch (err) {
      return rejectWithValue("Network error");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.registrationError = null; // Clear any registration error
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registrationError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationError = action.payload as string; // Store registration error
      });
  },
});

// Action for logging out
export const { logout } = authSlice.actions;

export default authSlice.reducer;
