export function updateTimeLeft(goal, update) {
    const curTime = new Date()
    const oldTime = new Date(goal.date)
    let interval = 0
    let includeDays = false
    if (goal.goalType == "Daily") {
        interval = 1000 * 60 * 60 * 24
    }
    else {
        interval = 1000 * 60 * 60 * 24 * 7
        includeDays = true
    }

    let dif = interval - (curTime - oldTime)
    const days = Math.floor(dif / (1000 * 60 * 60 * 24))

    dif -= days * 1000 * 60 * 60 * 24
    const hours = Math.floor(dif / (1000 * 60 * 60))

    dif -= hours * 1000 * 60 * 60
    const mins = Math.floor(dif / (1000 * 60))

    let timeLeft = hours + " hours " + mins + " mins"
    if(includeDays && days > 0)
    {
        timeLeft = days + " days " + timeLeft
    }
    update(timeLeft)
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
            const newGoal = {
                name: goal.userName, goalText: goal.goalText, goalType: goal.goalType,
                streak: goal.streak + 1, date: new Date().toUTCString(), id: currentID
            }
            goalList[i] = newGoal
            break
        }
    }

    localStorage.setItem('goals', JSON.stringify(goalList))
    update(goalList)
}