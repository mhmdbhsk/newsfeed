import { axiosInstance } from '@config';
import { NewsData } from '../dto/news';

interface ResponseType {
  articles: NewsData[];
  status: string;
  totalResults: number;
}

export const getCategory = async (category, page, pageSize) => {
  try {
    const res = await axiosInstance.get<ResponseType>(
      `/everything?q=${category}&page=${page}&pageSize=${pageSize}`
    );
    return res;
  } catch (err) {
    throw new Error('An error has occurred');
  }
};

export const getTopHeadlines = async () => {
  try {
    const res = await axiosInstance.get<ResponseType>(
      `/top-headlines?country=id`
    );
    return res;
  } catch (err) {
    throw new Error('An error has occurred');
  }
};
