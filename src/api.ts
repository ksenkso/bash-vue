import { Order } from './types';
import { FunctionKeys } from 'utility-types';

const url = (path: string) => `${import.meta.env.VITE_API_URL}${path}`

export type Vote = 'up' | 'down';
type Methods = FunctionKeys<Api>;
class Api {
  private static json(res: Response) {
    return res.json();
  }

  private requests = new Map<Methods, AbortController>()

  vote(id: number, vote: Vote) {
    return fetch(url(`/quotes/vote/${id}/${vote}`), {
      method: 'PATCH',
    })
      .then(Api.json)
  }

  search(query: string) {
    const params = new URLSearchParams({ query })
    params.toString()

    return fetch(url(`/quotes/search?${params.toString()}`))
      .then(Api.json);
  }

  list(query: { page: number; order: Order | undefined }) {
    this.abort('list');
    const params = new URLSearchParams();

    if (query.order) {
      params.set('order', query.order.field);
      params.set('dir', query.order.dir);
    }

    const controller = new AbortController();
    const request = fetch(url(`/quotes/page/${query.page}?${params.toString()}`), {
      signal: controller.signal,
    });
    this.requests.set('list', controller);

    return request;
  }

  private abort(key: Methods) {
    const controller = this.requests.get(key);
    if (controller) {
      if (!controller.signal.aborted) {
        controller.abort();
      }
      this.requests.delete(key);
    }
  }
}

export const api = new Api();
