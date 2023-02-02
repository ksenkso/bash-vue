import { Order } from './types';

const url = (path: string) => `${import.meta.env.VITE_API_URL}${path}`

export type Vote = 'up' | 'down';

class Api {
  private static json(res: Response) {
    return res.json();
  }

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
    const params = new URLSearchParams();
    if (query.order) {
      params.set('order', query.order.field);
      params.set('dir', query.order.dir);
    }
    return fetch(url(`/quotes/page/${query.page}?${params.toString()}`))

  }
}

export const api = new Api();
