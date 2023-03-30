import { Table } from "@/types/Table";
import { Flex,
         Text, 
         Button
        } from "@mantine/core";
import PriceSlider from "../PriceSlider";
import SearchBar from "../SearchBar";
import { useState, useEffect } from 'react';

interface priceObj {
  price: number,
  minPrice: number,
  maxPrice: number,
  checked: boolean
  error: boolean
}

export default function TablePrefSidebar(props: {table: Table, data: any[], setPrefs: (cuisine?: string, price?: {min: string, max: string}) => void}) {

  const [priceObject, setPrice] = useState<priceObj>({
    price: 0, 
    minPrice: 0, 
    maxPrice: 0,
    checked: false, 
    error: false
  });

  const [error, setError] = useState(false);
  var priceData = new Array("$", "$$", "$$$", "$$$$");

  const HandleSearch = async (e : any) => {
    e.preventDefault();
    if (priceObject?.checked) {
      console.log("MIN AND MAX");
      //error checking for min and max price
      if (priceObject.minPrice == null || 
          priceObject.maxPrice == null || 
          priceObject.minPrice == 0 || 
          priceObject.maxPrice == 0 || 
          priceObject.minPrice < 0 ||
          priceObject.minPrice > priceObject.maxPrice) {
          setError(true);
          console.log("error");
      } else {
        setError(false);
        console.log("MinPrice: " + priceObject.minPrice + "MaxPrice: " + priceObject.maxPrice);
      }
    } else {
      //grab price from slider
      setError(false);
      console.log("Price: " + priceObject?.price);
    }
  }

  return (
    <>
    <form onSubmit={HandleSearch}>
    <Flex 
    gap="xl"
    className="bg-white p-10 rounded-3xl shadow-lg shadow-rose-100 flex-col justify-center">
    <Text className="mb-10 text-xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Preferences</Text>
    <SearchBar></SearchBar>
    <PriceSlider setPrice={setPrice}></PriceSlider>  
     {error ? <Text>Invalid Inputs</Text> : null} 
    <Button 
      className="mt-20"
      color="red" 
      radius="md" 
      type="submit"
    >
      Search!
    </Button>
    </Flex>
    </form>
    </>
  );
}