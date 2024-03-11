import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/catalog',
});

export const getBooks = async () => {
  try {
    const response = await instance.get('/rest_books')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error;
  }
};
             
export const getAuthors = async () => {
    try {
        const response = await instance.get('/rest_authors')
        return response.data
    } catch (error) {
        console.error('Error fetching authors:', error)
        throw error;
    }
}
