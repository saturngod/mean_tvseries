import { EditSeriesFormComponent } from "./edit-series-form/edit-series-form.component";
import { EditEpisodesFormComponent } from "./edit-episode-form/edit-episode-form.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { SearchComponent } from "./search/search.component";
import { SeriesComponent } from "./series/series.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const Router = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "page/:pageNo",
        component: HomeComponent,
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "series/:seriesId",
        component: SeriesComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "series/:seriesId/edit",
        component: EditSeriesFormComponent
    },
    {
        path: "series/:seriesId/season/:seasonIndex/episode/:episodeIndex/edit",
        component: EditEpisodesFormComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];
