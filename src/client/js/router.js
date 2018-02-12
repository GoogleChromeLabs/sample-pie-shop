const _modules = {
  category: () => import('./category.js'),
  index: () => import('./index.js'),
  listing: () => import('./listing.js'),
  product: () => import('./product.js'),
  search: () => import('./search.js'),
};

export default class Router {
  static get modules() {
    return _modules;
  }
}
