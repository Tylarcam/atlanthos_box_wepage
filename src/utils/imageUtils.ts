export const getImagePath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `images/${cleanPath}`;
};

export const getImageUrl = (path: string): string => {
  const imagePath = getImagePath(path);
  // Return path without leading slash to prevent protocol-relative URL
  return imagePath;
};

export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 