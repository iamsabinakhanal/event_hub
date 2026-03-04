//backend route paths

export const API = {
    AUTH: {
        REGISTER: 'api/auth/register',
        LOGIN: 'api/auth/login',
        FORGET_PASSWORD: 'api/auth/request-password-reset',
        RESET_PASSWORD: 'api/auth/reset-password',
        WHOAMI: 'api/auth/whoami',
        UPDATE_PROFILE: 'api/auth/update-profile',
    },
    BLOGS: {
        CREATE: 'api/blogs',
        GET_ALL: 'api/blogs',
        GET_ONE: (id: string) => `api/blogs/${id}`,
        UPDATE: (id: string) => `api/blogs/${id}`,
        DELETE: (id: string) => `api/blogs/${id}`,
    },
    BOOKS: {
        CREATE: 'api/books',
        GET_ALL: 'api/books',
        GET_ONE: (id: string) => `api/books/${id}`,
        UPDATE: (id: string) => `api/books/${id}`,
        DELETE: (id: string) => `api/books/${id}`,
    },
    BOOKINGS: {
        CREATE: 'api/bookings',
        GET_ALL: 'api/bookings',
        GET_ONE: (id: string) => `api/bookings/${id}`,
        UPDATE: (id: string) => `api/bookings/${id}`,
        DELETE: (id: string) => `api/bookings/${id}`,
        GET_MY_BOOKINGS: 'api/bookings',
        UPDATE_STATUS: (id: string) => `api/bookings/${id}/status`,
        GET_STATUS: (id: string) => `api/bookings/${id}/status`,
    },
    SERVICES: {
        CREATE: 'api/services',
        GET_ALL: 'api/services',
        GET_ONE: (id: string) => `api/services/${id}`,
        UPDATE: (id: string) => `api/services/${id}`,
        DELETE: (id: string) => `api/services/${id}`,
        GET_BY_CATEGORY: (category: string) => `api/services/category/${category}`,
        SEARCH: 'api/services/search',
        GET_BOOKINGS: (id: string) => `api/services/${id}/bookings`,
    },
    GALLERY: {
        GET_ALL: 'api/gallery',
        GET_ONE: (id: string) => `api/gallery/${id}`,
        CREATE: 'api/gallery',
        UPDATE: (id: string) => `api/gallery/${id}`,
        DELETE: (id: string) => `api/gallery/${id}`,
        GET_BY_CATEGORY: (category: string) => `api/gallery/category/${category}`,
    },
    FAVORITES: {
        GET_ALL: 'api/favorites',
        CREATE: 'api/favorites',
        GET_ONE: (id: string) => `api/favorites/${id}`,
        UPDATE: (id: string) => `api/favorites/${id}`,
        DELETE: (id: string) => `api/favorites/${id}`,
    },
    ADMIN: {
        DASHBOARD: 'api/admin/dashboard',
        USERS: {
            GET_ALL: 'api/admin',
            GET_ONE: (id: string) => `api/admin/${id}`,
            CREATE: 'api/admin',
            UPDATE: (id: string) => `api/admin/${id}`,
            DELETE: (id: string) => `api/admin/${id}`,
        },
        BLOGS: {
            GET_ALL: 'api/admin/blogs',
            GET_ONE: (id: string) => `api/admin/blogs/${id}`,
            CREATE: 'api/admin/blogs',
            UPDATE: (id: string) => `api/admin/blogs/${id}`,
            DELETE: (id: string) => `api/admin/blogs/${id}`,
        }
    }
}