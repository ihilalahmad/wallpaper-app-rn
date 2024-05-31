import axios from 'axios';

// const API_KEY = process.env.PIXABAY_API_KEY;
const API_KEY = '12475412-542b583681878121e09057a03';

const baseUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params: any): string => {
  let url = baseUrl + '&per_page=25&safesearch=true&editors_choice=true';
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log('final url: ', url);
  return url;
};

export const apiCall = async (params: any) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return { success: true, data };
  } catch (error: any) {
    console.log('got error: ', error.message);
    return { success: false, msg: error.message };
  }
};
