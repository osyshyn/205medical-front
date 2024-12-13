import { useGoogleLogin } from "@react-oauth/google";
import { NotificationService } from "src/helpers/notifications";

type OnSuccessCallback = (google_id: string) => void;

const useGoogleAuth = (onSuccess: OnSuccessCallback) => {
  return useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = await userInfoResponse.json();
        onSuccess(userInfo.sub);
      } catch (error) {
        NotificationService.error(error);
      }
    },
    onError: (response) => {
      NotificationService.error(response?.error);
    },
  });
};

export default useGoogleAuth;
