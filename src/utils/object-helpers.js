export const updateObjectInArray = (items, itemId, objPropertyName, newObjProperties) => {
    return items.map(user => {
        if (user[objPropertyName] === itemId) {
            return { ...user, ...newObjProperties}
        }
        return user;
    })
}
