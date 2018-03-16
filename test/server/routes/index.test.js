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

import {expect} from 'chai';
import request from 'supertest';
import mockery from 'mockery';
import fbMock from '../../mocks/firebase-mock';

describe('/', () => {
  before(() => {
    mockery.enable({
      warnOnUnregistered: false
    });
    mockery.registerMock('firebase-admin', fbMock);
  });

  it('should return a valid response', (done) => {
    import('../../../src/server/app.js').then(app => {
      request(app.default)
        .get('/')
        .end((error, resp) => {
          expect(resp.status).to.equal(200);
          done();
        });
    });
  });
});
