async function getRequest<T>(
  url: string,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(
        `GET request failed: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
}

async function postRequest<T>(
  url: string,
  body: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `POST request failed: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
}

const api = {
  get: getRequest,
  post: postRequest,
};

export default api;
