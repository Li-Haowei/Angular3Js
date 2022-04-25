import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceneComponent } from './scene/scene.component';
import { ModelComponent } from './model/model.component';

const routes: Routes = [
  {
    path: "",
    component: SceneComponent, children: [], outlet:'scene'
  },
  {
    path: "model",
    component: ModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
