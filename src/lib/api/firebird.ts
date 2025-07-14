import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function listfirebird({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.fireBirdEndpoints.base,
    queryKey: ["firebird", "list", queryParams],
    params,
  });
}

export function listFirebirdBreeders() {
  return useApiRequest({
    endpoint: apiEndpoints.fireBirdEndpoints.breeders,
    queryKey: ["firebird", "breeders"],
  });
}
export function listFirebirdRaceResults() {
  return useApiRequest({
    endpoint: apiEndpoints.fireBirdEndpoints.raceResult,
    queryKey: ["firebird", "raceResult"],
  });
}

export function listFirebirdEventInventory() {
  return useApiRequest({
    endpoint: apiEndpoints.fireBirdEndpoints.eventInventory,
    queryKey: ["firebird", "eventInventory"],
  });
}

export function listFirebirdEvents() {
  return useApiRequest({
    endpoint: apiEndpoints.fireBirdEndpoints.events,
    queryKey: ["firebird", "events"],
  });
}
