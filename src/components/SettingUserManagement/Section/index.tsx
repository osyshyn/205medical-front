import { Window } from "src/components/Window";

export const Section = ({ title, children, buttons }) => (
  <Window>
    <h3 className="text-lg font-medium">{title}</h3>
    {children}
    <div className="mt-4 flex gap-4">{buttons}</div>
  </Window>
);
