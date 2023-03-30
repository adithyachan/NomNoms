export default function SortByPrice(props : {hashm: Map<any, any>}): string[] {
    const entries = Array.from(props.hashm.entries());
    entries.sort((b, a) => a[1].toString().length - b[1].toString().length);
    const keys = entries.map((entry) => entry[0].toString());
    return keys;
  }


