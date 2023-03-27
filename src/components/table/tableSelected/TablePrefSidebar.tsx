import NavBar from "@/components/NavBar";
import { Table } from "@/types/Table";
import { Flex,
         Text, 
        } from "@mantine/core";
import PriceSlider from "../PriceSlider";

import SearchBar from "../SearchBar";

export default function TablePrefSidebar(props: { table: Table }) {
  return (
    <>
    <Flex 
    gap="xl"
    
    className="bg-white p-10 rounded-3xl shadow-lg shadow-rose-100 flex-col justify-center">
    <Text className="mb-10 text-xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Preferences</Text>
    <SearchBar></SearchBar>
    <PriceSlider></PriceSlider>  
    </Flex>
    </>
  );
}