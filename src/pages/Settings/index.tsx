import React, { FC } from "react";
import { SettingsForm } from "src/page-components/settings/SettingsForm";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Settings: FC = () => {
  return (
    <PageWrapper>
      <SettingsForm />
    </PageWrapper>
  );
};

export default Settings;
