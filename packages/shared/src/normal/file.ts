import { createDefer } from "../tc39";

async function fileToDataURL(file: File): Promise<string> {
  let fileReader = new FileReader();
  let defer = createDefer<string>();

  fileReader.readAsDataURL(file);
  fileReader.onload = (_) => defer.resolve(fileReader.result as string);
  fileReader.onerror = defer.reject;

  return defer.promise;
}

function dataURLtoFile(dataURL: string, fileName = "temp"): File {
  const [prefix, suffix] = dataURL.split(",") || [];

  if (!prefix || !suffix) {
    throw new Error("invalid dataURL!");
  }

  const mime = (prefix.match(/:(.*?);/) || [])[1];
  const ext = mime.split("/")[1];

  const bstr = window.atob(suffix);

  let n = bstr.length;
  let data = new Uint8Array(n);

  while (n--) {
    data[n] = bstr.charCodeAt(n);
  }

  return new File([data], `${fileName}.${ext}`, {
    type: mime,
  });
}

export { fileToDataURL, dataURLtoFile };
