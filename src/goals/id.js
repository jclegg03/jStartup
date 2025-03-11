export function makeId()
{
    let id = (localStorage.getItem('currentID') || 0)
    id = parseInt(id)
    id += 1
    localStorage.setItem('currentID', id)
    return id
}