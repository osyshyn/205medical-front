import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Window } from "src/components/Window";

const Home: FC = () => (
  <PageWrapper>
    <h1 className="text-lg font-semibold">Dashboard</h1>

    <Window>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quam
        mollitia quod modi aspernatur, dignissimos facere explicabo harum
        minima, corporis, expedita obcaecati vitae dicta. Nam libero assumenda
        facilis dignissimos nihil.
      </p>
    </Window>
  </PageWrapper>
);

export default Home;
