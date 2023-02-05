import { FunctionKeys } from 'utility-types';

export interface Quote {
  id: number;
  text: string;
  rating: number;
  date: string;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export type QuotesList = {
  list: Quote[];
  pagination: Pagination
}

export type OrderField = 'rating' | 'id' | 'date';
export type OrderDirection = 'ASC' | 'DESC';
export type Order = {
  field: OrderField;
  dir: OrderDirection;
};

export type Vote = 'up' | 'down';

const url = (path: string) => `${import.meta.env.VITE_API_URL}${path}`

type Methods = FunctionKeys<Api>;

class Api {
  private static json<T>(res: Response): Promise<T> {
    const responseData = res.json() as Promise<T>;
    if (res.ok) {
      return responseData;
    }

    throw responseData;
  }

  private requests = new Map<Methods, AbortController>()

  vote(id: number, vote: Vote) {
    return fetch(url(`/quotes/vote/${id}/${vote}`), {
      method: 'PATCH',
    })
      .then(Api.json<Quote>)
  }

  search(query: string) {
    const params = new URLSearchParams({ query })
    params.toString()

    return fetch(url(`/quotes/search?${params.toString()}`))
      .then(Api.json<QuotesList>);
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

    return request.then(Api.json<QuotesList>);
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

    random(query: { minRating: number | null }): Promise<Quote> {
      this.abort('random');

      const params = new URLSearchParams();

      if (query.minRating) {
        params.set('minRating', query.minRating.toString());
      }

      const controller = new AbortController();
      const request = fetch(url(`/quotes/random?${params.toString()}`), {
        signal: controller.signal,

      });
      this.requests.set('random', controller);

      return request.then(Api.json<Quote>);
    }
}

export const api = new Api();
