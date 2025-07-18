import { convertToJson, getData } from "./utils.mjs";

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = import.meta.env.BASE_URL + `json/${this.category}.json`;
  }
  async findProductById(id) {
    const products = await getData(this.path);
    return products.find((item) => item.Id === id);
  }
}
