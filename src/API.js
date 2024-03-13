import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/catalog',
});

export const getBooks = async () => {
  try {
    const response = await instance.get('/rest_books/')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await instance.get(`/rest_book/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const getBooksInstances = async () => {
  try {
    const response = await instance.get('/rest_booksinstances')
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

export const getAuthorById = async (id) => {
  try {
    const response = await instance.get(`/rest_author/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};


