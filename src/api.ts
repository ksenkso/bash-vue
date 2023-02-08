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

export interface ListParams {
  page: number;
  order?: Order,
  year?: YearParam;
}

export type YearAlias = 'first' | 'last';
export type YearParam = number | YearAlias;

export type ListProvider = (params: ListParams) => Promise<QuotesList>;

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

  list(query: ListParams) {
    const params = this.buildListParams(query);
    const path = url(`/quotes/page/${query.page}?${params.toString()}`)

    return this.abortable<QuotesList>('list', path);
  }

  listByYear(query: ListParams) {
    const params = this.buildListParams(query);
    const path = url(`/quotes/year/${query.year}/page/${query.page}?${params.toString()}`);

    return this.abortable('listByYear', path);
  }

  private abortable<R>(name: Methods, path: string) {
    this.abort(name);

    const controller = new AbortController();
    const request = fetch((path), {
      signal: controller.signal,
    });
    this.requests.set(name, controller);

    return request.then(Api.json<R>);
  }

  private buildListParams(query: ListParams) {
    const params = new URLSearchParams();

    if (query.order) {
      params.set('order', query.order.field);
      params.set('dir', query.order.dir);
    }

    return params;
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
