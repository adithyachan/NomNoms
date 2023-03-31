import { Flex,
         Text, 
         Button
        } from "@mantine/core";
import PriceSlider from "../PriceSlider";
import SearchBar from "../SearchBar";
import { useState, useEffect } from 'react';

interface priceObj {
  minPrice: number,
  maxPrice: number,
  checked: boolean
  error: boolean
}


export default function TablePrefSidebar(props: {data: any[], setPrefs: (cuisine?: string, price?: {min: string, max: string}) => void}) {

  const [priceObject, setPrice] = useState<priceObj>();

  const [ac, setAC] = useState<string[]>()
  const [cuisine, setCuisine] = useState("");
  const [error, setError] = useState(false);

  const HandleSearch = async (e : any) => {
    e.preventDefault();

    let minimumPrice = ""
    let maximumPrice = ""

    if (priceObject?.checked) {
      //error checking for min and max price
      if (priceObject.minPrice == null || 
          priceObject.maxPrice == null || 
          priceObject.minPrice < 0 ||
          priceObject.minPrice > priceObject.maxPrice) {
          
            console.log("price Range: " + priceObject.minPrice + " : " + priceObject.maxPrice)  
            setError(true);

        } else {
        console.log("price Range: " + priceObject.minPrice + " : " + priceObject.maxPrice)
        setError(false);
        //“$” means under $10; “$ $” means “$11-$30”; “$ $ $” means “$31-$60”; and “$ $ $ $” means “above $61”
        if (priceObject.minPrice < 10) {
          minimumPrice = "$"
        } else if (priceObject.minPrice >= 10 || priceObject.minPrice <= 30) {
          minimumPrice = "$$"
        } else if (priceObject.minPrice >= 31 || priceObject.minPrice <= 60) {
          minimumPrice = "$$$"
        } else if (priceObject.minPrice >= 61) {
          minimumPrice = "$$$$"
        } else {
          minimumPrice = "$"
        }

        if (priceObject.maxPrice < 10) {
          maximumPrice = "$"
        } else if (priceObject.maxPrice >= 10 || priceObject.maxPrice <= 30) {
          maximumPrice = "$$"
        } else if (priceObject.maxPrice >= 31 || priceObject.maxPrice <= 60) {
          maximumPrice = "$$$"
        } else if (priceObject.maxPrice >= 61) {
          maximumPrice = "$$$$"
        } else {
          maximumPrice = "$$$$"
        } 
      }
    } else {
      console.log("priceslider")
      //grab price from slider
      setError(false);
      minimumPrice = "$"
      if (priceObject?.maxPrice == 0) {
        maximumPrice = "$"
      } else if (priceObject?.maxPrice == 33) {
        maximumPrice = "$$"
      } else if (priceObject?.maxPrice == 66) {
        maximumPrice = "$$$"
      } else {
        maximumPrice = "$$$$"
      }
    }

    props.setPrefs(cuisine, { min: minimumPrice, max: maximumPrice })
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
    console.log(strings)
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
     {error ? <Text color="red"> Invalid Inputs</Text> : null} 
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