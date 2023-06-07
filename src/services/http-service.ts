import apiClient from "./api-client.ts";

interface Entity {
  _id?: string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const response = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  getOne<T>(id: string | undefined) {
    if (id !== "new") {
      const controller = new AbortController();
      const response = apiClient.get<T>(this.endpoint + "/" + id, {
        signal: controller.signal,
      });
      return { response, cancel: () => controller.abort() };
    }
  }

  delete(id: string) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    const { _id, ...newEntity } = entity;
    return apiClient.put(this.endpoint + "/" + _id, newEntity);
  }
}

function create(endpoint: string) {
  return new HttpService(endpoint);
}

export default create;
