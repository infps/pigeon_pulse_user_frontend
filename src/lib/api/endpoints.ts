const raceEndpoints = {
  base: "/race",
  myraces: "/user/races",
};

const loftEndpoints = {
  base: "/user/lofts",
  create: "/user/lofts/create",
  getLoft: (id: string) => `/user/lofts/${id}`,
  updateLoft: (id: string) => `/user/lofts/${id}`,
  createBird: (loftId: string) => `/user/lofts/${loftId}/birds/create`,
  getBird: (birdId: string) => `/user/birds/${birdId}`,
  updateBird: (birdId: string) => `/user/birds/${birdId}`,
};

const paymentsEndpoints = {
  base: "/user/payments",
};

export const apiEndpoints = {
  raceEndpoints,
  loftEndpoints,
  paymentsEndpoints,
};
