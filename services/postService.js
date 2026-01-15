const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postService = {
    async getAllPosts() {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });            

            if (!response.ok) throw new Error('Erreur lors de la récupération des posts.');

            return await response.json();
        } catch (error) {
            console.error('Erreur postService (getAllPosts):', error);
            return [];            
        }
    },

    async createPost(content, token) {
        try {
            const response = await fetch(`${API_URL}/posts/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            });

            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    async deletePost(postId, token) {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            return { success: response.ok, result }
        } catch (error) {
            return { success: false, message: error.message}
        }
    },

    async interactPost(postId, token, type) {
        try {
            const response = await fetch(`${API_URL}/posts/${type}/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            return { success: response.ok, result }
        } catch (error) {
            return { success: false, message: error.message }
        }
    },

    async getUserPosts(token, skip, limit) {
        try {
            const response = await fetch(`${API_URL}/posts/user?skip=${skip}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            // console.log(result);
            
            return { success: response.ok, result }
        } catch (error) {
            return { success: false, message: error.message }
        }
    },


};