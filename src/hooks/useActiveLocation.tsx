import { useNavigate, useParams } from "react-router";
import useLocationStore from "src/stores/location-store";
import { PATHNAMES } from "src/constants/routes";

export const useActiveLocation = () => {
  const locations = useLocationStore((state) => state.locations);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const activeId = id || locations[0]?.id;

  const activeLocation = locations.find(
    (location) => location.id === Number(activeId)
  );

  if (!activeLocation) {
    navigate(PATHNAMES.NOT_FOUND);
  }

  return { locations, activeId, activeLocation };
};
