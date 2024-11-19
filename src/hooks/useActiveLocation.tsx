import { useParams } from "react-router";
import useUserStore from "src/stores/user-store";

export const useActiveLocation = () => {
  const locations = useUserStore((state) => state.locations);
  const { slug } = useParams<{ slug?: string }>();
  const activeSlug = slug || locations[0]?.slug;
  const activeLocation = locations.find(
    (location) => location.slug === activeSlug
  );

  return { locations, activeSlug, activeLocation };
};
