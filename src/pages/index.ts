import {Routes} from "@angular/router";

export * from './jobs/index.module';

export function panelRoutes() {
  return [
    {path: 'jobs', loadChildren: () => import('./jobs/index.module').then(x => x.PageJobModule)}
  ] as Routes;
}
