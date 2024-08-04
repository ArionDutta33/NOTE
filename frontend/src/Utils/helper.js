export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
export const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(/\s+/); // Remove extra spaces and split by spaces
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words[i].length > 0) {
            initials += words[i][0];
        }
    }
    return initials.toUpperCase();
};
