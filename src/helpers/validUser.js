export default function validUser(user) {
    if ((JSON.stringify(user) === '{}') || !(user)) {
        return false;
    }
    return true;
}