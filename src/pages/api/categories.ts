export default async function handler({ query }: any, res: any) {
  const apiKey = process.env.NEXT_PUBLIC_YELP_FUSION_AUTH_TOKEN;

  const baseUrl = `https://api.yelp.com/v3/categories?locale=en_US`;
  
    try {
      let searchUrl = baseUrl
      let categories = await fetch(
          searchUrl,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'accept': 'application/json',
              'x-requested-with': 'xmlhttprequest',
              'Access-Control-Allow-Origin':'*',
            }
          }
        )
        let data = await categories.json();
        searchUrl = baseUrl; // reset search url after each request
        
        res.status(200).json(data);

    } catch (error) {
        res
        .status(500)
        .json({ message: `Server error - ${error}` })
    }

}