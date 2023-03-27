import useSWR from 'swr';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_FUSION_AUTH_TOKEN}`
  }
}
const fetcher = (url: string) => fetch(url, options).then(res => res.json());

//CALLS WITH MULTIPLE CATEGORIES MUST NOT BE SPACE SEPARATED (e.g. categories should be 'mexican,japanese')
export function useRestaurantListEndpoint(limit: number, zip: number, radius: number, categories: string) {
  return useSWR(`/api/businesses?limit=${limit}&location=${zip}&radius=${radius}&categories=${categories}`, fetcher);
}

export function useRestaurantBusinessEndpoint(id: string) {
  return useSWR(`/api/business?id=${id}`, fetcher);
}