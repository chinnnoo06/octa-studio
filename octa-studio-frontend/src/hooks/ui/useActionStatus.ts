import { useState } from "react";

export const useActionStatus = () => {
    const [loading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return {
        loading,
        startLoading,
        stopLoading,

    };
};
