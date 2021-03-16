import { axiosInstance } from '@config';

export const getCategory = async (category, pageSize) => {
  try {
    const res = await axiosInstance.get(
      `/everything?q=${category}&page=${pageSize}`
    );
    return res;
  } catch (err) {
    throw new Error('An error has occurred');
  }
};

export const getTopHeadlines = async () => {
  try {
    const res = await axiosInstance.get(`/top-headlines?country=id`);
    return res;
  } catch (err) {
    throw new Error('An error has occurred');
  }
};
