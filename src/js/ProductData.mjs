import { convertToJson } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor(category) {
    this.category = category;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const res = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(res);
    return data;
  }
}
