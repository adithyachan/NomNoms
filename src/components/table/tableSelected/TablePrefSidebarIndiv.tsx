import { Flex, Text, Button, Tooltip, TextInput, Group } from "@mantine/core";
import PriceSlider from "../PriceSlider";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import { useDisclosure, useInputState } from "@mantine/hooks";

interface priceObj {
    minPrice: number,
    maxPrice: number,
    checked: boolean
    error: boolean
}


export default function TablePrefSidebarIndiv(props: {data: any[], setPrefs: (zip?: string, cuisine?: string [], price?: {min: string, max: string}) => void}) {

    const [priceObject, setPrice] = useState<priceObj>();
    const [ac, setAC] = useState<string[]>()
    const [cuisine, setCuisine] = useState<string[]>([]);
    const [error, setError] = useState(false);
    const [zip, setZip] = useInputState('');
    const [openedZip, inputHandlersZip] = useDisclosure();
    const zip_check = zip.length == 5 && !Number.isNaN(zip)

    const [resSearch, setResSearch] = useState(false)
    const [resPrice, setResPrice] = useState(false)
    const [randSearch, setRandSearch] = useState(false)
    const [randPrice, setRandPrice] = useState(false)

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
            setError(false);
            //“$” means under $10; “$ $” means “$11-$30”; “$ $ $” means “$31-$60”; and “$ $ $ $” means “above $61”
            if (priceObject.minPrice > 0 && priceObject.minPrice < 10) {
                minimumPrice = "$"
            } else if (priceObject.minPrice >= 10 && priceObject.minPrice <= 30) {
                minimumPrice = "$$"
            } else if (priceObject.minPrice >= 31 && priceObject.minPrice <= 60) {
                minimumPrice = "$$$"
            } else if (priceObject.minPrice >= 61 && priceObject.maxPrice <= 200) {
                minimumPrice = "$$$$"
            } else {
                minimumPrice = ""
            }
            if (priceObject.maxPrice > 0 && priceObject.maxPrice < 10) {
                maximumPrice = "$"
            } else if (priceObject.maxPrice >= 10 && priceObject.maxPrice <= 30) {
                maximumPrice = "$$"
            } else if (priceObject.maxPrice >= 31 && priceObject.maxPrice <= 60) {
                maximumPrice = "$$$"
            } else if (priceObject.maxPrice >= 61 && priceObject.maxPrice <= 200 ) {
                maximumPrice = "$$$$"
            } else {
                maximumPrice = ""
            } 
        }
        } else {
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

        if (zip_check) {
            props.setPrefs(zip, cuisine, { min: minimumPrice, max: maximumPrice })
        } else {
            setError(true)
        }

        console.log("ERROR: " + error)
    }


  const HandleReset = (e : any) => {
    setResSearch(true)
    setResPrice(true)
  }

  const HandleRandomize = (e :any) => {
    setRandSearch(true)
    setRandPrice(true)
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
                <Text className="mb-10 text-3xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Preferences</Text>
                <Tooltip
                label={zip_check ? null : "Invalid Zip Code"}
                position="left"
                withArrow
                opened={openedZip && !zip_check}
                color={"red.8"}
                >
                <TextInput
                    placeholder="Zip Code"
                    onFocus={() => inputHandlersZip.open()}
                    onBlur={() => inputHandlersZip.close()}
                    mt="md"
                    value={zip}
                    onChange={setZip}
                />
                </Tooltip>
                <SearchBar     
    setCuisine={setCuisine} 
    data={ac ?? []} 
    reset={resSearch} 
    setReset={setResSearch} 
    rand={randSearch}
    setRand={setRandSearch}></SearchBar>
                <PriceSlider  
                data={ac ?? []}    
    setPrice={setPrice} 
    reset={resPrice} 
    setReset={setResPrice}
    rand={randPrice}
    setRand={setRandPrice}></PriceSlider>  
                {error ? <Text color="red"> Invalid Inputs</Text> : null} 
                <Button 
                    className="mt-20"
                    color="red" 
                    radius="md" 
                    type="submit"
                >
                Search!
            </Button>
            <Group 
    position="center" 
    spacing="sm"
    grow> 
    <Button 
      color="red" 
      radius="md" 
      onClick={HandleReset}
    >
      Reset.
    </Button>
    <Button 
      color="red" 
      radius="md" 
      onClick={HandleRandomize}
    >
      Randomize.
    </Button> 
    </Group>
            </Flex>
        </form>
    </>
);
}