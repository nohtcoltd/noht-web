function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      }
    } }
  }
  return Object.freeze(n);
}

var pages = {};

var ids = pages.ids = [1];
var modules = pages.modules = {

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@nuxt/bridge/node_modules/unplugin/dist/webpack/loaders/transform.js??ref--34-0!./node_modules/@nuxt/bridge/node_modules/unplugin/dist/webpack/loaders/transform.js??ref--36-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/unplugin/dist/webpack/loaders/transform.js??ref--14-0!./node_modules/@nuxt/bridge/node_modules/unplugin/dist/webpack/loaders/transform.js??ref--35-0!./pages/index.vue?vue&type=template&id=d4262c8e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"w-full fl-col-wrap h-screen bg-slate-50 text-sm"},[_vm._ssrNode("\n  HELLO\n")])};
var staticRenderFns = [];


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=d4262c8e&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(5);

// CONCATENATED MODULE: ./pages/index.vue

var script = {};


/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "eb60dda0"
  
);

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

};

const index = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  'default': pages,
  ids: ids,
  modules: modules
}, [pages]);

export { index as i };
