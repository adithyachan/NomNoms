import useSWR from 'swr';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_FUSION_AUTH_TOKEN}`
  }
}
const fetcher = (url: string) => fetch(url, options).then(res => res.json());

const GetRestaurants = ({zip, radius, categories}: any) => {
  const {data, error, isLoading} = useSWR(`/api/businesses?limit=50&location=${zip}&radius=${radius}&categories=${categories}`, fetcher);

  if (error) {
    console.log(error);
    return (<div>failed to load</div>);
  }
  if (isLoading) return (<div>Loading...</div>);
  
  console.log(data);
  return <p>Successfully fetched from Yelp API</p>
};
export default GetRestaurants;
