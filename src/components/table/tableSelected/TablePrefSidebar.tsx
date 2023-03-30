import { Table } from "@/types/Table";
import { Flex,
         Text, 
         Button
        } from "@mantine/core";
import PriceSlider from "../PriceSlider";
import SearchBar from "../SearchBar";
import { useState, useEffect } from 'react';
import { stringify } from "querystring";

interface priceObj {
  minPrice: number,
  maxPrice: number,
  checked: boolean
  error: boolean
}


export default function TablePrefSidebar(props: {table: Table, data: any[], setPrefs: (cuisine?: string, price?: {min: string, max: string}) => void}) {

  const [priceObject, setPrice] = useState<priceObj>({
    minPrice: 0, 
    maxPrice: 0,
    checked: false, 
    error: false
  });

  const [ac, setAC] = useState<string[]>()
  const [cuisine, setCuisine] = useState("");

  const [error, setError] = useState(false);
  var priceData = new Array("$", "$$", "$$$", "$$$$");

  const HandleSearch = async (e : any) => {
    e.preventDefault();

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    if (priceObject?.checked) {
      //error checking for min and max price
      if (priceObject.minPrice == null || 
          priceObject.maxPrice == null || 
          priceObject.minPrice < 0 ||
          priceObject.minPrice > priceObject.maxPrice) {
          setError(true);
      } else {
        setError(false);
        //“$” means under $10; “$ $” means “$11-$30”; “$ $ $” means “$31-$60”; and “$ $ $ $” means “above $61”
        if (priceObject.minPrice < 10) {
          setMinPrice("$")
        } else if (priceObject.minPrice >= 10 || priceObject.minPrice <= 30) {
          setMinPrice("$$")
        } else if (priceObject.minPrice >= 31 || priceObject.minPrice <= 60) {
          setMinPrice("$$$")
        } else if (priceObject.minPrice >= 61) {
          setMinPrice("$$$$")
        } else {
          setMinPrice("$")
        }

        if (priceObject.maxPrice < 10) {
          setMaxPrice("$")
        } else if (priceObject.maxPrice >= 10 || priceObject.maxPrice <= 30) {
          setMaxPrice("$$")
        } else if (priceObject.maxPrice >= 31 || priceObject.maxPrice <= 60) {
          setMaxPrice("$$$")
        } else if (priceObject.maxPrice >= 61) {
          setMaxPrice("$$$$")
        } else {
          setMaxPrice("$$$$")
        }

        
      }
    } else {
      //grab price from slider
      setError(false);
      setMinPrice("$");
      if (priceObject?.maxPrice == 1) {
        setMaxPrice("$")
      } else if (priceObject?.maxPrice == 1) {
        setMaxPrice("$$")
      } else if (priceObject?.maxPrice == 1) {
        setMaxPrice("$$$")
      } else {
        setMaxPrice("$$$$")
      }
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    }

    props.setPrefs(cuisine, { min: minPrice, max: maxPrice })
  }

  useEffect(() => {
    let cuisines: any = {}
    let strings: string[] = []
    props.data.forEach((cus) => {
      if (cus.categories as string[]) {
        cus.categories.forEach((c: any) => {
          if (cuisines[c.title] !== undefined) {
            cuisines[c.title] += 1
          }
          else {
            cuisines[c.title] = 1
          }
        })
      }
      else {
        if (cuisines[cus.categories.title] !== undefined) {
          cuisines[cus.categories.title] += 1
        }
        else {
          cuisines[cus.categories.title] = 1
        }
      }
    })

    Object.keys(cuisines).forEach((cus) => {
      strings.push(`${cus} (${cuisines[cus]})`)
    })

    setAC(strings)
  }, [props.data])



  return (
    <>
    <form onSubmit={HandleSearch}>
    <Flex 
    gap="xl"
    className="bg-white p-10 rounded-3xl shadow-lg shadow-rose-100 flex-col justify-center">
    <Text className="mb-10 text-xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Preferences</Text>
    <SearchBar setCuisine={setCuisine} data={ac ?? []}></SearchBar>
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