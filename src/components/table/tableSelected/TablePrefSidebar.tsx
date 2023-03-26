import { Table } from "@/types/Table";
import { Autocomplete, Transition, TransitionProps } from "@mantine/core";
import PriceSlider from "../PriceSlider";

import SearchBar from "../SearchBar";

export default function TablePrefSidebar(props: { table: Table }) {
  return (
    <>
    <SearchBar>

    </SearchBar>
    <PriceSlider>
      
    </PriceSlider>
    </>
  );
}