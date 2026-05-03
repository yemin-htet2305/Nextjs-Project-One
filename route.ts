const ROUTES = {
    HOME : '/',
    TAGS: '/tags',
    QUESTIONS: '/question',
    QUESTION_CREATE: '/question/create',
    LOGIN: '/login',
    REGISTER : '/register',
    DETAIL: (id: string) => `/question/${id}`,
}

export default ROUTES;