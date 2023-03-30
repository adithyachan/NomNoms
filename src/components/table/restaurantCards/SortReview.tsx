// import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
// import { isDataView } from 'util/types';
// export default function Review(props : {ids : any, ascending : boolean}) {
//     let list : (string|number)[][] = []
//     for (var i = 0; i < props.ids.length;i++) {
//         const {data : businessData, error : businessError , isLoading: isLoadingBusiness} = useRestaurantBusinessEndpoint(props.ids[i]) 
//         const rating = businessData.rating
//         list[i] = [props.ids[i], rating]
//     }
//     var temp = list[0]
//     if (props.ascending) {
//         for(var i = 0; i < props.ids.length-1; i++) {
//             for (var j = 0; j < props.ids.length-i-1; j++) {
//                 if (list[j][1] > list[j+1][1]) {
//                     temp = list[j];
//                     list[j] = list[j+1];
//                     list[j+1] = temp;
//                 }
//             }
//         }
//     } else {
//         for(var i = 0; i < props.ids.length-1; i++) {
//             for (var j = 0; j < props.ids.length-i-1; j++) {
//                 if (list[j][1] < list[j+1][1]) {
//                     temp = list[j];
//                     list[j] = list[j+1];
//                     list[j+1] = temp;
//                 }
//             }
//         } 
//     }



// }


export default function ReviewSort(props: {hashm: Map<any, any>, ascending: boolean}) {
    const keys = Array.from(props.hashm.keys());
  
    keys.sort((keyA, keyB) => {
      const a = props.hashm.get(keyA);
      const b = props.hashm.get(keyB);
  
      if (a[0] !== b[0]) {
        return props.ascending ? a[0] - b[0] : b[0] - a[0];
      }
  
      return props.ascending ? a[1] - b[1] : b[1] - a[1];
    });
  
    return keys;
  }