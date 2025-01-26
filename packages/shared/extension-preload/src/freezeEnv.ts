export const freezeEnv = () => {
  // const freezeObject = (obj: object) => {
  //   if (typeof obj != 'object') return
  //   Object.freeze(obj)
  //   for (const subObj of Object.values(obj)) freezeObject(subObj)
  // }
  // freezeObject(globalThis.lx)
  // const _toString = Function.prototype.toString
  // // eslint-disable-next-line no-extend-native
  // Function.prototype.toString = function() {
  //   return Object.getOwnPropertyDescriptors(this).name.configurable
  //     ? _toString.apply(this)
  //     : `function ${this.name}() { [native code] }`
  // }
  // // eslint-disable-next-line no-eval
  // globalThis.eval = function() {
  //   throw new Error('eval is not available')
  // }
  // globalThis.Function = function() {
  //   throw new Error('Function is not available')
  // }
  // const excludes = [
  //   Function.prototype.toString,
  //   Function.prototype.toLocaleString,
  //   Object.prototype.toString,
  // ]
  // const freezeObjectProperty = (obj, freezedObj = new Set()) => {
  //   if (obj == null) return
  //   switch (typeof obj) {
  //     case 'object':
  //     case 'function':
  //       if (freezedObj.has(obj)) return
  //       // Object.freeze(obj)
  //       freezedObj.add(obj)
  //       for (const [name, { ...config }] of Object.entries(Object.getOwnPropertyDescriptors(obj))) {
  //         if (!excludes.includes(config.value)) {
  //           if (config.writable) config.writable = false
  //           if (config.configurable) config.configurable = false
  //           Object.defineProperty(obj, name, config)
  //         }
  //         freezeObjectProperty(config.value, freezedObj)
  //       }
  //   }
  // }
  // freezeObjectProperty(globalThis)
}
