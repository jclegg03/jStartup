export function makeId()
{
    let id = (localStorage.getItem('currentID') || 0)
    id += 1
    localStorage.setItem('currentID', id)
    return id
}