import apiClient from "./api-client.ts";

interface Entity {
  _id?: string;
}

class HttpService {
  private _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const response = apiClient.get<T[]>(this._endpoint, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  getOne<T>(id: string | undefined) {
    if (id !== "new") {
      const controller = new AbortController();
      const response = apiClient.get<T>(this._endpoint + "/" + id, {
        signal: controller.signal,
      });
      return { response, cancel: () => controller.abort() };
    }
  }

  delete(id: string) {
    return apiClient.delete(this._endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this._endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    const { _id, ...newEntity } = entity;
    return apiClient.put(this._endpoint + "/" + _id, newEntity);
  }

  set endpoint(value: string) {
    this._endpoint = value;
  }
}

function create(endpoint: string) {
  return new HttpService(endpoint);
}

export default create;
