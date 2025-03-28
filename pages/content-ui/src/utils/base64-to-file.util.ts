export const base64ToFile = (base64: string, fileName: string) => {
  const byteString = atob(base64.split(',')[1]); // Decode base64
  const mimeType = base64.match(/data:(.*?);base64/)?.[1]; // Extract MIME type
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new File([arrayBuffer], fileName, { type: mimeType });
};
