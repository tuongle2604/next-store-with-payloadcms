import { stringify } from "qs-esm";

type Params = Record<string, string | number | undefined>;

type ApiResponse<T> = {
  data: T | null;
  error: ErrorResponse | null;
};

type ErrorResponse = {
  message: string;
  data?: any;
  name?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function buildUrl(path: string, params?: Params): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalizedPath}${stringify(params || {})}`;
}

function hanldeError<T>(error: Error): ApiResponse<T> {
  return {
    data: null,
    error: {
      message: error.message || "Unknown error",
      data: null,
      name: error.name || "ApiError",
    },
  };
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const json = (await response.json()) as any;

  if (response.ok) {
    return { data: json as T, error: null };
  }

  if (json?.error) {
    return {
      data: null,
      error: json?.error,
    };
  }

  if (json?.errors && Array.isArray(json.errors) && json.errors.length > 0) {
    return {
      data: null,
      error: json.errors[0],
    };
  }

  return {
    data: null,
    error: {
      message: json?.message || "Unknown error",
      data: json,
      name: json?.name || "ApiError",
    },
  };
}

async function getRequest<T>(
  path: string,
  params: Params = {},
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  const fullUrl = buildUrl(path, params);

  return fetch(fullUrl, {
    method: "GET",
    credentials: "include",
    headers,
  })
    .then((response) => handleResponse<T>(response))
    .catch((err) => hanldeError<T>(err));
}

async function postRequest<T>(
  path: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  const fullUrl = buildUrl(path);

  return fetch(fullUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  })
    .then((response) => handleResponse<T>(response))
    .catch((err) => hanldeError<T>(err));
}

const api = {
  get: getRequest,
  post: postRequest,
};

export default api;
