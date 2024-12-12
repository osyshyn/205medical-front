import React, { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
}

export const Title: FC<Props> = ({ title, subtitle }) => (
  <div>
    <h3>{title}</h3>
    <p className="mt-1.5 text-sm text-green-ligth">{subtitle}</p>
  </div>
);
