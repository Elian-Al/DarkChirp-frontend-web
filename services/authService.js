const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authFetch = async (endpoint, credentials) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Erreur de l'API (${response.status})`);
        }

        return { success: true, ...data };

    } catch (error) {
        return { success: false, message: error.message || "Une erreur réseau inconnue est survenue."};
    }
};

export const signUp = async (credentials) => {
    return authFetch('/users/signup', credentials);
};

export const signIn = async (credentials) => {
    return authFetch('/users/signin', credentials);
};