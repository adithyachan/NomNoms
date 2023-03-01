export default function GetHours( arr:string) {
    var data = JSON.parse(arr)
    const neededArr = new Array(data.length)
    for (var i = 0; i < neededArr.length; i++) {
        neededArr[i] = {}
    }
    //console.log(data[0])
    var element = ""
    var prevDay = -1
    const days = ["Mon", "Tue", "Wed","Thu","Fri","Sat","Sun"]
    const flag = true
    
    for (var i = 0; i < data.length; i++) {
        
        if (data[i].day != prevDay) {
            prevDay = data[i].day 
            element = days[prevDay] + "   " + formatHour(JSON.stringify(data[i]))
            neededArr[i].day = days[prevDay]
            neededArr[i].timing = formatHour(JSON.stringify(data[i]))

        } else {
            neededArr[i].timing = formatHour(JSON.stringify(data[i])) 
            //element = "   " + "   " + formatHour(JSON.stringify(data[i]))
        }
        
        //neededArr[i] = element
    }
    //console.log(neededArr)
    
    return neededArr
}
function formatHour(each1 : string) {
    var dict1 = JSON.parse(each1)
    var element = ""
    var minutesInteger = parseInt(dict1.start)%100
    var minutes = minutesInteger.toString().padStart(2,'0')
    //console.log(minutes)
    //console.log(parseInt(dict1.start))
    if (59<parseInt(dict1.start) && parseInt(dict1.start) < 1300) {
        var hoursAlrUnder12 = Math.floor(parseInt(dict1.start)/100)
        if (hoursAlrUnder12 >= 12) {
            element +=  hoursAlrUnder12 + ":" + minutes+ " PM - " 
        } else {
            element +=  hoursAlrUnder12 + ":" + minutes+ " AM - "
        }
    } else if (parseInt(dict1.start) >= 1300){
        var under12 = Math.floor(parseInt(dict1.start)/100)-12
        element += under12 + ":" +minutes + " PM - "
    } else {
        var increase12 = 12
        element += increase12 + ":" +minutes + " AM - "
    }
    minutesInteger =parseInt(dict1.end)%100 
    var minutes = minutesInteger.toString().padStart(2,'0')
    if (!dict1.is_overnight) {
        
        if (59<parseInt(dict1.end) && parseInt(dict1.end) < 1300) {
            var hoursAlrUnder12 = Math.floor(parseInt(dict1.end)/100)
            if (hoursAlrUnder12 >= 12) {
                element +=  hoursAlrUnder12 + ":" + minutes+ " PM" 
            } else {
                element +=  hoursAlrUnder12 + ":" + minutes+ " AM"
            }
        } else if (parseInt(dict1.end) >= 1300){
            var under12 = Math.floor(parseInt(dict1.end)/100)-12
            element += under12 + ":" +minutes + " PM"
        } else {
            var increase12 = 12
            element += increase12 + ":" +minutes + " AM"
        } 
    } else {
        if (59<parseInt(dict1.end) && parseInt(dict1.end) < 1300) {
            var hoursAlrUnder12 = Math.floor(parseInt(dict1.end)/100)
            if (hoursAlrUnder12 >= 12) {
                element +=  hoursAlrUnder12 + ":" + minutes+ " PM (Next day)" 
            } else {
                element +=  hoursAlrUnder12 + ":" + minutes+ " AM (Next day)"
            }
        } else if (parseInt(dict1.end) >= 1300){
            var under12 = Math.floor(parseInt(dict1.end)/100)-12
            element += under12 + ":" +minutes + " PM (Next day)"
        } else {
            var increase12 = 12
            element += increase12 + ":" +minutes + " AM (Next day)"
        }  
    }
    return element
}