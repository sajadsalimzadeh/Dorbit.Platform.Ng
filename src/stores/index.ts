import {Store, Themes} from "@framework";


interface Panel {
  theme: Themes;
}

export const panelStore = new Store<Panel>('panel', {theme: 'default-dark'});
panelStore.load()

panelStore.on('theme').subscribe(e => {
  document.documentElement.setAttribute('theme', e.theme)
})
