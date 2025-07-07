const raceEndpoints = {
  base: "/race",
};

const loftEndpoints = {
  base: "/user/lofts",
  create: "/user/lofts/create",
  getLoft: (id: string) => `/user/lofts/${id}`,
  updateLoft: (id: string) => `/user/lofts/${id}`,
};

export const apiEndpoints = {
  raceEndpoints,
  loftEndpoints,
};
