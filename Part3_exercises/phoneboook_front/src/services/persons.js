import axios from "axios";

const api_url = process.env.REACT_APP_API_URL

const baseUrl = `${api_url}/api/persons`;

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const deleteOne = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const updateOne = async (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject);
  const response = await request;
  return response.data;
}

export {
  getAll,
  create,
  deleteOne,
  updateOne
};
