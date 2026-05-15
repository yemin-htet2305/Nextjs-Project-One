const ROUTES = {
    HOME : '/',
    TAGS: '/tags',
    QUESTIONS: '/question',
    QUESTION_CREATE: '/question/create',
    QUESTION_EDIT: (id: string) => `/question/${id}/edit`,
    LOGIN: '/login',
    REGISTER : '/register',
    DETAIL: (id: string) => `/question/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    COMMUNITY: '/community',
    BOOKMARK: '/bookmarks',
    PROFILE: (id: string) => `/profile/${id}`,
    PROFILE_EDIT: (id: string) => `/profile/${id}/edit`,
    TECH_NEWS: '/tech-news',
}

export default ROUTES;