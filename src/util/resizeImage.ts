import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob): Promise<Blob> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "png",
      100,
      0,
      (resizedImage: string | Blob | File | ProgressEvent<FileReader>) => {
        if (resizedImage instanceof Blob) {
          resolve(resizedImage);
        } else {
          console.error("Unexpected result from image resizer");
          resolve(file);
        }
      },
      "blob",
    );
  });
