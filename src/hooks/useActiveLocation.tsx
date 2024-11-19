import { useNavigate, useParams } from "react-router";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";

export const useActiveLocation = () => {
  const locations = useUserStore((state) => state.locations);
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const activeSlug = slug || locations[0]?.slug;

  const activeLocation = locations.find(
    (location) => location.slug === activeSlug
  );

  //temp
  if (!activeLocation) {
    navigate(PATHNAMES.NOT_FOUND);
  }

  return { locations, activeSlug, activeLocation };
};
