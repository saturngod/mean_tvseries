import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { SeriesComponent } from "./series/series.component";

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
    }
];
