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
}

export const api = new Api();
