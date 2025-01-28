import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirecionarParaLogin } from "utils";

export function BasicRules() {
    const navigate = useNavigate()
    useEffect(() => {
        redirecionarParaLogin().then(faltaLogar => {
            if (faltaLogar) {
                navigate("/login");
            }
        });
    }, [navigate])
}