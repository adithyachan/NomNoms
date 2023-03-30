import ShowCard from "@/components/table/restaurantCards/Card";
import CardStack from "@/components/table/restaurantCards/CardStack";

export default function Test() {
    const ids = ["YJLz8WSjSqs1NvP5cx-eew","_4f10yrgvDHGOqvmHd91iA","rgQGVnhkxsHGURJaU5r_HA"];
    //const ascending = true;
    //PriceSort({ids,ascending});
    // return(ShowCard({id: test[0]}));
    // return <ShowCard id={test[2]} />;
    return (
        <CardStack ids = {[ids]} />
      );
}