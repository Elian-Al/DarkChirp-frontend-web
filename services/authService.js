const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authFetch = async (endpoint, credentials) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Erreur de l'API (${response.status})`);
        }

        return { success: true, ...data };
    } catch (error) {
        return { success: false, message: error.message || "Une erreur réseau inconnue est survenue." };
    }
};

export const signUp = async (credentials) => {
    return authFetch("/users/signup", credentials);
};

export const signIn = async (credentials) => {
    return authFetch("/users/signin", credentials);
};

export const fetchMe = async (token) => {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!data.result) {
            return { success: false, message: data.message };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const imageUpload = async (token, image) => {
    console.log("Function called");

    const formData = new FormData();

    formData.append("image", image);

    try {
        const response = await fetch(`${API_URL}/users/updateProfilePic`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        console.log("resultData:", data);

        if (!data.result) {
            return { success: false, message: data.message };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const deleteAccount = async (token, password) => {
    try {
        const response = await fetch(`${API_URL}/users/delete-account`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (!data.result) {
            return { success: false, message: data.message };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
