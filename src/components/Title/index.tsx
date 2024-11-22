import React, { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
}

export const Title: FC<Props> = ({title, subtitle}) => (
  <div>
    <h3>{title}</h3>
    <p className="text-green-ligth text-sm mt-1.5">
      {subtitle}
    </p>
  </div>
);
