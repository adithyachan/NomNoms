export default function GetHours(props : {arr: any}) {
    const neededArr = new Array(props.arr.length)
    console.log(props.arr)
    var element = ""
    var prevDay = -1
    const days = ["Mon", "Tue", "Wed","Thu","Fri","Sat","Sun"]
    const flag = true
    for (var i = 0; i < props.arr.length; i++) {
        
        if (props.arr[i].day != prevDay) {
            prevDay = props.arr[i].day 
            element = days[prevDay] + "   " + formatHours(props.arr[i])

        } else {
            element = "   " + "   " + formatHours(props.arr[i])
        }
        neededArr[i] = element
    }
    return neededArr
}
function formatHours(props : {dict1 : any}) {
    var element = ""
    var minutes = parseInt(props.dict1.start)%100
    if (59<parseInt(props.dict1.start) && parseInt(props.dict1.start) < 1300) {
        var hoursAlrUnder12 = Math.floor(parseInt(props.dict1.start)/100)
        element +=  hoursAlrUnder12 + ":" + minutes+ " AM - "
    } else if (parseInt(props.dict1.start) >= 1300){
        var under12 = Math.floor(parseInt(props.dict1.start)/100)-12
        element += under12 + ":" +minutes + " PM - "
    } else {
        var increase12 = 12
        element += increase12 + ":" +minutes + " AM - "
    }
    minutes =parseInt(props.dict1.end)%100 
    if (!props.dict1.is_overnight) {
        
        if (59<parseInt(props.dict1.end) && parseInt(props.dict1.end) < 1300) {
            var hoursAlrUnder12 = Math.floor(parseInt(props.dict1.end)/100)
            element +=  hoursAlrUnder12 + ":" + minutes+ " AM"
        } else if (parseInt(props.dict1.end) >= 1300){
            var under12 = Math.floor(parseInt(props.dict1.end)/100)-12
            element += under12 + ":" +minutes + " PM"
        } else {
            var increase12 = 12
            element += increase12 + ":" +minutes + " AM"
        } 
    } else {
        if (59<parseInt(props.dict1.end) && parseInt(props.dict1.end) < 1300) {
            var hoursAlrUnder12 = Math.floor(parseInt(props.dict1.end)/100)
            element +=  hoursAlrUnder12 + ":" + minutes+ " AM (Next day)"
        } else if (parseInt(props.dict1.end) >= 1300){
            var under12 = Math.floor(parseInt(props.dict1.end)/100)-12
            element += under12 + ":" +minutes + " PM (Next day)"
        } else {
            var increase12 = 12
            element += increase12 + ":" +minutes + " AM (Next day)"
        }  
    }
}