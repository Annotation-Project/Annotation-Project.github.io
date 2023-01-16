const BASE_URL = 'http://localhost:8000';

const API = {
    signup: BASE_URL.concat('/auth/signup'),
    login: BASE_URL.concat('/auth/login'),
    tokenLogin: BASE_URL.concat('/auth/token-login'),

    allProjects: BASE_URL.concat('/projects/all'),
    addProject: BASE_URL.concat('/projects/add'),
    getProject: BASE_URL.concat('/projects/'),
    updateProject: BASE_URL.concat('/projects/update/'),
    deleteProject: BASE_URL.concat('/projects/delete'),
}

export default API