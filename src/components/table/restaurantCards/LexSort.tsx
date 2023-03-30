export default function SortByLex(props: { hashm: Map<any, any>, ascending: boolean }): string[] {
    if (props.ascending) {
      const entries = Array.from(props.hashm.entries());
      entries.sort((a, b) => a[1].toString().toLowerCase().localeCompare(b[1].toString().toLowerCase()));
      const keys = entries.map((entry) => entry[0].toString());
      return keys;
    } else {
      const entries = Array.from(props.hashm.entries());
      entries.sort((a, b) => b[1].toString().toLowerCase().localeCompare(a[1].toString().toLowerCase()));
      const keys = entries.map((entry) => entry[0].toString());
      return keys;
    }
  }
  