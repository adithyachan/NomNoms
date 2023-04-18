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
export function useRestaurantListEndpoint(limit: number, zip: string, radius: number, categories: string, price: string) {
  return useSWR(`/api/businesses?limit=${limit}&location=${zip}&radius=${radius}&categories=${categories}&price=${price}`, fetcher);
}

export function useRestaurantBusinessEndpoint(id: string) {
  return useSWR(`/api/business?id=${id}`, fetcher);
}

export async function getRestaurantList(limit: number, zip: string, radius: number, categories: string, offset?: number) {
  const url = `/api/businesses?location=${zip}&radius=${radius}&categories=${categories}&limit=${limit}${offset ? `&offset=${offset}` : ""}`

  try {
    const res = await fetch(url, options);
    return res
  }
  catch (err) {
    console.log(err)
    throw err
  }
}

export async function getRestaurantBusiness(id: string) {
  const url = `/api/business?id=${id}`

  try {
    const res = await fetch(url, options);
    return res
  }
  catch (err) {
    console.log(err)
    throw err
  }

}