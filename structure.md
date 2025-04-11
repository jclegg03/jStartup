This file is to help keep track of what different objects look like for easier use of them.

GOALS:
{
    name: the owner of the goal,
    goalText: what the goal says,
    goalType: Daily or weekly,
    streak: how long the goal has been accomplished,
    date: the date of the last update to the goal,
    id: number that is unique for that user and goal (2 goals may have the same id, but never the same user and id)
}

FRIEND REQUEST:
{
    name: the person who will recieve the friend request,
    id: works the same as goal IDs,
    userName: the username of the person who made the friend request
}

note about the friend object: it is set up poorly. name and username should be called user1 and user2, but I didn't feel like fixing it. Maybe one day.
FRIEND:
{
    name: idk which is which it works,
    id: works the same as goal IDs,
    userName: idk which is which it works
}