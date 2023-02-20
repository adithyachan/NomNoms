export default async function handler({query}, res: any) {
    const apiKey = process.env.NEXT_PUBLIC_YELP_FUSION_AUTH_TOKEN;
    const baseUrl = `https://api.yelp.com/v3/businesses/`;
      try {   
        let searchUrl = baseUrl
        if (query.id) searchUrl += `${query.id}`;
        console.log(searchUrl);
        let business = await fetch(
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
          let data = await business.json();
          searchUrl = baseUrl;
          res.status(200).json(data);
      } catch (error) {
          res
          .status(500)
          .json({ message: `Server error - ${error}` })
      }
  }