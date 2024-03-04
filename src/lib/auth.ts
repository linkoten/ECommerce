import { getServerSession } from "next-auth"
import { authConfig } from "../../pages/api/auth/[...nextauth]"

export const getAuthSession = () => {
    return getServerSession(authConfig)
}