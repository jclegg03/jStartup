export function updateTime(date) {
    const curTime = new Date()
    const oldTime = new Date(date)

    let dif = curTime - oldTime
    const days = Math.floor(dif / (1000 * 60 * 60 * 24))

    dif -= days * 1000 * 60 * 60 * 24
    const hours = Math.floor(dif / (1000 * 60 * 60))

    dif -= hours * 1000 * 60 * 60
    const mins = Math.floor(dif / (1000 * 60))
    console.log("current: " + curTime)
    console.log("old: " + oldTime)
    console.log(days + " days")
    console.log(hours + " hours")
    console.log(mins + " mins")
}

export function resetTimer(id, update) {
    let goalList = []
    const goalsText = localStorage.getItem('goals')
    if (goalsText) {
        goalList = JSON.parse(goalsText)
    }

    for (let i = 0; i < goalList.length; i++) {
        const goal = goalList[i]
        const currentID = goal.id
        if (currentID == id) {
            const newGoal = {name: goal.userName, goalText: goal.goalText, goalType: goal.goalType, 
                streak: goal.streak + 1, date: new Date().toUTCString(), id: currentID}
            goalList[i] = newGoal
            break
        }
    }

    localStorage.setItem('goals', JSON.stringify(goalList))
    update(goalList)
}