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

// Precache static assets.
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Cache at runtime: partial navigation routes (fragments).
const offlineNavigationResponse = `It seems you don't have
  internet access at the moment.
  Please try again later.`;
// TODO: Figure out why it's not working with NetworkFirst?
const fragmentHandler = workbox.strategies.networkOnly();
// Custom response handler.
function fragmentFallbackStrategy({event, url}) {
  return fragmentHandler.handle({event})
    .catch(() => {
      return new Response(offlineNavigationResponse);
    });
}
workbox.routing.registerRoute(
  new RegExp('\/(.+)?fragment=true'),
  fragmentFallbackStrategy
);

// Cache at runtime: category and product urls.
// POI: we cache the same content twice - in full urls and in partials.
workbox.routing.registerRoute(
  new RegExp('\/([A-Za-z\+]+)$'),
  workbox.strategies.networkFirst()
);

// Cache at runtime: images from Cloudinary.
workbox.routing.registerRoute(
  new RegExp('https\:\/\/res\.cloudinary\.com\/pieshop\/.*'),
  workbox.strategies.networkFirst(),
);
