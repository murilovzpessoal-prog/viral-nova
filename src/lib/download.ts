export const forceDownloadImage = async (imageUrl: string, filename: string) => {
  try {
    const isBase64 = imageUrl.startsWith('data:image');
    let blob: Blob;

    if (isBase64) {
      const fetchRes = await fetch(imageUrl);
      blob = await fetchRes.blob();
    } else {
      const response = await fetch(imageUrl, { mode: 'cors' });
      blob = await response.blob();
    }

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
