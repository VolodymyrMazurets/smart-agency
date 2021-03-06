// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/http/urls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urls = void 0;
const BASE_URL = 'https://fakestoreapi.com';
const urls = {
  products: `${BASE_URL}/products`,
  carts: `${BASE_URL}/carts`,
  users: `${BASE_URL}/users`
};
exports.urls = urls;
},{}],"js/helpers/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItem = void 0;

const getItem = id => {
  return document.getElementById(id);
};

exports.getItem = getItem;
},{}],"js/helpers/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderProductsList = exports.renderUsersList = void 0;

const renderUsersList = data => {
  const result = data.map(item => {
    return `<li class="uk-card uk-card-default uk-card-body">
          <img src="https://robohash.org/honey?set=set${item.id}" alt="user" width="80px" height="80px"/>
          <h3 class="uk-card-title">${item.name.firstname} ${item.name.lastname}</h3>
          <p>${item.email}</p>
        </li>`;
  });
  return result;
};

exports.renderUsersList = renderUsersList;

const renderProductsList = data => {
  const result = data.map(item => {
    return ` <li class="uk-card uk-card-default products__item">
              <div class="uk-card-media-top products__card-head">
                <img src="${item.image}" alt="user" />
              </div>
              <div class="uk-card-body">
                <h3 class="uk-card-title">${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </li>`;
  });
  return result;
};

exports.renderProductsList = renderProductsList;
},{}],"js/helpers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require("./helpers");

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _helpers[key];
    }
  });
});

var _render = require("./render");

Object.keys(_render).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _render[key];
    }
  });
});
},{"./helpers":"js/helpers/helpers.js","./render":"js/helpers/render.js"}],"js/http/fetchs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProducts = exports.fetchUsers = void 0;

var _urls = require("./urls");

var _helpers = require("../helpers");

const fetchUsers = async () => {
  try {
    loader.classList.add('active');
    const usersTest = await fetch(_urls.urls.users).then(res => res.json());
    users.innerHTML = (0, _helpers.renderUsersList)(usersTest).join('');
    loader.classList.remove('active');
  } catch (e) {
    UIkit.notification({
      message: e,
      status: 'danger',
      pos: 'top-right',
      timeout: 3000
    });
  }
};

exports.fetchUsers = fetchUsers;

const fetchProducts = async () => {
  try {
    const data = await fetch(_urls.urls.products).then(res => res.json());
    products.innerHTML = (0, _helpers.renderProductsList)(data).join('');
  } catch (e) {
    UIkit.notification({
      message: e,
      status: 'danger',
      pos: 'top-right',
      timeout: 3000
    });
  }
};

exports.fetchProducts = fetchProducts;
},{"./urls":"js/http/urls.js","../helpers":"js/helpers/index.js"}],"js/http/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchs = require("./fetchs");

Object.keys(_fetchs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fetchs[key];
    }
  });
});

var _urls = require("./urls");

Object.keys(_urls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _urls[key];
    }
  });
});
},{"./fetchs":"js/http/fetchs.js","./urls":"js/http/urls.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _http = require("./http");

var _helpers = require("./helpers");

const users = (0, _helpers.getItem)('users');
const showUsers = (0, _helpers.getItem)('show-users');
const modal = (0, _helpers.getItem)('modal');
const loader = (0, _helpers.getItem)('loader');
const products = (0, _helpers.getItem)('products');

showUsers.onclick = async () => {
  users.innerHTML = '';
  UIkit.modal(modal).show();
  await (0, _http.fetchUsers)();
};

document.addEventListener('DOMContentLoaded', () => {
  (0, _http.fetchProducts)();
}); // const shoppingList = [
//   {
//     name: 'bread',
//     count: 2,
//     isBought: true,
//   },
//   {
//     name: 'butter',
//     count: 1,
//     isBought: true,
//   },
//   {
//     name: 'milk',
//     count: 3,
//     isBought: false,
//   },
//   {
//     name: 'egg',
//     count: 6,
//     isBought: false,
//   },
//   {
//     name: 'tomato',
//     count: 8,
//     isBought: false,
//   },
//   {
//     name: 'sauce',
//     count: 1,
//     isBought: true,
//   },
// ];
// const addBuyingProduct = (name, arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     if (name === arr[i].name) {
//       arr[i].isBought = true;
//     }
//   }
//   return arr;
// };
// const addPurchasedProduct = (arr = [], name='') => {
//   let res = [...arr];
//   const idx = arr.findIndex((item) => item.name === name);
//   const element = arr.find((item) => item.name === name);
//   element.isBought = true;
//   res.splice(idx, 1, element);
//   return res;
// };
// console.log(addPurchasedProduct(shoppingList, 'tomato'));
},{"./http":"js/http/index.js","./helpers":"js/helpers/index.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55881" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map