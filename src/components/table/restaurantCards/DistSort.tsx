export default function SortByDist(props: { hashm: Map<any, any>, ascending: boolean }): string[] {
    if (props.ascending) {
      const entries = Array.from(props.hashm.entries());
      entries.sort((a, b) => a[1] - b[1]);
      const keys = entries.map((entry) => entry[0].toString());
      return keys;
    } else {
      const entries = Array.from(props.hashm.entries());
      entries.sort((a, b) => b[1] - a[1]);
      const keys = entries.map((entry) => entry[0].toString());
      return keys;
    }
  }
  