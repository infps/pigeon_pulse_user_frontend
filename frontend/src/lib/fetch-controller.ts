"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "@/store/store"; // Adjust path as needed

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  bodyType?: "json" | "formdata";
  endpoint?: string;
  exact?: boolean;
  queryKey?: string[];
  method?: RequestMethod;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: (error: {
    name: string;
    message: string;
    cause?: any;
    stack?: string;
  }) => void;
  baseUrl?: string;
  queryString?: string;
  invalidateKeys?: { queryKey: string[]; exact?: boolean }[];
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      // Skip redirect if already on login or signup page
      if (!currentPath.includes("/login") && !currentPath.includes("/signup")) {
        const { clearAuth } = useAuthStore.getState();
        clearAuth();

        window.location.href = `/login`;
      }
    }
    return Promise.reject(error);
  }
);

export default function useApiRequest<T = any>({
  bodyType = "json",
  endpoint,
  exact = true,
  queryKey = [],
  method = "GET",
  params,
  headers,
  enabled = true,
  onSuccess,
  onError,
  baseUrl,
  queryString,
  invalidateKeys,
}: RequestConfig) {
  const queryClient = useQueryClient();

  const makeRequest = async (
    body: any = null
  ): Promise<{
    data?: T;
    error?: string;
    status: number;
  }> => {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: endpoint ?? "",
        baseURL: baseUrl ?? API_URL,
        headers: headers ? { ...headers } : undefined,
        params: params,
      };

      // Add query string if provided
      if (queryString) {
        config.url = `${config.url}?${queryString}`;
      }

      // Handle body based on type and method
      if (body && method !== "GET") {
        if (bodyType === "formdata") {
          config.data = body;
          config.headers = {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          };
        } else {
          config.data = body;
        }
      }

      const response = await apiClient.request(config);

      return {
        data: response.data,
        status: response.status,
      };
    } catch (err: any) {
      const status = err.response?.status || 500;
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Internal error";

      return {
        error: errorMessage,
        status,
      };
    }
  };

  // Handle GET query
  if (enabled && method === "GET") {
    const query = useQuery({
      queryKey,
      queryFn: () => makeRequest(),
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 401 or 403 errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnReconnect: false,
      staleTime: Infinity,
    });

    return {
      data: query.data?.data as T,
      error: query.error,
      isPending: query.isPending,
      isError: query.isError,
      isSuccess: query.isSuccess,
    };
  }

  // Handle mutation
  const {
    data,
    error,
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useMutation({
    mutationFn: async (data?: Record<string, any> | FormData) => {
      const response = await makeRequest(data);

      // Throw error if request failed so onError gets called
      if (response.error) {
        throw new Error(response.error, { cause: response.status });
      }

      return response;
    },
    onSuccess: async (response) => {
      if ([200, 201, 204].includes(response.status)) {
        // Invalidate base key
        if (queryKey.length) {
          queryClient.invalidateQueries({ queryKey, exact });
        }

        // Invalidate extra keys
        if (invalidateKeys?.length) {
          for (const k of invalidateKeys) {
            queryClient.invalidateQueries(k);
          }
        }

        onSuccess?.();
      }
    },
    onError: (err: any) => {
      const errorObj = {
        message: err.message || "An error occurred",
        name: err.name || "Error",
        cause: err.cause,
        stack: err.stack,
      };

      onError?.(errorObj);
    },
  });

  return {
    data: data?.data as T,
    error,
    isPending,
    isError,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
  };
}
