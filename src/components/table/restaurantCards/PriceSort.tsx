import { useRestaurantBusinessEndpoint } from "@/lib/utils/yelpAPI";

export default function PriceSort(props : {ids : any , ascending : boolean}) {
    let list : (string|number)[][] = []
    for (var i = 0; i < props.ids.length; i++) {
        const {data : businessData, error : businessError , isLoading: isLoadingBusiness} = useRestaurantBusinessEndpoint(props.ids[i])
        var price = businessData.price
        list[i] = [props.ids[i], price]
    }
    var temp = list[0]
    if (props.ascending) {
        for(var i = 0; i < props.ids.length-1; i++) {
            for (var j = 0; j < props.ids.length-i-1; j++) {
                if (list[j][1].toString().length > list[j+1][1].toString().length) {
                    temp = list[j];
                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }
    } else {
        for(var i = 0; i < props.ids.length-1; i++) {
            for (var j = 0; j < props.ids.length-i-1; j++) {
                if (list[j][1].toString().length < list[j+1][1].toString().length) {
                    temp = list[j];
                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }
    }
}


