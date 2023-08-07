import IRoute from '../models/IRoute';

const routesApi = {
  async getRoute(route: IRoute) {
    const formattedPoints: string = route.points
    .map(([lat, lng]) => `${lng},${lat}`)
    .join(";");
    
    try {
      const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${formattedPoints}?steps=true&geometries=geojson&overview=full`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  },
};

export default routesApi;
