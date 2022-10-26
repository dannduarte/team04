import { createRouter, createWebHashHistory} from "vue-router";
import HomeWelcome from "@/components/HomeWelcome";
import LoginAccount from "@/components/Auth/LoginAccount";
import RegisterAccount from "@/components/Auth/RegisterAccount";

const routes = [
    {
        path: '/', name: 'Home', component: HomeWelcome
    },
    {
        path: '/login', component: LoginAccount
    },
    {
        path: '/register', component: RegisterAccount
    },
]

const index = createRouter({
    history: createWebHashHistory(),
    routes
})

export default index
