import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculadoraRoutes } from "./calculadora/calculadora-routing.module";
import { ConversorMoedasRoutes } from "./conversor/conversor-moedas-routing.module";
import { DashboardRoutes } from "./dashboard/dashboard-routing.module";
import { JogoDaVelhaRoutes } from "./jogo-da-velha/jogo-da-velha-routing.module";
import { TarefasRoutes } from "./tarefas/tarefas-routing.module";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    ...DashboardRoutes,
    ...CalculadoraRoutes,
    ...ConversorMoedasRoutes,
    ...TarefasRoutes,
    ...JogoDaVelhaRoutes
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}