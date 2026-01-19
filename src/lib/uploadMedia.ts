import { MediaType } from "@/constants/media.enum";
import axios from "axios";

const mediaUploadFn = async (file: File[], fileType: MediaType) => {
  try {
    if (!file || file?.length === 0) return null;
    const formData = new FormData();
    // formData.append('type', fileType)
    formData.append("bucket", fileType);
    file.forEach((f) => {
      formData.append("file", f);
    });

    const url = `${process.env.NEXT_PUBLIC_REST_ENDPOINT}/media/upload`;
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// function getDeletedMediaIds(deleteMedia: (IMedia | string)[] | undefined): string[] {
//     return (
//         deleteMedia
//             ?.filter((item): item is IMedia => typeof item !== 'string' && 'id' in item)
//             .map((item) => item.id)
//             .filter((id): id is string => id !== undefined) || []
//     )
// }
export { mediaUploadFn };
