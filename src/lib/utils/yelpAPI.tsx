import useSWR from 'swr';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_FUSION_AUTH_TOKEN}`
  }
}
const fetcher = (url: string) => fetch(url, options).then(res => res.json());

export function useRestaurantListEndpoint(zip: number, radius: number, categories: string) {
  return useSWR(`/api/businesses?limit=10&location=${zip}&radius=${radius}&categories=${categories}`, fetcher);
}

export function useRestaurantBusinessEndpoint(id: string) {
  return useSWR(`/api/business?id=${id}`, fetcher);
}