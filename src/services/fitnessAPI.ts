export async function getAllClasses() {
  try {
    const response = await fetch("http://127.0.0.1:3000/fitness-class/");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Check if the structure matches your expectations
    if (data.status !== "success" || !Array.isArray(data.data)) {
      throw new Error("Unexpected response format");
    }

    return data.data; // Return the array of fitness classes
  } catch (error) {
    console.error("Error fetching fitness classes:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}
export async function getSingleClass(id: number) {
  try {
    console.log("getSingleClass ID:", id);
    const response = await fetch(`http://127.0.0.1:3000/fitness-class/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("getSingleClass Response:", data);

    return data.data;
  } catch (error) {
    console.error("Error in getSingleClass:", error);
    throw error; // Let the loader handle the error
  }
}
