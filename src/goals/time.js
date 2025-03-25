export function updateTime(date)
{
    const curTime = new Date()
    const oldTime = new Date(date)

    let dif = curTime - oldTime
    const days = Math.floor(dif/(1000 * 60 * 60 * 24))

    dif -= days * 1000 * 60 * 60 * 24
    const hours = Math.floor(dif/(1000 * 60 * 60))
    
    dif -= hours * 1000 * 60 * 60
    const mins = Math.floor(dif/(1000 * 60))
    console.log("current: " + curTime)
    console.log("old: " + oldTime)
    console.log(days + " days")
    console.log(hours + " hours")
    console.log(mins + " mins")
}