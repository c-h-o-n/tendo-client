import axios from 'axios';

export function useSearchApi() {
  const search = (term: string) => {
    return axios.get('/search', {
      params: {
        term: term,
      },
    });
  };

  return { search };
}
