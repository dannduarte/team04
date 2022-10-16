import { createRouter, createWebHashHistory} from "vue-router";
import HomeWelcome from "@/components/HomeWelcome";
import GameOverview from "@/components/Games/GameOverview";
import CheckerBoard from "@/components/board/checkerBoard";

const routes = [
    {
        path: '/', name: 'Home', component: HomeWelcome
    },
    {
        path: '/game', name: 'Game overview', component: GameOverview
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
