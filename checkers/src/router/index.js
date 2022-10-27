import { createRouter, createWebHashHistory} from "vue-router";
import HomeWelcome from "@/components/HomeWelcome";
import LoginAccount from "@/components/Auth/LoginAccount";
import RegisterAccount from "@/components/Auth/RegisterAccount";
import CheckerBoard from "@/components/board/checkerBoard";

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
    {
        path: '/board', name: 'Checkerboard', component: CheckerBoard
    }
]

const index = createRouter({
    history: createWebHashHistory(),
    routes
})

export default index
