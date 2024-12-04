export async function getMyBookings() {
  try {
    const res = await fetch("http://127.0.0.1:3000/booking", {
      credentials: "include",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function bookClass(fitnessClassId: number) {
  try {
    const res = await fetch("http://127.0.0.1:3000/booking/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fitnessClassId }),
      credentials: "include",
    });

    if (!res.ok) {
      // Handle HTTP errors
      const errorData = await res.json();
      throw new Error(errorData.message || "An unexpected error occurred.");
    }

    const data = await res.json();
    console.log(data);

    if (data.statusCode === 409) {
      throw new Error(data.message); // Throw application-level errors
    }

    return data;
  } catch (error: any) {
    console.error("Error in bookClass:", error);
    throw error; // Ensure error is rethrown for the calling function to handle
  }
}
export async function deleteBookClass(fitnessClassId: number) {
  try {
    const res = await fetch("http://127.0.0.1:3000/booking/" + fitnessClassId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      // Handle HTTP errors
      const errorData = await res.json();
      throw new Error(errorData.message || "An unexpected error occurred.");
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error: any) {
    console.error("Error in bookClass:", error);
    throw error; // Ensure error is rethrown for the calling function to handle
  }
}
