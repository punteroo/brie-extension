// Utility to extract query parameters
export const extractQueryParams = url => {
  try {
    const params = new URL(url, window.location.origin).searchParams;
    return Object.fromEntries(params.entries());
  } catch (error) {
    console.error('Error extracting query parameters:', error);
    return {};
  }
};
