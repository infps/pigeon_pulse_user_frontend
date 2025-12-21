import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useListEvents({ params }: { params?: Record<string, any> }) {
  const queryParams = params
    ? Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";

  return useApiRequest({
    endpoint: apiEndpoints.events.all,
    params,
    queryKey: ["events", queryParams],
  });
}

export function useGetEventById(id: string) {
  return useApiRequest({
    endpoint: apiEndpoints.events.byId(id),
    queryKey: ["event", id],
  });
}

export function useGetMoreEvents({
  id,
  params,
}: {
  id: string;
  params?: Record<string, any>;
}) {
  const queryParams = params
    ? Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";

  return useApiRequest({
    endpoint: apiEndpoints.events.more(id),
    params,
    queryKey: ["more-events", id, queryParams],
  });
}

export function useGetEventParticipants(id: string) {
  return useApiRequest({
    endpoint: apiEndpoints.events.participants(id),
    queryKey: ["event-participants", id],
  });
}
