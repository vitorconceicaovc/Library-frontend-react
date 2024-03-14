import { useNavigate } from "react-router-dom";
import { logOut, verifyToken } from "../API";
import { useEffect } from "react";

export function Requirements() {

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const tokenValid = await verifyToken();
            if (!tokenValid) {
                logOut(navigate)
            }
        };

        fetchData();
    }, []);

    return(
        <h1>Requirements</h1>
    )
}