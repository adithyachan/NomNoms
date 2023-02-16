import useSWR from 'swr';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_FUSION_AUTH_TOKEN}`
  }
}
const fetcher = (options: any) => fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options).then(res=>res.json());

const getRestaurants = () => {
  const {data, error, isLoading} = useSWR('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', fetcher);

  if (error) return (<div>failed to load</div>);
  if (isLoading) return (<div>Loading...</div>);
  
  console.log(data);
}
