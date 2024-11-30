import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2pXkkWeCMYc7iZ7LAqdhcciM4mQ",
    
];

export const isAdmin = () => {
    const { userId } = auth ();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};        