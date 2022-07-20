/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare const versions: {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};
