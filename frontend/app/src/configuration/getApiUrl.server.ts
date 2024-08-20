const DEV_API_URL = 'http://localhost:8000';
const PROD_API_URL = process.env.TUBEARCHIVIST_HOST;

const getApiUrl = () => (process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL);

export default getApiUrl;
