const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchData = async () => {
  const response = await fetch(`${BACKEND_URL}/api/data`);
  const data = await response.json();
  return data;
};
