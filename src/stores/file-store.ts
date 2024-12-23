import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";

interface IFileStore {
  uploadFile: (category: string, file: File) => Promise<void>;
  response: any;
}

const useFileStore = create(
  devtools<IFileStore>((set) => ({
    response: null,
    uploadFile: async (category, file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      try {
        const { data } = await instance.post("upload/uploadFile", formData);
        set({ uploadFile: data });
        set({ response: data.result });
      } catch (error) {
        NotificationService.error();
      }
    },
  }))
);

export default useFileStore;
