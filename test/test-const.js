// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

"use strict"

var assert = require("assert"),
    compile = require("./compile.js").compile,
    path = require("path"),
    buildAddon = require("./addon-builder.js").buildAddon,
    testNoConstructor = require("./constructor.js").testNoConstructor,
    testConstAttribute = require("./property.js").testConstAttribute,
    spawn = require('child_process').spawn;

var Util;

describe('widl-nan Unit Test - const attributes', function () {
  it('Generating binding C++ code', function () {
    return compile('test/const/const.widl', 'test/const/gen');
  });

  it('Building addon', function () {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/const');
  });

  it('Loading addon', function () {
    var addonDir = path.join(path.dirname(__filename), 'const');
    var addon = require('bindings')(
        {'bindings': 'testerAddon', 'module_root': addonDir});
    // TODO: Detect errors

    Util = addon.Util;
    assert.equal(typeof Util, 'function');
  });

  it('const attributes', done => {
    testConstAttribute(Util, 'DEBUG', false);
    testConstAttribute(Util, 'LF', 10);
    testConstAttribute(Util, 'BIT_MASK', 0x0000fc00);
    testConstAttribute(Util, 'AVOGADRO', 6.875e1);
    done();
  });

});