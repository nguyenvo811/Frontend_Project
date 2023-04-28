import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import {storage} from "./firebase";
  class Res {
    constructor(result, data, uiMessage, devMessage){
        this.result = result;
        this.data = data;
        this.uiMessage = uiMessage;
        this.devMessage = devMessage;
    }
  }
  
  export const uploadImage = async (file) => {
    const c1 = checkFile(file);
    if (c1.result == "success") {
      try {
        // Create a reference to the location where you want to store the image in Firestore.
        const fileName = generateFileName();
        const imageRef = ref(storage, "images/" + fileName);
        const snapshot = await uploadBytesResumable(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        return new Res(
          "success",
          downloadURL,
          "Great! Your image has been success fully uploaded and is ready to be viewed.",
          "200"
        );
      } catch (e) {
        return new Res(
          "fail",
          null,
          "Oops, something went wrong while uploading your image. Please try again later or contact support if the issue persists.",
          "Error: " + e
        );
      }
    } else {
      return new Res("fail", null, c1.uiMessage, c1.devMessage);
    }
  };
  
  const generateFileName = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const timestamp = Date.now();
    const fileName = `${timestamp}.${randomString}`;
    return fileName;
  };
  
  const checkFile = (file) => {
    return new Res("success", file, "Your file is valid.", "200");
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    const maxSize = 5 * 1024 * 1024 + 100; // 5MB
    const isTypeAllowed = allowedTypes.includes(file.type);
    const isSizeAllowed = file.size <= maxSize;
  
    if (!isTypeAllowed) {
      return new Res(
        "fail",
        null,
        "Invalid file type. Please upload an image in JPEG, PNG, or GIF format.",
        "Invalid Format"
      );
    }
  
    if (!isSizeAllowed) {
      return new Res(
        "fail",
        null,
        "File size exceeds the limit of 5MB. Please upload a smaller image.",
        "Invalid file size"
      );
    }
  
    return new Res("success", file, "Your file is valid.", "200");
  };
  