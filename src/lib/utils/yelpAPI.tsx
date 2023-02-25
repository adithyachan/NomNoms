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
  const {data, error, isLoading} = useSWR(`/api/businesses?limit=50&location=${zip}&radius=${radius}&categories=${categories}`, fetcher);
  if (error) return error
  if (isLoading) return 'loading'
  console.log('Restaurant list search:')
  console.log(data)
  return data
}

export function useRestaurantBusinessEndpoint(id: string) {
  const {data, error, isLoading} = useSWR(`/api/business?id=${id}`, fetcher);
  if (error) return error
  if (isLoading) return 'loading'
  console.log('Restaurant search by ID')
  console.log(data)
  return data
}