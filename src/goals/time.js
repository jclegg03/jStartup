export function updateTimeLeft(goal, update) {
    // console.log(goal)
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
    let disabled = dif > 0
    let timeLeft = ""
    let streak = goal.streak

    if (disabled) {
        const days = Math.floor(dif / (1000 * 60 * 60 * 24))
        // console.log(dif)
        // console.log(days)

        dif -= days * 1000 * 60 * 60 * 24
        const hours = Math.floor(dif / (1000 * 60 * 60))
        // console.log(hours)

        dif -= hours * 1000 * 60 * 60
        const mins = Math.floor(dif / (1000 * 60))
        // console.log(mins)

        timeLeft = hours + " hours " + mins + " mins until next goal"
        if (includeDays && days > 0) {
            timeLeft = days + " days " + timeLeft
        }
    }

    else {
        if (goal.goalType == "Daily") {
            interval = 1000 * 60 * 60 * 24
        }
        else {
            interval = 1000 * 60 * 60 * 24 * 7
            includeDays = true
        }
        dif += interval
        // console.log('here')

        if (dif > 0) {
            const days = Math.floor(dif / (1000 * 60 * 60 * 24))
            // console.log(dif)
            // console.log(days)

            dif -= days * 1000 * 60 * 60 * 24
            const hours = Math.floor(dif / (1000 * 60 * 60))
            // console.log(hours)

            dif -= hours * 1000 * 60 * 60
            const mins = Math.floor(dif / (1000 * 60))
            // console.log(mins)

            timeLeft = hours + " hours " + mins + " mins until streak reset"
            if (includeDays && days > 0) {
                timeLeft = days + " days " + timeLeft
            }
        }
        else {
            const newGoal = resetStreak(goal)
            streak = 0
            updateTimeLeft(newGoal, update)
            return
        }
    }

    update(timeLeft, disabled, streak)
}

function resetStreak(goal) {
    let id = goal.id
    let goalList = []
    let updatedGoal = null
    const goalsText = localStorage.getItem('goals')
    if (goalsText) {
        goalList = JSON.parse(goalsText)
    }

    for (let i = 0; i < goalList.length; i++) {
        const currentGoal = goalList[i]
        const currentID = currentGoal.id
        if (currentID == id) {
            const day = 1000 * 60 * 60 * 24
            let date = new Date()
            if (goal.goalType == "Daily") {
                date -= (day)
            }
            else {
                date -= day * 7
            }
            date = new Date(date)
            const newGoal = {
                name: goal.userName, goalText: goal.goalText, goalType: goal.goalType,
                streak: 0, date: date, id: currentID
            }
            goalList[i] = newGoal
            localStorage.setItem('goals', JSON.stringify(goalList))
            return newGoal
        }
    }
}

export function resetTimer(goal, update) {
    let id = goal.id
    let goalList = []
    const goalsText = localStorage.getItem('goals')
    if (goalsText) {
        goalList = JSON.parse(goalsText)
    }

    for (let i = 0; i < goalList.length; i++) {
        const currentGoal = goalList[i]
        const currentID = currentGoal.id
        if (currentID == id) {
            const newGoal = {
                name: currentGoal.name, goalText: currentGoal.goalText, goalType: currentGoal.goalType,
                streak: currentGoal.streak + 1, date: new Date(), id: currentID
            }
            goalList[i] = newGoal
            break
        }
    }

    localStorage.setItem('goals', JSON.stringify(goalList))
    update(goalList)
}