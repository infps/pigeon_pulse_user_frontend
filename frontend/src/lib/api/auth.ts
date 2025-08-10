import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useLogin() {
  return useApiRequest({
    endpoint: apiEndpoints.auth.login,
    method: "POST",
    invalidateKeys: [{ queryKey: ["currentUser"] }],
  });
}

export function useSignup() {
  return useApiRequest({
    endpoint: apiEndpoints.auth.signup,
    method: "POST",
    invalidateKeys: [{ queryKey: ["currentUser"] }],
  });
}
export function useLogout() {
  return useApiRequest({
    endpoint: apiEndpoints.auth.logout,
    method: "POST",
    invalidateKeys: [{ queryKey: ["currentUser"] }],
  });
}

export function useCurrentUser() {
  return useApiRequest({
    endpoint: apiEndpoints.auth.session,
    method: "GET",
    queryKey: ["currentUser"],
  });
}
