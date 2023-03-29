import { useRestaurantBusinessEndpoint } from "@/lib/utils/yelpAPI";
import CardStack from "./CardStack";

export default function LexSort(props : {ids : any , ascending : boolean}) {
    let list : (string|number)[][] = []
    for (var i = 0; i < props.ids.length; i++) {
        const {data : businessData, error : businessError , isLoading: isLoadingBusiness} = useRestaurantBusinessEndpoint(props.ids[i])
        var name = businessData?.name
        list[i] = [props.ids[i], name]
    }
    var temp = list[0]
    if (props.ascending) {
        for(var i = 0; i < props.ids.length-1; i++) {
            for (var j = 0; j < props.ids.length-i-1; j++) {
                if (list[j][1] > list[j+1][1]) {
                    temp = list[j];
                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }
    } else {
        for(var i = 0; i < props.ids.length-1; i++) {
            for (var j = 0; j < props.ids.length-i-1; j++) {
                if (list[j][1] < list[j+1][1]) {
                    temp = list[j];
                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }
    }
    return list.map((entry) => entry[0]);
}