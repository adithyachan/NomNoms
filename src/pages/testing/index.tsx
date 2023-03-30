import ShowCard from "@/components/table/restaurantCards/Card";
import CardStack from "@/components/table/restaurantCards/CardStack";
import LexSort from "@/components/table/restaurantCards/LexSort";
import PriceSort from "@/components/table/restaurantCards/PriceSort";
export default function Test() {
    const ids = ["8iBf92OQexHN0yjMDEaYJA","uGBc1xGAR9YEY0DtINPV9A"];
    //const ascending = true;
    //PriceSort({ids,ascending});
    const test = LexSort({ids: ids, ascending: true})
    // return(ShowCard({id: test[0]}));
    // return <ShowCard id={test[2]} />;
    return (
      <CardStack ids={ids}>
        {ids.map((id) => (
          <ShowCard key={id} id={id.toString()} />
        ))}
      </CardStack>
    );
  
}