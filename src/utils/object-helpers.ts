export const updateObjectInArray = (items:any, itemId:any, objPropertyName:any, newObjProperties:any) => {
    return items.map((user:any) => {
        if (user[objPropertyName] === itemId) {
            return { ...user, ...newObjProperties}
        }
        return user;
    })
}
