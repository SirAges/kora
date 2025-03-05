import { selectCurrentToken } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
const useAuth = () => {
    let initialState = { isSignedIn: false, isOnboarded: false };
    const token = useSelector(selectCurrentToken);

    try {
        if (!token) return initialState;
        const decoded = jwtDecode(token);
        if (!decoded) {
            return initialState;
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const isTokenExpired = currentTimestamp > decoded.exp;
        if (isTokenExpired) {
            return initialState;
        }
        return { isSignedIn: true, isOnboarded: decoded.onboarded, ...decoded };
    } catch (error) {
        console.log("error", error);
        return initialState;
    }
};

export default useAuth;
