import { createRouter, createWebHashHistory} from "vue-router";
import HomeWelcome from "@/components/HomeWelcome";
import GameOverview from "@/components/Games/GameOverview";

const routes = [
    {
        path: '/', name: 'Home', component: HomeWelcome
    },
    {
        path: '/game', name: 'Game overview', component: GameOverview
    },
]

const index = createRouter({
    history: createWebHashHistory(),
    routes
})

export default index
