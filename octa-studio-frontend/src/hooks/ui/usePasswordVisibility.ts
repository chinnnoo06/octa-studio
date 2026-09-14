import { useState } from "react";

export const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return {
        showPassword,
        showConfirmPassword,
        handlePasswordVisibility,
        handleConfirmPasswordVisibility,
        inputTypePassword: showPassword ? "text" : "password",
        inputTypeConfirmPassword: showConfirmPassword ? "text" : "password",
    }
}
