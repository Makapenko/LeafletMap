export type OsrmRouteResponse = {
  code: string;
  routes: {
    distance: number;
    duration: number;
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
    legs: {
      distance: number;
      duration: number;
      steps: {
        distance: number;
        duration: number;
        geometry: {
          coordinates: [number, number][];
          type: string;
        };
      }[];
    }[];
    weight: number;
    weight_name: string;
    waypoints: {
      distance: number;
      name: string;
      location: [number, number];
    }[];
  }[];
};
