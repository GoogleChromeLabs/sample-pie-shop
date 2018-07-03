/**
 *
 *  Online store PWA sample.
 *  Copyright 2017 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
import pageInit from './page-init';

/**
 * Router for smooth page tranistions.
 * Usage:
 * const router = new Router();
 * router.enable();
 * It works as a progressive enhancement by hijacking the links
 * and popstate events. To enable page transitions call enable()
 * on instance of a Router.
 */
class Router {
  constructor() {
    this._bindHandlers();
    this._hostname = location.host;
    this._enabled = false;
  }

  enable() {
    if (!this._enabled) {
      document.addEventListener('click', this._onLinkClick);
      window.addEventListener('popstate', this._onPopState);
      this._enabled = true;
    }
  }

  _bindHandlers() {
    this._onLinkClick = this._onLinkClick.bind(this);
    this._onPopState = this._onPopState.bind(this);
  }

  _getParentByTagName(node, tagname) {
    let parent;
    if (node === null || tagname === '') return;
    parent = node.parentNode;
    tagname = tagname.toUpperCase();

    while (parent.tagName !== 'HTML') {
      if (parent.tagName === tagname) {
        return parent;
      }
      parent = parent.parentNode;
    }
    return parent;
  }

  _onPopState(event) {
    this.navigate(new URL(location.href), event.state.scrollTop, false);
  }

  async _onLinkClick(event) {
    let target = event.target;

    if (target.tagName !== 'A') {
      target = this._getParentByTagName(target, 'A');
      if (!target) return;
    }
    // If no href, just let the click pass through.
    if (!target.href) {
      return;
    }
    const link = new URL(target.href);
    // If it’s an external link, just navigate.
    if (link.host !== this._hostname) {
      return;
    }

    event.preventDefault();
    this.navigate(link)
      .catch((err) => console.error(err.stack));
  }

  static get TRANSITION_DURATION() {
    return '0.3s';
  }

  async _animateOut(oldView) {
    oldView.style.transition = `opacity ${Router.TRANSITION_DURATION} linear`;
    oldView.style.opacity = '0';
    return transitionEndPromise(oldView);
  }

  async _animateIn(newView) {
    newView.style.opacity = '0';
    await requestAnimationFramePromise();
    await requestAnimationFramePromise();
    newView.style.transition = `opacity ${Router.TRANSITION_DURATION} linear`;
    newView.style.opacity = '1';
    await transitionEndPromise(newView);
  }

  async _loadFragment(link) {
    const newView = document.createElement('div');
    newView.setAttribute('id', 'main-view');
    link.searchParams.append('fragment', true);
    const fragmentURL = link.toString();
    const load = async function() {
      let fragment;
      try {
        fragment = await fetch(fragmentURL, {credentials: 'include'}).then((resp) => resp.text());
      } catch (e) {
        fragment = 'This content is not available.';
      }
      return fragment;
    };
    newView.innerHTML = await load();
    return newView;
  }

  async navigate(link, scrollTop = 0, pushState = true) {
    // Manually handle the scroll restoration.
    history.scrollRestoration = 'manual';

    if (pushState) {
      history.replaceState({scrollTop: document.scrollingElement.scrollTop}, '');
      history.pushState({scrollTop}, '', link.toString());
    }
    const oldView = document.querySelector('#main-view');
    const viewAnimation = this._animateOut(oldView);
    const newView = await this._loadFragment(link);
    await viewAnimation;
    oldView.parentNode.replaceChild(newView, oldView);
    document.scrollingElement.scrollTop = scrollTop;
    // Set to auto in case user hits page refresh.
    history.scrollRestoration = 'auto';
    await this._animateIn(newView);

    pageInit();
  }

  loadCurrentRoute() {
    this.navigate(new URL(location.href), document.body.scrollTop, false);
  }
}

function transitionEndPromise(element) {
  return new Promise((resolve) => {
    element.addEventListener('transitionend', function f() {
      element.removeEventListener('transitionend', f);
      resolve();
    });
  });
}

function requestAnimationFramePromise() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

const instance = new Router();

export {Router, instance};
