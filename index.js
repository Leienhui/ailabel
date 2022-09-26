(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AILabel = factory());
})(this, (function () { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  }(runtime));

  var regenerator = runtime.exports;

  var events$1 = {exports: {}};

  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };

  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target)
        .concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  events$1.exports = EventEmitter;
  events$1.exports.once = once;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;

  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }

  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
      defaultMaxListeners = arg;
    }
  });

  EventEmitter.init = function() {

    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
  };

  function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = (type === 'error');

    var events = this._events;
    if (events !== undefined)
      doError = (doError && events.error === undefined);
    else if (!doError)
      return false;

    // If there is no 'error' event listener then throw.
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];

    if (handler === undefined)
      return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    checkListener(listener);

    events = target._events;
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
        // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }

      // Check for listener leak
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + String(type) + ' listeners ' +
                            'added. Use emitter.setMaxListeners() to ' +
                            'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        checkListener(listener);

        events = this._events;
        if (events === undefined)
          return this;

        list = events[type];
        if (list === undefined)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener !== undefined)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (events === undefined)
          return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

  function _listeners(target, type, unwrap) {
    var events = target._events;

    if (events === undefined)
      return [];

    var evlistener = events[type];
    if (evlistener === undefined)
      return [];

    if (typeof evlistener === 'function')
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];

    return unwrap ?
      unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  function once(emitter, name) {
    return new Promise(function (resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }

      function resolver() {
        if (typeof emitter.removeListener === 'function') {
          emitter.removeListener('error', errorListener);
        }
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== 'error') {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }

  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
      eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
  }

  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === 'function') {
      // EventTarget does not have `error` event semantics like Node
      // EventEmitters, we do not listen for `error` events here.
      emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }

  var events = events$1.exports;

  /*!
   * hotkeys-js v3.8.7
   * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
   * 
   * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
   * http://jaywcjlove.github.io/hotkeys
   * 
   * Licensed under the MIT license.
   */

  var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

  function addEvent(object, event, method) {
    if (object.addEventListener) {
      object.addEventListener(event, method, false);
    } else if (object.attachEvent) {
      object.attachEvent("on".concat(event), function () {
        method(window.event);
      });
    }
  } // 修饰键转换成对应的键码


  function getMods(modifier, key) {
    var mods = key.slice(0, key.length - 1);

    for (var i = 0; i < mods.length; i++) {
      mods[i] = modifier[mods[i].toLowerCase()];
    }

    return mods;
  } // 处理传的key字符串转换成数组


  function getKeys(key) {
    if (typeof key !== 'string') key = '';
    key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

    var keys = key.split(','); // 同时设置多个快捷键，以','分割

    var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

    for (; index >= 0;) {
      keys[index - 1] += ',';
      keys.splice(index, 1);
      index = keys.lastIndexOf('');
    }

    return keys;
  } // 比较修饰键的数组


  function compareArray(a1, a2) {
    var arr1 = a1.length >= a2.length ? a1 : a2;
    var arr2 = a1.length >= a2.length ? a2 : a1;
    var isIndex = true;

    for (var i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
    }

    return isIndex;
  }

  var _keyMap = {
    backspace: 8,
    tab: 9,
    clear: 12,
    enter: 13,
    return: 13,
    esc: 27,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    delete: 46,
    ins: 45,
    insert: 45,
    home: 36,
    end: 35,
    pageup: 33,
    pagedown: 34,
    capslock: 20,
    num_0: 96,
    num_1: 97,
    num_2: 98,
    num_3: 99,
    num_4: 100,
    num_5: 101,
    num_6: 102,
    num_7: 103,
    num_8: 104,
    num_9: 105,
    num_multiply: 106,
    num_add: 107,
    num_enter: 108,
    num_subtract: 109,
    num_decimal: 110,
    num_divide: 111,
    '⇪': 20,
    ',': 188,
    '.': 190,
    '/': 191,
    '`': 192,
    '-': isff ? 173 : 189,
    '=': isff ? 61 : 187,
    ';': isff ? 59 : 186,
    '\'': 222,
    '[': 219,
    ']': 221,
    '\\': 220
  }; // Modifier Keys

  var _modifier = {
    // shiftKey
    '⇧': 16,
    shift: 16,
    // altKey
    '⌥': 18,
    alt: 18,
    option: 18,
    // ctrlKey
    '⌃': 17,
    ctrl: 17,
    control: 17,
    // metaKey
    '⌘': 91,
    cmd: 91,
    command: 91
  };
  var modifierMap = {
    16: 'shiftKey',
    18: 'altKey',
    17: 'ctrlKey',
    91: 'metaKey',
    shiftKey: 16,
    ctrlKey: 17,
    altKey: 18,
    metaKey: 91
  };
  var _mods = {
    16: false,
    18: false,
    17: false,
    91: false
  };
  var _handlers = {}; // F1~F12 special key

  for (var k = 1; k < 20; k++) {
    _keyMap["f".concat(k)] = 111 + k;
  }

  var _downKeys = []; // 记录摁下的绑定键

  var _scope = 'all'; // 默认热键范围

  var elementHasBindEvent = []; // 已绑定事件的节点记录
  // 返回键码

  var code = function code(x) {
    return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
  }; // 设置获取当前范围（默认为'所有'）


  function setScope(scope) {
    _scope = scope || 'all';
  } // 获取当前范围


  function getScope() {
    return _scope || 'all';
  } // 获取摁下绑定键的键值


  function getPressedKeyCodes() {
    return _downKeys.slice(0);
  } // 表单控件控件判断 返回 Boolean
  // hotkey is effective only when filter return true


  function filter$1(event) {
    var target = event.target || event.srcElement;
    var tagName = target.tagName;
    var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

    if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
      flag = false;
    }

    return flag;
  } // 判断摁下的键是否为某个键，返回true或者false


  function isPressed(keyCode) {
    if (typeof keyCode === 'string') {
      keyCode = code(keyCode); // 转换成键码
    }

    return _downKeys.indexOf(keyCode) !== -1;
  } // 循环删除handlers中的所有 scope(范围)


  function deleteScope(scope, newScope) {
    var handlers;
    var i; // 没有指定scope，获取scope

    if (!scope) scope = getScope();

    for (var key in _handlers) {
      if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
        handlers = _handlers[key];

        for (i = 0; i < handlers.length;) {
          if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
        }
      }
    } // 如果scope被删除，将scope重置为all


    if (getScope() === scope) setScope(newScope || 'all');
  } // 清除修饰键


  function clearModifier(event) {
    var key = event.keyCode || event.which || event.charCode;

    var i = _downKeys.indexOf(key); // 从列表中清除按压过的键


    if (i >= 0) {
      _downKeys.splice(i, 1);
    } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


    if (event.key && event.key.toLowerCase() === 'meta') {
      _downKeys.splice(0, _downKeys.length);
    } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


    if (key === 93 || key === 224) key = 91;

    if (key in _mods) {
      _mods[key] = false; // 将修饰键重置为false

      for (var k in _modifier) {
        if (_modifier[k] === key) hotkeys[k] = false;
      }
    }
  }

  function unbind(keysInfo) {
    // unbind(), unbind all keys
    if (!keysInfo) {
      Object.keys(_handlers).forEach(function (key) {
        return delete _handlers[key];
      });
    } else if (Array.isArray(keysInfo)) {
      // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
      keysInfo.forEach(function (info) {
        if (info.key) eachUnbind(info);
      });
    } else if (typeof keysInfo === 'object') {
      // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
      if (keysInfo.key) eachUnbind(keysInfo);
    } else if (typeof keysInfo === 'string') {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // support old method
      // eslint-disable-line
      var scope = args[0],
          method = args[1];

      if (typeof scope === 'function') {
        method = scope;
        scope = '';
      }

      eachUnbind({
        key: keysInfo,
        scope: scope,
        method: method,
        splitKey: '+'
      });
    }
  } // 解除绑定某个范围的快捷键


  var eachUnbind = function eachUnbind(_ref) {
    var key = _ref.key,
        scope = _ref.scope,
        method = _ref.method,
        _ref$splitKey = _ref.splitKey,
        splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
    var multipleKeys = getKeys(key);
    multipleKeys.forEach(function (originKey) {
      var unbindKeys = originKey.split(splitKey);
      var len = unbindKeys.length;
      var lastKey = unbindKeys[len - 1];
      var keyCode = lastKey === '*' ? '*' : code(lastKey);
      if (!_handlers[keyCode]) return; // 判断是否传入范围，没有就获取范围

      if (!scope) scope = getScope();
      var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
      _handlers[keyCode] = _handlers[keyCode].map(function (record) {
        // 通过函数判断，是否解除绑定，函数相等直接返回
        var isMatchingMethod = method ? record.method === method : true;

        if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
          return {};
        }

        return record;
      });
    });
  }; // 对监听对应快捷键的回调函数进行处理


  function eventHandler(event, handler, scope) {
    var modifiersMatch; // 看它是否在当前范围

    if (handler.scope === scope || handler.scope === 'all') {
      // 检查是否匹配修饰符（如果有返回true）
      modifiersMatch = handler.mods.length > 0;

      for (var y in _mods) {
        if (Object.prototype.hasOwnProperty.call(_mods, y)) {
          if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
            modifiersMatch = false;
          }
        }
      } // 调用处理程序，如果是修饰键不做处理


      if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
        if (handler.method(event, handler) === false) {
          if (event.preventDefault) event.preventDefault();else event.returnValue = false;
          if (event.stopPropagation) event.stopPropagation();
          if (event.cancelBubble) event.cancelBubble = true;
        }
      }
    }
  } // 处理keydown事件


  function dispatch(event) {
    var asterisk = _handlers['*'];
    var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

    if (!hotkeys.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
    // Webkit左右 command 键值不一样

    if (key === 93 || key === 224) key = 91;
    /**
     * Collect bound keys
     * If an Input Method Editor is processing key input and the event is keydown, return 229.
     * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
     * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
     */

    if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
    /**
     * Jest test cases are required.
     * ===============================
     */

    ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
      var keyNum = modifierMap[keyName];

      if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
        _downKeys.push(keyNum);
      } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
        _downKeys.splice(_downKeys.indexOf(keyNum), 1);
      } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {
        /**
         * Fix if Command is pressed:
         * ===============================
         */
        if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
          _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
        }
      }
    });
    /**
     * -------------------------------
     */

    if (key in _mods) {
      _mods[key] = true; // 将特殊字符的key注册到 hotkeys 上

      for (var k in _modifier) {
        if (_modifier[k] === key) hotkeys[k] = true;
      }

      if (!asterisk) return;
    } // 将 modifierMap 里面的修饰键绑定到 event 中


    for (var e in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, e)) {
        _mods[e] = event[modifierMap[e]];
      }
    }
    /**
     * https://github.com/jaywcjlove/hotkeys/pull/129
     * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
     * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
     * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
     */


    if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
      if (_downKeys.indexOf(17) === -1) {
        _downKeys.push(17);
      }

      if (_downKeys.indexOf(18) === -1) {
        _downKeys.push(18);
      }

      _mods[17] = true;
      _mods[18] = true;
    } // 获取范围 默认为 `all`


    var scope = getScope(); // 对任何快捷键都需要做的处理

    if (asterisk) {
      for (var i = 0; i < asterisk.length; i++) {
        if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
          eventHandler(event, asterisk[i], scope);
        }
      }
    } // key 不在 _handlers 中返回


    if (!(key in _handlers)) return;

    for (var _i = 0; _i < _handlers[key].length; _i++) {
      if (event.type === 'keydown' && _handlers[key][_i].keydown || event.type === 'keyup' && _handlers[key][_i].keyup) {
        if (_handlers[key][_i].key) {
          var record = _handlers[key][_i];
          var splitKey = record.splitKey;
          var keyShortcut = record.key.split(splitKey);
          var _downKeysCurrent = []; // 记录当前按键键值

          for (var a = 0; a < keyShortcut.length; a++) {
            _downKeysCurrent.push(code(keyShortcut[a]));
          }

          if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
            // 找到处理内容
            eventHandler(event, record, scope);
          }
        }
      }
    }
  } // 判断 element 是否已经绑定事件


  function isElementBind(element) {
    return elementHasBindEvent.indexOf(element) > -1;
  }

  function hotkeys(key, option, method) {
    _downKeys = [];
    var keys = getKeys(key); // 需要处理的快捷键列表

    var mods = [];
    var scope = 'all'; // scope默认为all，所有范围都有效

    var element = document; // 快捷键事件绑定节点

    var i = 0;
    var keyup = false;
    var keydown = true;
    var splitKey = '+'; // 对为设定范围的判断

    if (method === undefined && typeof option === 'function') {
      method = option;
    }

    if (Object.prototype.toString.call(option) === '[object Object]') {
      if (option.scope) scope = option.scope; // eslint-disable-line

      if (option.element) element = option.element; // eslint-disable-line

      if (option.keyup) keyup = option.keyup; // eslint-disable-line

      if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

      if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
    }

    if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

    for (; i < keys.length; i++) {
      key = keys[i].split(splitKey); // 按键列表

      mods = []; // 如果是组合快捷键取得组合快捷键

      if (key.length > 1) mods = getMods(_modifier, key); // 将非修饰键转化为键码

      key = key[key.length - 1];
      key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
      // 判断key是否在_handlers中，不在就赋一个空数组

      if (!(key in _handlers)) _handlers[key] = [];

      _handlers[key].push({
        keyup: keyup,
        keydown: keydown,
        scope: scope,
        mods: mods,
        shortcut: keys[i],
        method: method,
        key: keys[i],
        splitKey: splitKey
      });
    } // 在全局document上设置快捷键


    if (typeof element !== 'undefined' && !isElementBind(element) && window) {
      elementHasBindEvent.push(element);
      addEvent(element, 'keydown', function (e) {
        dispatch(e);
      });
      addEvent(window, 'focus', function () {
        _downKeys = [];
      });
      addEvent(element, 'keyup', function (e) {
        dispatch(e);
        clearModifier(e);
      });
    }
  }

  var _api = {
    setScope: setScope,
    getScope: getScope,
    deleteScope: deleteScope,
    getPressedKeyCodes: getPressedKeyCodes,
    isPressed: isPressed,
    filter: filter$1,
    unbind: unbind
  };

  for (var a in _api) {
    if (Object.prototype.hasOwnProperty.call(_api, a)) {
      hotkeys[a] = _api[a];
    }
  }

  if (typeof window !== 'undefined') {
    var _hotkeys = window.hotkeys;

    hotkeys.noConflict = function (deep) {
      if (deep && window.hotkeys === hotkeys) {
        window.hotkeys = _hotkeys;
      }

      return hotkeys;
    };

    window.hotkeys = hotkeys;
  }

  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal$1;

  var freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$8 = freeGlobal || freeSelf || Function('return this')();

  var _root = root$8;

  var root$7 = _root;

  /** Built-in value references. */
  var Symbol$6 = root$7.Symbol;

  var _Symbol = Symbol$6;

  var Symbol$5 = _Symbol;

  /** Used for built-in method references. */
  var objectProto$f = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$f.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$f.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag$1;

  /** Used for built-in method references. */

  var objectProto$e = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$e.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString$1;

  var Symbol$4 = _Symbol,
      getRawTag = _getRawTag,
      objectToString = _objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$8(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  var _baseGetTag = baseGetTag$8;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */

  function isObject$8(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject$8;

  var baseGetTag$7 = _baseGetTag,
      isObject$7 = isObject_1;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction$2(value) {
    if (!isObject$7(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag$7(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction$2;

  var root$6 = _root;

  /** Used to detect overreaching core-js shims. */
  var coreJsData$1 = root$6['__core-js_shared__'];

  var _coreJsData = coreJsData$1;

  var coreJsData = _coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked$1(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked$1;

  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource$2(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource$2;

  var isFunction$1 = isFunction_1,
      isMasked = _isMasked,
      isObject$6 = isObject_1,
      toSource$1 = _toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$d = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative$1(value) {
    if (!isObject$6(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource$1(value));
  }

  var _baseIsNative = baseIsNative$1;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */

  function getValue$1(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue$1;

  var baseIsNative = _baseIsNative,
      getValue = _getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative$7(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative$7;

  var getNative$6 = _getNative;

  var defineProperty$2 = (function() {
    try {
      var func = getNative$6(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty$2;

  var defineProperty$1 = _defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue$2(object, key, value) {
    if (key == '__proto__' && defineProperty$1) {
      defineProperty$1(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue$2;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */

  function eq$4(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq$4;

  var baseAssignValue$1 = _baseAssignValue,
      eq$3 = eq_1;

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue$3(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$a.call(object, key) && eq$3(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue$1(object, key, value);
    }
  }

  var _assignValue = assignValue$3;

  var assignValue$2 = _assignValue,
      baseAssignValue = _baseAssignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject$5(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue$2(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject$5;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */

  function identity$4(value) {
    return value;
  }

  var identity_1 = identity$4;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */

  function apply$1(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply$1;

  var apply = _apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$2 = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest$1(func, start, transform) {
    start = nativeMax$2(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax$2(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest$1;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */

  function constant$1(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant$1;

  var constant = constant_1,
      defineProperty = _defineProperty,
      identity$3 = identity_1;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString$1 = !defineProperty ? identity$3 : function(func, string) {
    return defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString$1;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */

  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut$1(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut$1;

  var baseSetToString = _baseSetToString,
      shortOut = _shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString$1 = shortOut(baseSetToString);

  var _setToString = setToString$1;

  var identity$2 = identity_1,
      overRest = _overRest,
      setToString = _setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest$1(func, start) {
    return setToString(overRest(func, start, identity$2), func + '');
  }

  var _baseRest = baseRest$1;

  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength$3(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength$3;

  var isFunction = isFunction_1,
      isLength$2 = isLength_1;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike$8(value) {
    return value != null && isLength$2(value.length) && !isFunction(value);
  }

  var isArrayLike_1 = isArrayLike$8;

  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex$3(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex$3;

  var eq$2 = eq_1,
      isArrayLike$7 = isArrayLike_1,
      isIndex$2 = _isIndex,
      isObject$5 = isObject_1;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall$1(value, index, object) {
    if (!isObject$5(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike$7(object) && isIndex$2(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq$2(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall$1;

  var baseRest = _baseRest,
      isIterateeCall = _isIterateeCall;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner$1(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner$1;

  /** Used for built-in method references. */

  var objectProto$b = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype$4(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$b;

    return value === proto;
  }

  var _isPrototype = isPrototype$4;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */

  function baseTimes$1(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes$1;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */

  function isObjectLike$a(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike$a;

  var baseGetTag$6 = _baseGetTag,
      isObjectLike$9 = isObjectLike_1;

  /** `Object#toString` result references. */
  var argsTag$3 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments$1(value) {
    return isObjectLike$9(value) && baseGetTag$6(value) == argsTag$3;
  }

  var _baseIsArguments = baseIsArguments$1;

  var baseIsArguments = _baseIsArguments,
      isObjectLike$8 = isObjectLike_1;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments$2 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike$8(value) && hasOwnProperty$9.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

  var isArguments_1 = isArguments$2;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */

  var isArray$d = Array.isArray;

  var isArray_1 = isArray$d;

  var isBuffer$3 = {exports: {}};

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */

  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  (function (module, exports) {
  var root = _root,
      stubFalse = stubFalse_1;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  module.exports = isBuffer;
  }(isBuffer$3, isBuffer$3.exports));

  var baseGetTag$5 = _baseGetTag,
      isLength$1 = isLength_1,
      isObjectLike$7 = isObjectLike_1;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$2 = '[object Array]',
      boolTag$4 = '[object Boolean]',
      dateTag$3 = '[object Date]',
      errorTag$2 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$5 = '[object Map]',
      numberTag$4 = '[object Number]',
      objectTag$3 = '[object Object]',
      regexpTag$3 = '[object RegExp]',
      setTag$5 = '[object Set]',
      stringTag$4 = '[object String]',
      weakMapTag$2 = '[object WeakMap]';

  var arrayBufferTag$3 = '[object ArrayBuffer]',
      dataViewTag$4 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
  typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
  typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
  typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
  typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] =
  typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$4] =
  typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] =
  typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$5] = typedArrayTags[numberTag$4] =
  typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] =
  typedArrayTags[setTag$5] = typedArrayTags[stringTag$4] =
  typedArrayTags[weakMapTag$2] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray$1(value) {
    return isObjectLike$7(value) &&
      isLength$1(value.length) && !!typedArrayTags[baseGetTag$5(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray$1;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */

  function baseUnary$3(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary$3;

  var _nodeUtil = {exports: {}};

  (function (module, exports) {
  var freeGlobal = _freeGlobal;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  }(_nodeUtil, _nodeUtil.exports));

  var baseIsTypedArray = _baseIsTypedArray,
      baseUnary$2 = _baseUnary,
      nodeUtil$2 = _nodeUtil.exports;

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray$2 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;

  var isTypedArray_1 = isTypedArray$2;

  var baseTimes = _baseTimes,
      isArguments$1 = isArguments_1,
      isArray$c = isArray_1,
      isBuffer$2 = isBuffer$3.exports,
      isIndex$1 = _isIndex,
      isTypedArray$1 = isTypedArray_1;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys$2(value, inherited) {
    var isArr = isArray$c(value),
        isArg = !isArr && isArguments$1(value),
        isBuff = !isArr && !isArg && isBuffer$2(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$8.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex$1(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys$2;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */

  function overArg$2(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg$2;

  var overArg$1 = _overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys$1 = overArg$1(Object.keys, Object);

  var _nativeKeys = nativeKeys$1;

  var isPrototype$3 = _isPrototype,
      nativeKeys = _nativeKeys;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys$1(object) {
    if (!isPrototype$3(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys$1;

  var arrayLikeKeys$1 = _arrayLikeKeys,
      baseKeys = _baseKeys,
      isArrayLike$6 = isArrayLike_1;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys$8(object) {
    return isArrayLike$6(object) ? arrayLikeKeys$1(object) : baseKeys(object);
  }

  var keys_1 = keys$8;

  var assignValue$1 = _assignValue,
      copyObject$4 = _copyObject,
      createAssigner = _createAssigner,
      isArrayLike$5 = isArrayLike_1,
      isPrototype$2 = _isPrototype,
      keys$7 = keys_1;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Assigns own enumerable string keyed properties of source objects to the
   * destination object. Source objects are applied from left to right.
   * Subsequent sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object` and is loosely based on
   * [`Object.assign`](https://mdn.io/Object/assign).
   *
   * @static
   * @memberOf _
   * @since 0.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assignIn
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * function Bar() {
   *   this.c = 3;
   * }
   *
   * Foo.prototype.b = 2;
   * Bar.prototype.d = 4;
   *
   * _.assign({ 'a': 0 }, new Foo, new Bar);
   * // => { 'a': 1, 'c': 3 }
   */
  var assign = createAssigner(function(object, source) {
    if (isPrototype$2(source) || isArrayLike$5(source)) {
      copyObject$4(source, keys$7(source), object);
      return;
    }
    for (var key in source) {
      if (hasOwnProperty$6.call(source, key)) {
        assignValue$1(object, key, source[key]);
      }
    }
  });

  var assign_1 = assign;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */

  function arrayMap$3(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap$3;

  var baseGetTag$4 = _baseGetTag,
      isObjectLike$6 = isObjectLike_1;

  /** `Object#toString` result references. */
  var symbolTag$3 = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol$4(value) {
    return typeof value == 'symbol' ||
      (isObjectLike$6(value) && baseGetTag$4(value) == symbolTag$3);
  }

  var isSymbol_1 = isSymbol$4;

  var Symbol$3 = _Symbol,
      arrayMap$2 = _arrayMap,
      isArray$b = isArray_1,
      isSymbol$3 = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var INFINITY$3 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$2 = Symbol$3 ? Symbol$3.prototype : undefined,
      symbolToString = symbolProto$2 ? symbolProto$2.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString$1(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray$b(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap$2(value, baseToString$1) + '';
    }
    if (isSymbol$3(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$3) ? '-0' : result;
  }

  var _baseToString = baseToString$1;

  var baseToString = _baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$2(value) {
    return value == null ? '' : baseToString(value);
  }

  var toString_1 = toString$2;

  var toString$1 = toString_1;

  /** Used to generate unique IDs. */
  var idCounter = 0;

  /**
   * Generates a unique ID. If `prefix` is given, the ID is appended to it.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {string} [prefix=''] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter;
    return toString$1(prefix) + id;
  }

  var uniqueId_1 = uniqueId;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */

  function arrayEach$2(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach$2;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */

  function createBaseFor$1(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor$1;

  var createBaseFor = _createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor$1 = createBaseFor();

  var _baseFor = baseFor$1;

  var baseFor = _baseFor,
      keys$6 = keys_1;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn$1(object, iteratee) {
    return object && baseFor(object, iteratee, keys$6);
  }

  var _baseForOwn = baseForOwn$1;

  var isArrayLike$4 = isArrayLike_1;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach$1(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike$4(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var _createBaseEach = createBaseEach$1;

  var baseForOwn = _baseForOwn,
      createBaseEach = _createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach$3 = createBaseEach(baseForOwn);

  var _baseEach = baseEach$3;

  var identity$1 = identity_1;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction$1(value) {
    return typeof value == 'function' ? value : identity$1;
  }

  var _castFunction = castFunction$1;

  var arrayEach$1 = _arrayEach,
      baseEach$2 = _baseEach,
      castFunction = _castFunction,
      isArray$a = isArray_1;

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = isArray$a(collection) ? arrayEach$1 : baseEach$2;
    return func(collection, castFunction(iteratee));
  }

  var forEach_1 = forEach;

  var isArray$9 = isArray_1,
      isSymbol$2 = isSymbol_1;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey$3(value, object) {
    if (isArray$9(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol$2(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  var _isKey = isKey$3;

  var getNative$5 = _getNative;

  /* Built-in method references that are verified to be native. */
  var nativeCreate$4 = getNative$5(Object, 'create');

  var _nativeCreate = nativeCreate$4;

  var nativeCreate$3 = _nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear$1() {
    this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear$1;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function hashDelete$1(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete$1;

  var nativeCreate$2 = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet$1(key) {
    var data = this.__data__;
    if (nativeCreate$2) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? undefined : result;
    }
    return hasOwnProperty$5.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet$1;

  var nativeCreate$1 = _nativeCreate;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas$1(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
  }

  var _hashHas = hashHas$1;

  var nativeCreate = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet$1(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet$1;

  var hashClear = _hashClear,
      hashDelete = _hashDelete,
      hashGet = _hashGet,
      hashHas = _hashHas,
      hashSet = _hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash$1.prototype.clear = hashClear;
  Hash$1.prototype['delete'] = hashDelete;
  Hash$1.prototype.get = hashGet;
  Hash$1.prototype.has = hashHas;
  Hash$1.prototype.set = hashSet;

  var _Hash = Hash$1;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */

  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear$1;

  var eq$1 = eq_1;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf$4(array, key) {
    var length = array.length;
    while (length--) {
      if (eq$1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf$4;

  var assocIndexOf$3 = _assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete$1(key) {
    var data = this.__data__,
        index = assocIndexOf$3(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete$1;

  var assocIndexOf$2 = _assocIndexOf;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet$1(key) {
    var data = this.__data__,
        index = assocIndexOf$2(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet$1;

  var assocIndexOf$1 = _assocIndexOf;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas$1;

  var assocIndexOf = _assocIndexOf;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet$1(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet$1;

  var listCacheClear = _listCacheClear,
      listCacheDelete = _listCacheDelete,
      listCacheGet = _listCacheGet,
      listCacheHas = _listCacheHas,
      listCacheSet = _listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache$4(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache$4.prototype.clear = listCacheClear;
  ListCache$4.prototype['delete'] = listCacheDelete;
  ListCache$4.prototype.get = listCacheGet;
  ListCache$4.prototype.has = listCacheHas;
  ListCache$4.prototype.set = listCacheSet;

  var _ListCache = ListCache$4;

  var getNative$4 = _getNative,
      root$5 = _root;

  /* Built-in method references that are verified to be native. */
  var Map$4 = getNative$4(root$5, 'Map');

  var _Map = Map$4;

  var Hash = _Hash,
      ListCache$3 = _ListCache,
      Map$3 = _Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$3 || ListCache$3),
      'string': new Hash
    };
  }

  var _mapCacheClear = mapCacheClear$1;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */

  function isKeyable$1(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable$1;

  var isKeyable = _isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData$4(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData$4;

  var getMapData$3 = _getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete$1(key) {
    var result = getMapData$3(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete$1;

  var getMapData$2 = _getMapData;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet$1(key) {
    return getMapData$2(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet$1;

  var getMapData$1 = _getMapData;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas$1;

  var getMapData = _getMapData;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet$1(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet$1;

  var mapCacheClear = _mapCacheClear,
      mapCacheDelete = _mapCacheDelete,
      mapCacheGet = _mapCacheGet,
      mapCacheHas = _mapCacheHas,
      mapCacheSet = _mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache$3(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache$3.prototype.clear = mapCacheClear;
  MapCache$3.prototype['delete'] = mapCacheDelete;
  MapCache$3.prototype.get = mapCacheGet;
  MapCache$3.prototype.has = mapCacheHas;
  MapCache$3.prototype.set = mapCacheSet;

  var _MapCache = MapCache$3;

  var MapCache$2 = _MapCache;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize$1(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize$1.Cache || MapCache$2);
    return memoized;
  }

  // Expose `MapCache`.
  memoize$1.Cache = MapCache$2;

  var memoize_1 = memoize$1;

  var memoize = memoize_1;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped$1(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped$1;

  var memoizeCapped = _memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath$1 = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath$1;

  var isArray$8 = isArray_1,
      isKey$2 = _isKey,
      stringToPath = _stringToPath,
      toString = toString_1;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath$2(value, object) {
    if (isArray$8(value)) {
      return value;
    }
    return isKey$2(value, object) ? [value] : stringToPath(toString(value));
  }

  var _castPath = castPath$2;

  var isSymbol$1 = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var INFINITY$2 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey$4(value) {
    if (typeof value == 'string' || isSymbol$1(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
  }

  var _toKey = toKey$4;

  var castPath$1 = _castPath,
      toKey$3 = _toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet$2(object, path) {
    path = castPath$1(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey$3(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet$2;

  var baseGet$1 = _baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get$1(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet$1(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get$1;

  var baseGetTag$3 = _baseGetTag,
      isObjectLike$5 = isObjectLike_1;

  /** `Object#toString` result references. */
  var numberTag$3 = '[object Number]';

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */
  function isNumber(value) {
    return typeof value == 'number' ||
      (isObjectLike$5(value) && baseGetTag$3(value) == numberTag$3);
  }

  var isNumber_1 = isNumber;

  var ListCache$2 = _ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear$1() {
    this.__data__ = new ListCache$2;
    this.size = 0;
  }

  var _stackClear = stackClear$1;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function stackDelete$1(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete$1;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function stackGet$1(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet$1;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function stackHas$1(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas$1;

  var ListCache$1 = _ListCache,
      Map$2 = _Map,
      MapCache$1 = _MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE$1 = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet$1(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache$1) {
      var pairs = data.__data__;
      if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE$1 - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache$1(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet$1;

  var ListCache = _ListCache,
      stackClear = _stackClear,
      stackDelete = _stackDelete,
      stackGet = _stackGet,
      stackHas = _stackHas,
      stackSet = _stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack$3(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack$3.prototype.clear = stackClear;
  Stack$3.prototype['delete'] = stackDelete;
  Stack$3.prototype.get = stackGet;
  Stack$3.prototype.has = stackHas;
  Stack$3.prototype.set = stackSet;

  var _Stack = Stack$3;

  var copyObject$3 = _copyObject,
      keys$5 = keys_1;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign$1(object, source) {
    return object && copyObject$3(source, keys$5(source), object);
  }

  var _baseAssign = baseAssign$1;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function nativeKeysIn$1(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn$1;

  var isObject$4 = isObject_1,
      isPrototype$1 = _isPrototype,
      nativeKeysIn = _nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn$1(object) {
    if (!isObject$4(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype$1(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$3.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn$1;

  var arrayLikeKeys = _arrayLikeKeys,
      baseKeysIn = _baseKeysIn,
      isArrayLike$3 = isArrayLike_1;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$3(object) {
    return isArrayLike$3(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  var keysIn_1 = keysIn$3;

  var copyObject$2 = _copyObject,
      keysIn$2 = keysIn_1;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn$1(object, source) {
    return object && copyObject$2(source, keysIn$2(source), object);
  }

  var _baseAssignIn = baseAssignIn$1;

  var _cloneBuffer = {exports: {}};

  (function (module, exports) {
  var root = _root;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  }(_cloneBuffer, _cloneBuffer.exports));

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */

  function copyArray$1(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray$1;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */

  function arrayFilter$2(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter$2;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */

  function stubArray$2() {
    return [];
  }

  var stubArray_1 = stubArray$2;

  var arrayFilter$1 = _arrayFilter,
      stubArray$1 = stubArray_1;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter$1(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols$3;

  var copyObject$1 = _copyObject,
      getSymbols$2 = _getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols$1(source, object) {
    return copyObject$1(source, getSymbols$2(source), object);
  }

  var _copySymbols = copySymbols$1;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */

  function arrayPush$2(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush$2;

  var overArg = _overArg;

  /** Built-in value references. */
  var getPrototype$2 = overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype$2;

  var arrayPush$1 = _arrayPush,
      getPrototype$1 = _getPrototype,
      getSymbols$1 = _getSymbols,
      stubArray = stubArray_1;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush$1(result, getSymbols$1(object));
      object = getPrototype$1(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn$2;

  var copyObject = _copyObject,
      getSymbolsIn$1 = _getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn$1(source, object) {
    return copyObject(source, getSymbolsIn$1(source), object);
  }

  var _copySymbolsIn = copySymbolsIn$1;

  var arrayPush = _arrayPush,
      isArray$7 = isArray_1;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray$7(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys$2;

  var baseGetAllKeys$1 = _baseGetAllKeys,
      getSymbols = _getSymbols,
      keys$4 = keys_1;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys$2(object) {
    return baseGetAllKeys$1(object, keys$4, getSymbols);
  }

  var _getAllKeys = getAllKeys$2;

  var baseGetAllKeys = _baseGetAllKeys,
      getSymbolsIn = _getSymbolsIn,
      keysIn$1 = keysIn_1;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn$1(object) {
    return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn$1;

  var getNative$3 = _getNative,
      root$4 = _root;

  /* Built-in method references that are verified to be native. */
  var DataView$1 = getNative$3(root$4, 'DataView');

  var _DataView = DataView$1;

  var getNative$2 = _getNative,
      root$3 = _root;

  /* Built-in method references that are verified to be native. */
  var Promise$2 = getNative$2(root$3, 'Promise');

  var _Promise = Promise$2;

  var getNative$1 = _getNative,
      root$2 = _root;

  /* Built-in method references that are verified to be native. */
  var Set$2 = getNative$1(root$2, 'Set');

  var _Set = Set$2;

  var getNative = _getNative,
      root$1 = _root;

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = getNative(root$1, 'WeakMap');

  var _WeakMap = WeakMap$1;

  var DataView = _DataView,
      Map$1 = _Map,
      Promise$1 = _Promise,
      Set$1 = _Set,
      WeakMap = _WeakMap,
      baseGetTag$2 = _baseGetTag,
      toSource = _toSource;

  /** `Object#toString` result references. */
  var mapTag$4 = '[object Map]',
      objectTag$2 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$4 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$3 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map$1),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set$1),
      weakMapCtorString = toSource(WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag$4 = baseGetTag$2;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((DataView && getTag$4(new DataView(new ArrayBuffer(1))) != dataViewTag$3) ||
      (Map$1 && getTag$4(new Map$1) != mapTag$4) ||
      (Promise$1 && getTag$4(Promise$1.resolve()) != promiseTag) ||
      (Set$1 && getTag$4(new Set$1) != setTag$4) ||
      (WeakMap && getTag$4(new WeakMap) != weakMapTag$1)) {
    getTag$4 = function(value) {
      var result = baseGetTag$2(value),
          Ctor = result == objectTag$2 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$3;
          case mapCtorString: return mapTag$4;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$4;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag$4;

  /** Used for built-in method references. */

  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray$1(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$2.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray$1;

  var root = _root;

  /** Built-in value references. */
  var Uint8Array$2 = root.Uint8Array;

  var _Uint8Array = Uint8Array$2;

  var Uint8Array$1 = _Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer$3(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer$3;

  var cloneArrayBuffer$2 = _cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView$1(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView$1;

  /** Used to match `RegExp` flags from their coerced string values. */

  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp$1(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp$1;

  var Symbol$2 = _Symbol;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
      symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol$1(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol$1;

  var cloneArrayBuffer$1 = _cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray$1(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray$1;

  var cloneArrayBuffer = _cloneArrayBuffer,
      cloneDataView = _cloneDataView,
      cloneRegExp = _cloneRegExp,
      cloneSymbol = _cloneSymbol,
      cloneTypedArray = _cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$3 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      mapTag$3 = '[object Map]',
      numberTag$2 = '[object Number]',
      regexpTag$2 = '[object RegExp]',
      setTag$3 = '[object Set]',
      stringTag$3 = '[object String]',
      symbolTag$2 = '[object Symbol]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$2 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag$1(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$2:
        return cloneArrayBuffer(object);

      case boolTag$3:
      case dateTag$2:
        return new Ctor(+object);

      case dataViewTag$2:
        return cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return cloneTypedArray(object, isDeep);

      case mapTag$3:
        return new Ctor;

      case numberTag$2:
      case stringTag$3:
        return new Ctor(object);

      case regexpTag$2:
        return cloneRegExp(object);

      case setTag$3:
        return new Ctor;

      case symbolTag$2:
        return cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag$1;

  var isObject$3 = isObject_1;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate$1 = (function() {
    function object() {}
    return function(proto) {
      if (!isObject$3(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate$1;

  var baseCreate = _baseCreate,
      getPrototype = _getPrototype,
      isPrototype = _isPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject$1(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate(getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject$1;

  var getTag$3 = _getTag,
      isObjectLike$4 = isObjectLike_1;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap$1(value) {
    return isObjectLike$4(value) && getTag$3(value) == mapTag$2;
  }

  var _baseIsMap = baseIsMap$1;

  var baseIsMap = _baseIsMap,
      baseUnary$1 = _baseUnary,
      nodeUtil$1 = _nodeUtil.exports;

  /* Node.js helper references. */
  var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;

  var isMap_1 = isMap$1;

  var getTag$2 = _getTag,
      isObjectLike$3 = isObjectLike_1;

  /** `Object#toString` result references. */
  var setTag$2 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet$1(value) {
    return isObjectLike$3(value) && getTag$2(value) == setTag$2;
  }

  var _baseIsSet = baseIsSet$1;

  var baseIsSet = _baseIsSet,
      baseUnary = _baseUnary,
      nodeUtil = _nodeUtil.exports;

  /* Node.js helper references. */
  var nodeIsSet = nodeUtil && nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

  var isSet_1 = isSet$1;

  var Stack$2 = _Stack,
      arrayEach = _arrayEach,
      assignValue = _assignValue,
      baseAssign = _baseAssign,
      baseAssignIn = _baseAssignIn,
      cloneBuffer = _cloneBuffer.exports,
      copyArray = _copyArray,
      copySymbols = _copySymbols,
      copySymbolsIn = _copySymbolsIn,
      getAllKeys$1 = _getAllKeys,
      getAllKeysIn = _getAllKeysIn,
      getTag$1 = _getTag,
      initCloneArray = _initCloneArray,
      initCloneByTag = _initCloneByTag,
      initCloneObject = _initCloneObject,
      isArray$6 = isArray_1,
      isBuffer$1 = isBuffer$3.exports,
      isMap = isMap_1,
      isObject$2 = isObject_1,
      isSet = isSet_1,
      keys$3 = keys_1,
      keysIn = keysIn_1;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG$1 = 4;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$2 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$2 = '[object String]',
      symbolTag$1 = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] =
  cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] =
  cloneableTags[boolTag$2] = cloneableTags[dateTag$1] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag$1] =
  cloneableTags[numberTag$1] = cloneableTags[objectTag$1] =
  cloneableTags[regexpTag$1] = cloneableTags[setTag$1] =
  cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag$1] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone$1(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG$1,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject$2(value)) {
      return value;
    }
    var isArr = isArray$6(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag$1(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer$1(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$1 || tag == argsTag$1 || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? copySymbolsIn(value, baseAssignIn(result, value))
            : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack$2);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? getAllKeysIn : getAllKeys$1)
      : (isFlat ? keysIn : keys$3);

    var props = isArr ? undefined : keysFunc(value);
    arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      assignValue(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone$1;

  var baseClone = _baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_SYMBOLS_FLAG = 4;

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }

  var cloneDeep_1 = cloneDeep;

  var baseEach$1 = _baseEach;

  /**
   * The base implementation of `_.filter` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function baseFilter$1(collection, predicate) {
    var result = [];
    baseEach$1(collection, function(value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

  var _baseFilter = baseFilter$1;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd$1(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  var _setCacheAdd = setCacheAdd$1;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */

  function setCacheHas$1(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas$1;

  var MapCache = _MapCache,
      setCacheAdd = _setCacheAdd,
      setCacheHas = _setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache$2(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache$2.prototype.add = SetCache$2.prototype.push = setCacheAdd;
  SetCache$2.prototype.has = setCacheHas;

  var _SetCache = SetCache$2;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */

  function arraySome$1(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  var _arraySome = arraySome$1;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function cacheHas$2(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas$2;

  var SetCache$1 = _SetCache,
      arraySome = _arraySome,
      cacheHas$1 = _cacheHas;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Check that cyclic values are equal.
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache$1 : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!arraySome(other, function(othValue, othIndex) {
              if (!cacheHas$1(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays$2;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */

  function mapToArray$1(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray$1;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */

  function setToArray$3(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray$3;

  var Symbol$1 = _Symbol,
      Uint8Array = _Uint8Array,
      eq = eq_1,
      equalArrays$1 = _equalArrays,
      mapToArray = _mapToArray,
      setToArray$2 = _setToArray;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag = '[object Symbol]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag$1:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag:
        var convert = mapToArray;

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
        convert || (convert = setToArray$2);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$2;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  var _equalByTag = equalByTag$1;

  var getAllKeys = _getAllKeys;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
        objProps = getAllKeys(object),
        objLength = objProps.length,
        othProps = getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
        return false;
      }
    }
    // Check that cyclic values are equal.
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects$1;

  var Stack$1 = _Stack,
      equalArrays = _equalArrays,
      equalByTag = _equalByTag,
      equalObjects = _equalObjects,
      getTag = _getTag,
      isArray$5 = isArray_1,
      isBuffer = isBuffer$3.exports,
      isTypedArray = isTypedArray_1;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      objectTag = '[object Object]';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$5(object),
        othIsArr = isArray$5(other),
        objTag = objIsArr ? arrayTag : getTag(object),
        othTag = othIsArr ? arrayTag : getTag(other);

    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;

    var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack$1);
      return (objIsArr || isTypedArray(object))
        ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new Stack$1);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack$1);
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep$1;

  var baseIsEqualDeep = _baseIsEqualDeep,
      isObjectLike$2 = isObjectLike_1;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual$2(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike$2(value) && !isObjectLike$2(other))) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$2, stack);
  }

  var _baseIsEqual = baseIsEqual$2;

  var Stack = _Stack,
      baseIsEqual$1 = _baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch$1(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  var _baseIsMatch = baseIsMatch$1;

  var isObject$1 = isObject_1;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable$2(value) {
    return value === value && !isObject$1(value);
  }

  var _isStrictComparable = isStrictComparable$2;

  var isStrictComparable$1 = _isStrictComparable,
      keys$2 = keys_1;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData$1(object) {
    var result = keys$2(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, isStrictComparable$1(value)];
    }
    return result;
  }

  var _getMatchData = getMatchData$1;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */

  function matchesStrictComparable$2(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable$2;

  var baseIsMatch = _baseIsMatch,
      getMatchData = _getMatchData,
      matchesStrictComparable$1 = _matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches$1(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches$1;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */

  function baseHasIn$1(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn$1;

  var castPath = _castPath,
      isArguments = isArguments_1,
      isArray$4 = isArray_1,
      isIndex = _isIndex,
      isLength = isLength_1,
      toKey$2 = _toKey;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath$1(object, path, hasFunc) {
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey$2(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) &&
      (isArray$4(object) || isArguments(object));
  }

  var _hasPath = hasPath$1;

  var baseHasIn = _baseHasIn,
      hasPath = _hasPath;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn$1(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  var hasIn_1 = hasIn$1;

  var baseIsEqual = _baseIsEqual,
      get = get_1,
      hasIn = hasIn_1,
      isKey$1 = _isKey,
      isStrictComparable = _isStrictComparable,
      matchesStrictComparable = _matchesStrictComparable,
      toKey$1 = _toKey;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty$1(path, srcValue) {
    if (isKey$1(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey$1(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn(object, path)
        : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty$1;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */

  function baseProperty$1(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty$1;

  var baseGet = _baseGet;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep$1(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep$1;

  var baseProperty = _baseProperty,
      basePropertyDeep = _basePropertyDeep,
      isKey = _isKey,
      toKey = _toKey;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property$1(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }

  var property_1 = property$1;

  var baseMatches = _baseMatches,
      baseMatchesProperty = _baseMatchesProperty,
      identity = identity_1,
      isArray$3 = isArray_1,
      property = property_1;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee$4(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == 'object') {
      return isArray$3(value)
        ? baseMatchesProperty(value[0], value[1])
        : baseMatches(value);
    }
    return property(value);
  }

  var _baseIteratee = baseIteratee$4;

  var arrayFilter = _arrayFilter,
      baseFilter = _baseFilter,
      baseIteratee$3 = _baseIteratee,
      isArray$2 = isArray_1;

  /**
   * Iterates over elements of `collection`, returning an array of all elements
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * **Note:** Unlike `_.remove`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   * @see _.reject
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, function(o) { return !o.active; });
   * // => objects for ['fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, { 'age': 36, 'active': true });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, ['active', false]);
   * // => objects for ['fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.filter(users, 'active');
   * // => objects for ['barney']
   *
   * // Combining several predicates using `_.overEvery` or `_.overSome`.
   * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
   * // => objects for ['fred', 'barney']
   */
  function filter(collection, predicate) {
    var func = isArray$2(collection) ? arrayFilter : baseFilter;
    return func(collection, baseIteratee$3(predicate));
  }

  var filter_1 = filter;

  var EDirection;

  (function (EDirection) {
    EDirection["DOWN"] = "down";
    EDirection["UP"] = "up";
    EDirection["LEFT"] = "left";
    EDirection["RIGHT"] = "right";
  })(EDirection || (EDirection = {}));
  var EXAxisDirection;

  (function (EXAxisDirection) {
    EXAxisDirection["Left"] = "left";
    EXAxisDirection["Right"] = "right";
  })(EXAxisDirection || (EXAxisDirection = {}));
  var EYAxisDirection;

  (function (EYAxisDirection) {
    EYAxisDirection["Top"] = "top";
    EYAxisDirection["Bottom"] = "bottom";
  })(EYAxisDirection || (EYAxisDirection = {}));
  var ECanvasTextBaseLine;

  (function (ECanvasTextBaseLine) {
    ECanvasTextBaseLine["Bottom"] = "bottom";
    ECanvasTextBaseLine["Top"] = "top";
    ECanvasTextBaseLine["Middle"] = "middle";
  })(ECanvasTextBaseLine || (ECanvasTextBaseLine = {}));

  var EMapMode;

  (function (EMapMode) {
    EMapMode["Pan"] = "PAN";
    EMapMode["Ban"] = "BAN";
    EMapMode["MARKER"] = "MARKER";
    EMapMode["Point"] = "POINT";
    EMapMode["Circle"] = "CIRCLE";
    EMapMode["Line"] = "LINE";
    EMapMode["Polyline"] = "POLYLINE";
    EMapMode["Rect"] = "RECT";
    EMapMode["Polygon"] = "POLYGON";
    EMapMode["DrawMask"] = "DRAWMASK";
    EMapMode["ClearMask"] = "CLEARMASK";
    EMapMode["ImageMask"] = "IMAGEMASK";
  })(EMapMode || (EMapMode = {}));

  var EEventType;

  (function (EEventType) {
    EEventType["BoundsChanged"] = "boundsChanged";
    EEventType["FeatureSelected"] = "featureSelected";
    EEventType["FeatureUnselected"] = "featureUnselected";
    EEventType["DrawDone"] = "drawDone";
    EEventType["FeatureUpdated"] = "featureUpdated";
    EEventType["FeatureDeleted"] = "featureDeleted";
    EEventType["Draging"] = "draging";
    EEventType["Click"] = "click";
    EEventType["DblClick"] = "dblClick";
    EEventType["MouseDown"] = "mouseDown";
    EEventType["MouseMove"] = "mouseMove";
    EEventType["MouseUp"] = "mouseUp";
    EEventType["MouseOver"] = "mouseOver";
    EEventType["MouseOut"] = "mouseOut";
  })(EEventType || (EEventType = {}));

  var EEventSlotType;

  (function (EEventSlotType) {
    EEventSlotType["DrawActivePoint"] = "drawActivePoint";
    EEventSlotType["DrawActiveMiddlePoint"] = "drawActiveMiddlePoint";
  })(EEventSlotType || (EEventSlotType = {}));

  var ECursorType;

  (function (ECursorType) {
    ECursorType["Grab"] = "-webkit-grab";
    ECursorType["Grabbing"] = "-webkit-grabbing";
    ECursorType["Crosshair"] = "crosshair";
    ECursorType["Pointer"] = "pointer";
    ECursorType["Move"] = "move";
    ECursorType["NESW_Resize"] = "nesw-resize";
    ECursorType["NWSE_Resize"] = "nwse-resize";
  })(ECursorType || (ECursorType = {}));
  var EUrlCursorType;

  (function (EUrlCursorType) {
    EUrlCursorType["DrawMask"] = "crosshair";
    EUrlCursorType["ClearMask"] = "crosshair";
  })(EUrlCursorType || (EUrlCursorType = {}));

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  var baseEach = _baseEach,
      isArrayLike$2 = isArrayLike_1;

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap$1(collection, iteratee) {
    var index = -1,
        result = isArrayLike$2(collection) ? Array(collection.length) : [];

    baseEach(collection, function(value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  var _baseMap = baseMap$1;

  var arrayMap$1 = _arrayMap,
      baseIteratee$2 = _baseIteratee,
      baseMap = _baseMap,
      isArray$1 = isArray_1;

  /**
   * Creates an array of values by running each element in `collection` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
   * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
   * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
   * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  function map(collection, iteratee) {
    var func = isArray$1(collection) ? arrayMap$1 : baseMap;
    return func(collection, baseIteratee$2(iteratee));
  }

  var map_1 = map;

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */

  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  var last_1 = last;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function baseFindIndex$2(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var _baseFindIndex = baseFindIndex$2;

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */

  function baseIsNaN$1(value) {
    return value !== value;
  }

  var _baseIsNaN = baseIsNaN$1;

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function strictIndexOf$1(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var _strictIndexOf = strictIndexOf$1;

  var baseFindIndex$1 = _baseFindIndex,
      baseIsNaN = _baseIsNaN,
      strictIndexOf = _strictIndexOf;

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf$2(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex$1(array, baseIsNaN, fromIndex);
  }

  var _baseIndexOf = baseIndexOf$2;

  var baseGetTag$1 = _baseGetTag,
      isArray = isArray_1,
      isObjectLike$1 = isObjectLike_1;

  /** `Object#toString` result references. */
  var stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString$1(value) {
    return typeof value == 'string' ||
      (!isArray(value) && isObjectLike$1(value) && baseGetTag$1(value) == stringTag);
  }

  var isString_1 = isString$1;

  /** Used to match a single whitespace character. */

  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex$1(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var _trimmedEndIndex = trimmedEndIndex$1;

  var trimmedEndIndex = _trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim$1(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  var _baseTrim = baseTrim$1;

  var baseTrim = _baseTrim,
      isObject = isObject_1,
      isSymbol = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber$1;

  var toNumber = toNumber_1;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite$1(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY$1 || value === -INFINITY$1) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  var toFinite_1 = toFinite$1;

  var toFinite = toFinite_1;

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger$2(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  var toInteger_1 = toInteger$2;

  var arrayMap = _arrayMap;

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues$1(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  var _baseValues = baseValues$1;

  var baseValues = _baseValues,
      keys$1 = keys_1;

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values$1(object) {
    return object == null ? [] : baseValues(object, keys$1(object));
  }

  var values_1 = values$1;

  var baseIndexOf$1 = _baseIndexOf,
      isArrayLike$1 = isArrayLike_1,
      isString = isString_1,
      toInteger$1 = toInteger_1,
      values = values_1;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max;

  /**
   * Checks if `value` is in `collection`. If `collection` is a string, it's
   * checked for a substring of `value`, otherwise
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * is used for equality comparisons. If `fromIndex` is negative, it's used as
   * the offset from the end of `collection`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'a': 1, 'b': 2 }, 1);
   * // => true
   *
   * _.includes('abcd', 'bc');
   * // => true
   */
  function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike$1(collection) ? collection : values(collection);
    fromIndex = (fromIndex && !guard) ? toInteger$1(fromIndex) : 0;

    var length = collection.length;
    if (fromIndex < 0) {
      fromIndex = nativeMax$1(length + fromIndex, 0);
    }
    return isString(collection)
      ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
      : (!!length && baseIndexOf$1(collection, value, fromIndex) > -1);
  }

  var includes_1 = includes;

  // 涂抹action类型
  var EMaskActionType;

  (function (EMaskActionType) {
    EMaskActionType["Draw"] = "DRAW";
    EMaskActionType["Clear"] = "CLEAR";
    EMaskActionType["Image"] = "IMAGE";
  })(EMaskActionType || (EMaskActionType = {}));

  var Action = /*#__PURE__*/function () {
    // actionId
    // actionType
    // props
    // 对象空间数据结构

    /**
     * props: action样式
     * defaultStyle: 默认配置项
     * style: userFeatureStyle merge defaultStyle
    */
    // function: constructor
    function Action(id, type) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Action);

      this.id = id;
      this.type = type;
      this.props = props;
      this.style = assign_1({}, Action.defaultStyle, style);
    } // function: trigger when feature add to featureLayer


    _createClass(Action, [{
      key: "onAdd",
      value: function onAdd(layer) {
        this.layer = layer;
        this.refresh();
      } // trigger when action remove from layer
      // layer exits first

    }, {
      key: "onRemove",
      value: function onRemove() {} // 改变样式

    }, {
      key: "setStyle",
      value: function setStyle(style, option) {
        var _this$layer;

        var _option$refresh = option.refresh,
            refresh = _option$refresh === void 0 ? true : _option$refresh;
        this.style = style;
        refresh && ((_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : _this$layer.refresh());
      } // 刷新当前数据

    }, {
      key: "refresh",
      value: function refresh() {} // 打印测试输出

    }, {
      key: "printInfo",
      value: function printInfo() {}
    }]);

    return Action;
  }();

  _defineProperty$1(Action, "defaultStyle", {
    opacity: 1,
    fillStyle: 'rgba(255, 0, 0, 0)',
    lineWidth: 1,
    strokeStyle: '#000' // 边框颜色

  });

  var baseGetTag = _baseGetTag,
      isObjectLike = isObjectLike_1;

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]';

  /**
   * Checks if `value` is classified as a boolean primitive or object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false ||
      (isObjectLike(value) && baseGetTag(value) == boolTag);
  }

  var isBoolean_1 = isBoolean;

  var Layer$1 = /*#__PURE__*/function () {
    // layerId
    // layerType
    // props
    // props: domId

    /**
     * props: map可选配置项
     * defaultMapOptions: 默认配置项
     * mapOptions: userMapOptions merge defaultMapOptions
    */
    // function: constructor
    function Layer(id, type) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Layer);

      this.id = id;
      this.type = type;
      this.props = props;
      this.style = assign_1({}, Layer.defaultStyle, style);
      this.domId = "layer-".concat(id, "-wrapper");
      this.setDom();
    } // 创建容器dom元素div


    _createClass(Layer, [{
      key: "setDom",
      value: function setDom() {
        if (!this.dom) {
          this.dom = document.createElement('div');
          this.dom.setAttribute('id', this.domId);
          this.dom.style.position = 'absolute';
          this.dom.style.left = '0';
          this.dom.style.top = '0';
        }

        var _this$style = this.style,
            zIndex = _this$style.zIndex,
            opacity = _this$style.opacity;
        this.dom.style.zIndex = "".concat(zIndex);
        this.dom.style.opacity = "".concat(opacity);
      } // function: trigger when layer add to map

    }, {
      key: "onAdd",
      value: function onAdd(map) {
        // 首先判断当前layer是否已经被添加至map对象中
        this.map = map;
        this.resize();
      } // trigger when layer remove from map
      // map exits first

    }, {
      key: "onRemove",
      value: function onRemove() {
        var layerElement = document.getElementById(this.domId);
        layerElement && layerElement.remove();
        this.map = null;
      } // 当容器变化时，需要调用触发
      // 以来map:getSize大小进行当前layer的resize

    }, {
      key: "resize",
      value: function resize() {
        var _this$map$getSize = this.map.getSize(),
            width = _this$map$getSize.width,
            height = _this$map$getSize.height;

        this.dom.style.width = "".concat(width, "px");
        this.dom.style.height = "".concat(height, "px");
      } // 刷新当前数据
      // 各子类各自实现

    }, {
      key: "refresh",
      value: function refresh() {
      } // 重新resize和刷新

    }, {
      key: "resizeAndRefresh",
      value: function resizeAndRefresh() {
        this.resize();
        this.refresh();
      } // 打印测试输出

    }, {
      key: "printInfo",
      value: function printInfo() {}
    }]);

    return Layer;
  }();

  _defineProperty$1(Layer$1, "defaultStyle", {
    zIndex: 1,
    opacity: 1.0
  });

  function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var CanvasLayer = /*#__PURE__*/function (_Layer) {
    _inherits(CanvasLayer, _Layer);

    var _super = _createSuper$k(CanvasLayer);

    // function: constructor
    function CanvasLayer(id, layerType) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, CanvasLayer);

      _this = _super.call(this, id, layerType, props, style);

      _this.createRenderCanvas();

      return _this;
    }

    _createClass(CanvasLayer, [{
      key: "onAdd",
      value: function onAdd(map) {
        _get(_getPrototypeOf(CanvasLayer.prototype), "onAdd", this).call(this, map);

        this.resize();
      } // 创建canvas层

    }, {
      key: "createRenderCanvas",
      value: function createRenderCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.dom.appendChild(this.canvas); // canvas上下文赋值

        this.canvasContext = this.canvas.getContext('2d');
      } // @override

    }, {
      key: "resize",
      value: function resize() {
        // 对容器进行重新resize
        _get(_getPrototypeOf(CanvasLayer.prototype), "resize", this).call(this); // 对canvas进行resize


        var _this$map$getSize = this.map.getSize(),
            width = _this$map$getSize.width,
            height = _this$map$getSize.height;

        this.canvas.width = width * CanvasLayer.dpr;
        this.canvas.height = height * CanvasLayer.dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        // 进行canvas画布清除
        this.clear();

        _get(_getPrototypeOf(CanvasLayer.prototype), "refresh", this).call(this);
      } // 清空canvas画布

    }, {
      key: "clear",
      value: function clear() {
        var _this$canvasContext;

        (_this$canvasContext = this.canvasContext) === null || _this$canvasContext === void 0 ? void 0 : _this$canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }]);

    return CanvasLayer;
  }(Layer$1);

  _defineProperty$1(CanvasLayer, "dpr", window.devicePixelRatio);

  function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  var Graphic = /*#__PURE__*/function () {
    function Graphic() {
      _classCallCheck(this, Graphic);
    }

    _createClass(Graphic, null, [{
      key: "setStyle",
      value: // 需要进行dpr转换的样式属性
      // 设置canvas-style
      function setStyle(ctx) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var fullStyle = assign_1({}, Graphic.defaultStyle, style);

        forEach_1(fullStyle, function (value, key) {
          if (isFunction_1(Graphic.formatStyle[key])) {
            var dprValue = Graphic.formatStyle[key](value); // 排除方法被覆盖，比如fill/stroke

            !isFunction_1(ctx[key]) && (ctx[key] = dprValue);
          } else {
            // 排除方法被覆盖，比如fill/stroke
            !isFunction_1(ctx[key]) && (ctx[key] = value);
          }
        });
      } // 多段线绘制

    }, {
      key: "drawPolyline",
      value: function drawPolyline(ctx, shape, style, option) {
        var format = option.format,
            _option$limitCount = option.limitCount,
            limitCount = _option$limitCount === void 0 ? 2 : _option$limitCount;
        var formatShape = isFunction_1(format) ? format(shape) : shape;
        var points = formatShape.points,
            width = formatShape.width;
        var pointsLength = points.length; // 校验

        if (pointsLength < limitCount) {
          return;
        }

        Graphic.setStyle(ctx, style);
        isNumber_1(width) && (ctx.lineWidth = width); // 绘制

        ctx.beginPath();
        var _points$ = points[0],
            startX = _points$.x,
            startY = _points$.y;
        ctx.moveTo(startX, startY); // 设置起点

        for (var i = 1; i < pointsLength; i++) {
          var _points$i = points[i],
              middleX = _points$i.x,
              middleY = _points$i.y;
          ctx.lineTo(middleX, middleY);
        }

        ctx.stroke();
      } // 线绘制

    }, {
      key: "drawLine",
      value: function drawLine(ctx, shape, style, option) {
        Graphic.setStyle(ctx, style);

        var _ref = option || {},
            format = _ref.format;

        var formatShape = isFunction_1(format) ? format(shape) : shape;
        var start = formatShape.start,
            end = formatShape.end,
            width = formatShape.width;
        isNumber_1(width) && (ctx.lineWidth = width);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y); // 设置起点

        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      } // 矩形绘制

    }, {
      key: "drawRect",
      value: function drawRect(ctx, shape, style, option) {
        var _ref2 = option || {},
            format = _ref2.format;

        var stroke = isBoolean_1(style.stroke) ? style.stroke : true;
        var fill = isBoolean_1(style.fill) ? style.fill : false;
        var formatShape = isFunction_1(format) ? format(shape) : shape;
        var startX = formatShape.x,
            startY = formatShape.y,
            width = formatShape.width,
            height = formatShape.height;
        var endX = startX + width;
        var endY = startY + height; // 矩形点

        var rectPoints = [{
          x: startX,
          y: startY
        }, {
          x: endX,
          y: startY
        }, {
          x: endX,
          y: endY
        }, {
          x: startX,
          y: endY
        }];
        Graphic.drawPolygon(ctx, rectPoints, style, {
          fill: fill,
          stroke: stroke
        });
      } // 多边形绘制

    }, {
      key: "drawPolygon",
      value: function drawPolygon(ctx, points, style, option) {
        var format = option.format,
            _option$limitCount2 = option.limitCount,
            limitCount = _option$limitCount2 === void 0 ? 2 : _option$limitCount2,
            _option$closePath = option.closePath,
            closePath = _option$closePath === void 0 ? true : _option$closePath;
        var stroke = isBoolean_1(style.stroke) ? style.stroke : true;
        var fill = isBoolean_1(style.fill) ? style.fill : false; // 校验

        var pointsLength = points.length;

        if (pointsLength < limitCount) {
          return;
        }

        Graphic.setStyle(ctx, style); // 绘制

        ctx.beginPath();

        var _ref3 = isFunction_1(format) ? format(points[0]) : points[0],
            startX = _ref3.x,
            startY = _ref3.y;

        ctx.moveTo(startX, startY); // 设置起点

        for (var i = 1; i < pointsLength; i++) {
          var _ref4 = isFunction_1(format) ? format(points[i]) : points[i],
              middleX = _ref4.x,
              middleY = _ref4.y;

          ctx.lineTo(middleX, middleY);
        }

        closePath && ctx.closePath(); // 是否闭合

        fill && ctx.fill();

        if (stroke) {
          ctx.globalAlpha = 1; // 字体不能设置透明

          ctx.stroke();
        }
      } // 圆绘制

    }, {
      key: "drawCircle",
      value: function drawCircle(ctx, shape, style, option) {
        var format = option.format;
        var stroke = isBoolean_1(style.stroke) ? style.stroke : true;
        var fill = isBoolean_1(style.fill) ? style.fill : false;
        var formatShape = isFunction_1(format) ? format(shape) : shape;
        var cx = formatShape.cx,
            cy = formatShape.cy,
            r = formatShape.r;
        Graphic.setStyle(ctx, style);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        fill && ctx.fill();

        if (stroke) {
          ctx.globalAlpha = 1; // 字体不能设置透明

          ctx.stroke();
        }
      } // 绘制点

    }, {
      key: "drawPoint",
      value: function drawPoint(ctx, shape, style, option) {
        var format = option.format;
        var formatShape = isFunction_1(format) ? format(shape) : shape;
        var x = formatShape.x,
            y = formatShape.y,
            _formatShape$r = formatShape.r,
            r = _formatShape$r === void 0 ? 2 : _formatShape$r;
        Graphic.setStyle(ctx, style);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
      } // 图片绘制

    }, {
      key: "drawImage",
      value: function drawImage(ctx, imageInfo, option) {
        var image = imageInfo.image,
            x = imageInfo.x,
            y = imageInfo.y,
            width = imageInfo.width,
            height = imageInfo.height;
        ctx.drawImage(image, x, y, width, height);
      } // 文本绘制

    }, {
      key: "drawText",
      value: function drawText(ctx, textInfo, style, option) {
        var withBackground = style.background;
        var format = option.format;
        var fill = isBoolean_1(style.fill) ? style.fill : true;
        var formatTextInfo = isFunction_1(format) ? format(textInfo) : textInfo;
        var text = formatTextInfo.text,
            position = formatTextInfo.position,
            offset = formatTextInfo.offset; // 首先判断text文本是否为空，如果为空，就不进行绘制，直接返回

        if (!text) {
          return;
        }

        Graphic.setStyle(ctx, style);
        var x = position.x + offset.x;
        var y = position.y - offset.y;
        var lineWidth = ctx.lineWidth;
        var paddingVertical = 3 * CanvasLayer.dpr;
        var paddingHorizontal = 4 * CanvasLayer.dpr;
        var isBottom = ctx.textBaseline === ECanvasTextBaseLine.Bottom;
        var isTop = ctx.textBaseline === ECanvasTextBaseLine.Top;
        var isMiddle = ctx.textBaseline === ECanvasTextBaseLine.Middle;

        if (withBackground) {
          // 绘制容器矩形
          var textWidth = ctx.measureText(text).width;
          var fontSize = parseInt(ctx.font.replace(/[^0-9.]/ig, ''), 10);
          var width = textWidth + paddingHorizontal * 2;
          var height = fontSize + paddingVertical * 2;
          var rectLTY = position.y;
          isBottom && (rectLTY = rectLTY - height);
          isTop && (rectLTY = rectLTY); // 不同更换Y坐标

          isMiddle && (rectLTY = rectLTY - height / 2); // 不同更换Y坐标

          var rectShape = {
            x: position.x + offset.x,
            y: rectLTY - offset.y,
            width: width,
            height: height
          };
          Graphic.drawRect(ctx, rectShape, _objectSpread$a(_objectSpread$a({}, style || {}), {}, {
            fill: true
          }));
        } // 执行文本绘制


        ctx.globalAlpha = 1; // 字体不能设置透明

        if (fill) {
          ctx.fillStyle = style.fontColor;
          isBottom && withBackground && ctx.fillText(text, x + paddingHorizontal, y - paddingVertical + lineWidth);
          isMiddle && withBackground && ctx.fillText(text, x + paddingHorizontal, y);
          isTop && withBackground && ctx.fillText(text, x + paddingHorizontal, y + paddingVertical + lineWidth);
          !withBackground && ctx.fillText(text, x, y);
        } else {
          ctx.strokeStyle = style.fontColor;
          isBottom && withBackground && ctx.strokeText(text, x + paddingHorizontal, y - paddingVertical + lineWidth);
          isMiddle && withBackground && ctx.strokeText(text, x + paddingHorizontal, y);
          isTop && withBackground && ctx.strokeText(text, x + paddingHorizontal, y + paddingVertical + lineWidth);
          !withBackground && ctx.strokeText(text, x, y);
        }
      }
    }, {
      key: "drawArrow",
      value: function drawArrow(ctx, shape, radians, style, option) {
        var _ref5 = option || {},
            format = _ref5.format;

        var formatShape = isFunction_1(format) ? format(shape) : shape;
        var position = formatShape.position,
            _formatShape$points = formatShape.points,
            points = _formatShape$points === void 0 ? [] : _formatShape$points;
        Graphic.setStyle(ctx, style);
        ctx.save();
        ctx.beginPath();
        ctx.translate(position.x, position.y);
        ctx.rotate(radians);

        forEach_1(points, function (point, index) {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });

        ctx.closePath();
        ctx.restore();
        ctx.fill();
        ctx.stroke();
      }
    }]);

    return Graphic;
  }();

  _defineProperty$1(Graphic, "defaultStyle", {
    fillStyle: '#FF0000',
    strokeStyle: '#FF0000',
    lineWidth: 1,
    font: 'normal 12px Arial',
    globalAlpha: 1,
    lineCap: 'round',
    lineJoin: 'round',
    shadowOffsetX: 0,
    // 阴影Y轴偏移
    shadowOffsetY: 0,
    // 阴影X轴偏移
    shadowBlur: 0 // 模糊尺寸

  });

  _defineProperty$1(Graphic, "formatStyle", {
    'lineWidth': function lineWidth(value) {
      return value * CanvasLayer.dpr;
    },
    'font': function font(value) {
      var fontSize = value.replace(/[^0-9.]/ig, '');
      var newFontSize = parseInt(fontSize, 10) * CanvasLayer.dpr;
      var reg = new RegExp("".concat(fontSize), 'g');
      var newValue = value.replace(reg, "".concat(newFontSize));
      return newValue;
    }
  });

  function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ClearActionFeature = /*#__PURE__*/function (_Action) {
    _inherits(ClearActionFeature, _Action);

    var _super = _createSuper$j(ClearActionFeature);

    // function: constructor
    function ClearActionFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, ClearActionFeature);

      _this = _super.call(this, id, EMaskActionType.Clear, props, style);
      _this.shape = shape;
      return _this;
    } // 执行绘制当前
    // @override


    _createClass(ClearActionFeature, [{
      key: "refresh",
      value: function refresh() {
        var _this2 = this;

        // 执行坐标转换
        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale(); // 设置倒圆角

        var formateStyle = _objectSpread$9(_objectSpread$9({}, this.style || {}), {}, {
          lineCap: 'round',
          lineJoin: 'round'
        });

        this.layer.canvasContext.globalCompositeOperation = 'destination-out';
        Graphic.drawPolyline(this.layer.canvasContext, this.shape, formateStyle, {
          format: function format(shape) {
            var points = shape.points,
                width = shape.width;
            return _objectSpread$9({
              points: map_1(points, function (point) {
                var _this2$layer$map$tran = _this2.layer.map.transformGlobalToScreen(point),
                    screenX = _this2$layer$map$tran.x,
                    screenY = _this2$layer$map$tran.y;

                return {
                  x: screenX * dpr,
                  y: screenY * dpr
                };
              })
            }, isNumber_1(width) ? {
              width: width * scale * dpr
            } : {});
          }
        });
        this.layer.canvasContext.globalCompositeOperation = 'source-over';
      }
    }]);

    return ClearActionFeature;
  }(Action);

  // 图层类型
  var ELayerType;

  (function (ELayerType) {
    ELayerType["Image"] = "IMAGE";
    ELayerType["Feature"] = "FEATURE";
    ELayerType["Event"] = "EVENT";
    ELayerType["Mask"] = "MASK";
    ELayerType["Text"] = "TEXT";
    ELayerType["Marker"] = "MARKER";
    ELayerType["Overlay"] = "OVERLAY";
    ELayerType["Support"] = "SUPPORT";
  })(ELayerType || (ELayerType = {}));

  var ELayerImageEventType;

  (function (ELayerImageEventType) {
    ELayerImageEventType["LoadStart"] = "loadStart";
    ELayerImageEventType["LoadEnd"] = "loadEnd";
    ELayerImageEventType["LoadError"] = "loadError";
  })(ELayerImageEventType || (ELayerImageEventType = {}));

  // Feature对象类型
  var EFeatureType;

  (function (EFeatureType) {
    EFeatureType["Point"] = "POINT";
    EFeatureType["Line"] = "LINE";
    EFeatureType["Polyline"] = "POLYLINE";
    EFeatureType["Polygon"] = "POLYGON";
    EFeatureType["Rect"] = "RECT";
    EFeatureType["Circle"] = "CIRCLE";
    EFeatureType["Arrow"] = "ARROW";
  })(EFeatureType || (EFeatureType = {}));

  var EFeatureCircleSubtype;

  (function (EFeatureCircleSubtype) {
    EFeatureCircleSubtype["Global"] = "GLOBAL";
    EFeatureCircleSubtype["Screen"] = "SCREEN";
  })(EFeatureCircleSubtype || (EFeatureCircleSubtype = {}));

  var Util = /*#__PURE__*/_createClass(function Util() {
    _classCallCheck(this, Util);
  });

  _defineProperty$1(Util, "MathUtil", {
    // 获取亮点之间的中心点
    getMiddlePoint: function getMiddlePoint(start, end) {
      var x1 = start.x,
          y1 = start.y;
      var x2 = end.x,
          y2 = end.y;
      var middleX = (x1 + x2) / 2;
      var middleY = (y1 + y2) / 2;
      return {
        x: middleX,
        y: middleY
      };
    },
    // 计算两端之间的距离
    distance: function distance(start, end) {
      var x1 = start.x,
          y1 = start.y;
      var x2 = end.x,
          y2 = end.y;
      var dltX = x1 - x2;
      var dltY = y1 - y2;
      return Math.sqrt(dltX * dltX + dltY * dltY);
    },
    // 计算两端之间的距离
    pointInPolygon: function pointInPolygon(point, points) {
      var x = point.x,
          y = point.y;

      for (var c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i) {
        var _points$i = points[i],
            xi = _points$i.x,
            yi = _points$i.y;
        var _points$j = points[j],
            xj = _points$j.x,
            yj = _points$j.y;
        (yi <= y && y < yj || yj <= y && y < yi) && x < (xj - xi) * (y - yi) / (yj - yi) + xi && (c = !c);
      }

      return c;
    },
    pointInPoint: function pointInPoint(point, point2) {
      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var tolerance = option.tolerance;
      var distance = Util.MathUtil.distance(point, point2);
      return distance <= tolerance;
    },
    pointInPolyline: function pointInPolyline(pt, points) {
      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var tolerance = option.tolerance;
      var maxIndex = points.length - 1;
      var result = false;

      forEach_1(points, function (point, index) {
        if (index === maxIndex) {
          return;
        }

        var nextPoint = points[index + 1];
        var distance = Util.MathUtil.distancePoint2Line(pt, point, nextPoint);

        if (distance <= tolerance) {
          result = true;
          return false;
        }
      });

      return result;
    },
    // 计算点到线段的最短距离
    distancePoint2Line: function distancePoint2Line(pt, point1, point2) {
      var x = pt.x,
          y = pt.y;
      var x1 = point1.x,
          y1 = point1.y;
      var x2 = point2.x,
          y2 = point2.y;
      var A = x - x1;
      var B = y - y1;
      var C = x2 - x1;
      var D = y2 - y1;
      var dot = A * C + B * D;
      var lineLength = C * C + D * D;
      var param = -1;

      if (lineLength !== 0) {
        // 线段长度不能为0
        param = dot / lineLength;
      }

      var xx;
      var yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      var dx = x - xx;
      var dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }
  });

  _defineProperty$1(Util, "EventUtil", {
    // 获取鼠标左右键
    getButtonIndex: function getButtonIndex(event) {
      if (!+[1]) {
        switch (event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            return 0;

          case 2:
          case 6:
            return 2;

          case 4:
            return 1;
        }
      }

      return event.button;
    },
    getMouseDirection: function getMouseDirection(dom, event) {
      var x1 = dom.offsetLeft;
      var y1 = -dom.offsetTop; // 注意坐标，所有的y坐标都是负数

      var x2 = x1 + dom.offsetWidth;
      var y2 = y1 - dom.offsetHeight; // 同样y坐标为负数

      var x0 = (x1 + x2) / 2;
      var y0 = (y1 + y2) / 2;
      var k = (y2 - y1) / (x2 - x1); // 斜率k
      // 计算

      var e = event || window.event;
      var x = e.clientX; // 鼠标刚移出div内，记录下当前的x坐标

      var y = -e.clientY; // 鼠标刚移出div内，记录下当前的y坐标

      var K = (y - y0) / (x - x0); // K是鼠标移入点和中心点的斜率
      // 当K大于k并且小于-k时，则肯定是左右移入，当移入点的x坐标大于中心点 ，则为右移入，小于则是左移入

      if (k < K && K < -k) {
        if (x > x0) {
          return 1; // 右
        } else {
          return 3; // 左
        }
      } // 注意此处y是负数，判断上下的方法同上


      if (y > y0) {
        return 0; // 上
      } else {
        return 2; // 下
      }
    }
  });

  var EMarkerType; // marker事件监听

  (function (EMarkerType) {
    EMarkerType["Marker"] = "MARKER";
  })(EMarkerType || (EMarkerType = {}));

  var EMarkerEventType;

  (function (EMarkerEventType) {
    EMarkerEventType["Click"] = "click";
    EMarkerEventType["MouseDown"] = "mouseDown";
    EMarkerEventType["MouseUp"] = "mouseUp";
    EMarkerEventType["MouseOver"] = "mouseOver";
    EMarkerEventType["MouseOut"] = "mouseOut";
    EMarkerEventType["DragStart"] = "dragStart";
    EMarkerEventType["Dragging"] = "dragging";
    EMarkerEventType["DragEnd"] = "dragEnd";
    EMarkerEventType["RightClick"] = "rightClick";
  })(EMarkerEventType || (EMarkerEventType = {}));

  function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var EventLayer = /*#__PURE__*/function (_Layer) {
    _inherits(EventLayer, _Layer);

    var _super = _createSuper$i(EventLayer);

    // 实时记录鼠标的位置
    // mouseDown坐标{screen:IPoint: 相对容器左上角坐标, globalPoint}
    //  mouseDown坐标：相对页面左上角的坐标
    // 标记是否处于dragging拖拽状态
    // mousemove过程中因为涉及到防抖逻辑，在setTimeOut需要判断是否会后续逻辑打断
    // 多边形绘制时临时保存points：IBasePoint[]
    // 当存在activeFeature时，鼠标move过程中捕捉到的feature
    // 当存在activeFeature时，鼠标move过程中捕捉到的feature节点index
    // 0 0.5 1 1.5 ：存在x.5时，代表的是x & x+1 的中间节点
    // function: constructor
    function EventLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, EventLayer);

      _this = _super.call(this, id, ELayerType.Event, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "dragging", false);

      _defineProperty$1(_assertThisInitialized(_this), "breakFeatureCapture", false);

      _defineProperty$1(_assertThisInitialized(_this), "tmpPointsStore", []);

      _defineProperty$1(_assertThisInitialized(_this), "hoverFeature", null);

      _defineProperty$1(_assertThisInitialized(_this), "hoverFeatureIndex", undefined);

      _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
      _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
      _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
      _this.onMouseOut = _this.onMouseOut.bind(_assertThisInitialized(_this));
      _this.onMouseOver = _this.onMouseOver.bind(_assertThisInitialized(_this));
      _this.onMouseClick = _this.onMouseClick.bind(_assertThisInitialized(_this));
      _this.onMouseDblClick = _this.onMouseDblClick.bind(_assertThisInitialized(_this));
      _this.onMouseWheel = _this.onMouseWheel.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(EventLayer, [{
      key: "onAdd",
      value: function onAdd(map) {
        _get(_getPrototypeOf(EventLayer.prototype), "onAdd", this).call(this, map);

        this.createEventDom();
        this.dom.appendChild(this.eventDom); // 事件绑定

        this.addEventListener();
      } // 创建mask层

    }, {
      key: "createEventDom",
      value: function createEventDom() {
        this.eventDom = document.createElement('div');
        this.eventDom.style.position = 'absolute';
        this.eventDom.style.left = '0';
        this.eventDom.style.right = '0';
        this.eventDom.style.top = '0';
        this.eventDom.style.bottom = '0';
        this.eventDom.style.zIndex = '1'; // 阻止拖拽默认事件

        this.eventDom.ondragstart = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };
      } // addEventListener: 初始化容器事件绑定

    }, {
      key: "addEventListener",
      value: function addEventListener() {
        this.eventDom.addEventListener("mousedown", this.onMouseDown);
        this.eventDom.addEventListener("mousemove", this.onMouseMove);
        this.eventDom.addEventListener("mouseup", this.onMouseUp);
        this.eventDom.addEventListener('click', this.onMouseClick);
        this.eventDom.addEventListener('dblclick', this.onMouseDblClick);
        this.eventDom.addEventListener("mousewheel", this.onMouseWheel);
        this.eventDom.addEventListener("mouseout", this.onMouseOut);
        this.eventDom.addEventListener("mouseover", this.onMouseOver);
      } // removeEventListener: 事件解除

    }, {
      key: "removeEventListener",
      value: function removeEventListener() {
        this.eventDom.removeEventListener("mousedown", this.onMouseDown);
        this.eventDom.removeEventListener("mousemove", this.onMouseMove);
        this.eventDom.removeEventListener("mouseup", this.onMouseUp);
        this.eventDom.removeEventListener('click', this.onMouseClick);
        this.eventDom.removeEventListener('dblclick', this.onMouseDblClick);
        this.eventDom.removeEventListener("mousewheel", this.onMouseWheel);
        this.eventDom.removeEventListener("mouseout", this.onMouseOut);
        this.eventDom.removeEventListener("mouseover", this.onMouseOver);
      }
      /*************************************************/

      /*************** map 平移 *************************/

      /*************************************************/
      // map平移开始

    }, {
      key: "handleMapPanStart",
      value: function handleMapPanStart(e) {
        var _this2 = this;

        this.dragging = true; // 鼠标按下态

        this.setEventCursor(ECursorType.Grabbing);

        document.onmousemove = function (e) {
          return _this2.handleMapPanMove(e);
        };

        document.onmouseup = function (e) {
          return _this2.handleMapPanEnd(e);
        };
      } // map平移中

    }, {
      key: "handleMapPanMove",
      value: function handleMapPanMove(e) {
        var _this$getDltXY = this.getDltXY(e),
            dltX = _this$getDltXY.x,
            dltY = _this$getDltXY.y;

        this.map.onDrag(dltX, dltY);
      } // map平移结束

    }, {
      key: "handleMapPanEnd",
      value: function handleMapPanEnd(e) {
        this.dragging = false; // 鼠标抬起

        this.setEventCursor(ECursorType.Grab);
        document.onmousemove = null;
        document.onmouseup = null; // 计算偏移量

        var _this$getDltXY2 = this.getDltXY(e),
            dltX = _this$getDltXY2.x,
            dltY = _this$getDltXY2.y;

        var _this$map$getScreenCe = this.map.getScreenCenter(),
            screenCenterX = _this$map$getScreenCe.x,
            screenCenterY = _this$map$getScreenCe.y; // 计算待更新的屏幕中心点坐标


        var newScreenCenterX = screenCenterX - dltX;
        var newScreenCenterY = screenCenterY - dltY; // 新的屏幕坐标转换为实际坐标值

        var newCenter = this.map.transformScreenToGlobal({
          x: newScreenCenterX,
          y: newScreenCenterY
        }); // 将map中相关元素复位，然后进行刷新

        this.map.reset().setCenter(newCenter);
      } // 获取pageScreenPoint相对startPageScreenPoint偏移量

    }, {
      key: "getDltXY",
      value: function getDltXY(e, option) {
        var _ref = option || {},
            _ref$transform = _ref.transform,
            transform = _ref$transform === void 0 ? false : _ref$transform;

        var scale = this.map.getScale();
        var screenX = e.screenX,
            screenY = e.screenY;
        var _this$startPageScreen = this.startPageScreenPoint,
            x = _this$startPageScreen.x,
            y = _this$startPageScreen.y;
        var screenDltX = screenX - x;
        var screenDltY = screenY - y;
        var globalDltX = screenDltX / scale;
        var globalDltY = screenDltY / scale;
        return {
          x: transform ? globalDltX : screenDltX,
          y: transform ? globalDltY : screenDltY
        };
      }
    }, {
      key: "clearDownTimer",
      value: function clearDownTimer() {
        if (this.downTimer) {
          window.clearTimeout(this.downTimer);
          this.downTimer = null;
        }
      }
      /*****************************************************/

      /*************** map 注记绘制 *************************/

      /*****************************************************/

    }, {
      key: "handleMarkerStart",
      value: function handleMarkerStart(e) {
        var _this3 = this;

        this.clearDownTimer();
        this.downTimer = window.setTimeout(function () {
          _this3.map.eventsObServer.emit(EEventType.DrawDone, _this3.map.mode, {
            x: _this3.startPoint.global.x,
            y: _this3.startPoint.global.y
          });
        }, 300);
      }
      /*****************************************************/

      /*************** map 点 *************************/

      /*****************************************************/

    }, {
      key: "handlePointStart",
      value: function handlePointStart(e) {
        var _this4 = this;

        this.clearDownTimer();
        this.downTimer = window.setTimeout(function () {
          _this4.map.eventsObServer.emit(EEventType.DrawDone, _this4.map.mode, {
            x: _this4.startPoint.global.x,
            y: _this4.startPoint.global.y
          });

          _this4.reset(); // 重置

        }, 300);
      }
      /*****************************************************/

      /*************** map 矩形绘制 *************************/

      /*****************************************************/

    }, {
      key: "handleCircleStart",
      value: function handleCircleStart(e) {
        var _this5 = this;

        this.dragging = true; // 鼠标按下态

        document.onmousemove = function (e) {
          return _this5.handleCircleMove(e);
        };

        document.onmouseup = function (e) {
          return _this5.handleCircleEnd(e);
        };

        var global = this.startPoint.global;
        this.setTip({
          text: '移动开始绘制',
          position: global
        });
      }
    }, {
      key: "handleCircleMove",
      value: function handleCircleMove(e) {
        var global = this.startPoint.global;

        var _this$getDltXY3 = this.getDltXY(e, {
          transform: true
        }),
            preGlobalDltX = _this$getDltXY3.x,
            preGlobalDltY = _this$getDltXY3.y;

        var _this$getDltXY4 = this.getDltXY(e, {
          transform: false
        }),
            screenDltX = _this$getDltXY4.x,
            screenDltY = _this$getDltXY4.y;

        var screenDlt = Math.sqrt(screenDltX * screenDltX + screenDltY * screenDltY);
        var isXAxisRight = this.map.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.map.yAxis.direction === EYAxisDirection.Top;
        var globalDltX = isXAxisRight ? preGlobalDltX : -preGlobalDltX;
        var globalDltY = isYAxisTop ? preGlobalDltY : -preGlobalDltY;
        var moveGlobal = {
          x: global.x + globalDltX,
          y: global.y - globalDltY
        };
        var circleShape = {
          cx: global.x,
          cy: global.y,
          sr: screenDlt
        };
        this.map.overlayLayer.addCircleFeature(circleShape);
        this.setTip({
          text: '抬起完成绘制',
          position: moveGlobal
        });
      }
    }, {
      key: "handleCircleEnd",
      value: function handleCircleEnd(e) {
        this.dragging = false; // 鼠标抬起

        document.onmousemove = null;
        document.onmouseup = null;
        var _this$startPoint$glob = this.startPoint.global,
            centerX = _this$startPoint$glob.x,
            centerY = _this$startPoint$glob.y;

        var _this$getDltXY5 = this.getDltXY(e, {
          transform: true
        }),
            globalDltX = _this$getDltXY5.x,
            globalDltY = _this$getDltXY5.y;

        var _this$getDltXY6 = this.getDltXY(e, {
          transform: false
        }),
            screenDltX = _this$getDltXY6.x,
            screenDltY = _this$getDltXY6.y;

        var globalDlt = Math.sqrt(globalDltX * globalDltX + globalDltY * globalDltY);
        var screenDlt = Math.sqrt(screenDltX * screenDltX + screenDltY * screenDltY);
        this.reset(); // 重置临时数据
        // rect矩形有效性判读是否合适

        if (Math.abs(screenDlt) <= 2) {
          console.warn('the circle is too small...');
          return;
        } // 组织矩形数据shape格式


        var circleGlobalShape = {
          cx: centerX,
          cy: centerY,
          r: globalDlt
        };
        var circleScreenShape = {
          cx: centerX,
          cy: centerY,
          sr: screenDlt
        }; // 绘制矩形完成之后触发告知用户层

        this.map.eventsObServer.emit(EEventType.DrawDone, this.map.mode, circleGlobalShape, circleScreenShape);
      }
      /*****************************************************/

      /*************** map 线段 *************************/

      /*****************************************************/

    }, {
      key: "handleLineStart",
      value: function handleLineStart(e) {
        var _this6 = this;

        // 说明绘制线段第一个点
        if (this.tmpPointsStore.length === 0) {
          this.clearDownTimer();
          this.downTimer = window.setTimeout(function () {
            _this6.tmpPointsStore.push(_this6.startPoint);

            _this6.setTip({
              text: '移动开始绘制',
              position: _this6.startPoint.global
            });
          }, 300);
        } else if (this.tmpPointsStore.length === 1) {
          var startGlobal = this.tmpPointsStore[0].global;
          var endGlobal = this.startPoint.global; // 绘制矩形完成之后触发告知用户层

          this.map.eventsObServer.emit(EEventType.DrawDone, this.map.mode, {
            start: startGlobal,
            end: endGlobal
          });
          this.reset();
        }
      }
    }, {
      key: "handleLineMove",
      value: function handleLineMove(e) {
        var offsetX = e.offsetX,
            offsetY = e.offsetY;
        var screen = {
          x: offsetX,
          y: offsetY
        };
        var global = this.map.transformScreenToGlobal(screen);
        var pointsLength = this.tmpPointsStore.length;

        if (pointsLength === 0) {
          this.setTip({
            text: '单击确定起点',
            position: global
          });
        } else if (pointsLength === 1) {
          var start = this.tmpPointsStore[0].global;
          var end = this.map.transformScreenToGlobal({
            x: offsetX,
            y: offsetY
          });
          this.map.overlayLayer.addLineFeature({
            start: start,
            end: end
          });
          this.setTip({
            text: '单击确定终点',
            position: global
          });
        }
      }
      /*****************************************************/

      /***************** map 多段线 *************************/

      /*****************************************************/

    }, {
      key: "handlePolylineStart",
      value: function handlePolylineStart(e) {
        var _this7 = this;

        if (this.tmpPointsStore.length === 0) {
          this.clearDownTimer();
          this.downTimer = window.setTimeout(function () {
            _this7.tmpPointsStore.push(_this7.startPoint);

            _this7.setTip({
              text: '移动开始绘制',
              position: _this7.startPoint.global
            });
          }, 300);
        } else {
          this.tmpPointsStore.push(this.startPoint);

          if (this.map.withHotKeys) {
            this.setTip({
              text: 'ctrl+z撤销',
              position: this.startPoint.global
            });
          }
        }
      }
    }, {
      key: "handlePolylineMove",
      value: function handlePolylineMove(e) {
        var offsetX = e.offsetX,
            offsetY = e.offsetY;
        var moveGlobalPoint = this.map.transformScreenToGlobal({
          x: offsetX,
          y: offsetY
        });

        var drawingGlobalPoints = map_1(this.tmpPointsStore, function (_ref2) {
          var global = _ref2.global;
          return global;
        });

        drawingGlobalPoints.push(moveGlobalPoint);

        if (drawingGlobalPoints.length === 1) {
          // 说明刚开始绘制
          this.setTip({
            text: '单击确定起点',
            position: moveGlobalPoint
          });
        } else if (drawingGlobalPoints.length > 1) {
          this.map.overlayLayer.addPolylineFeature({
            points: drawingGlobalPoints
          });
          this.setTip({
            text: '单击绘制/双击结束',
            position: moveGlobalPoint
          });
        }
      }
    }, {
      key: "handlePolylineEnd",
      value: function handlePolylineEnd(e) {
        this.tmpPointsStore.pop(); // 移除两次handlePolylineStart事件执行多的一个点

        if (this.tmpPointsStore.length >= 2) {
          this.map.eventsObServer.emit(EEventType.DrawDone, this.map.mode, map_1(this.tmpPointsStore, function (_ref3) {
            var global = _ref3.global;
            return global;
          }));
        }

        this.reset();
      }
      /*****************************************************/

      /*************** map 矩形绘制 *************************/

      /*****************************************************/

    }, {
      key: "handleRectStart",
      value: function handleRectStart(e) {
        var _this8 = this;

        this.dragging = true; // 鼠标按下态

        document.onmousemove = function (e) {
          return _this8.handleRectMove(e);
        };

        document.onmouseup = function (e) {
          return _this8.handleRectEnd(e);
        };

        var global = this.startPoint.global;
        this.setTip({
          text: '移动开始绘制',
          position: global
        });
      }
    }, {
      key: "handleRectMove",
      value: function handleRectMove(e) {
        var _this$startPoint$glob2 = this.startPoint.global,
            x = _this$startPoint$glob2.x,
            y = _this$startPoint$glob2.y;

        var _this$getDltXY7 = this.getDltXY(e, {
          transform: true
        }),
            width = _this$getDltXY7.x,
            height = _this$getDltXY7.y;

        var isXAxisRight = this.map.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.map.yAxis.direction === EYAxisDirection.Top;
        var ltx = isXAxisRight ? Math.min(x, x + width) : Math.max(x, x - width);
        var lty = isYAxisTop ? Math.max(y, y - height) : Math.min(y, y + height);
        var moveGlobal = {
          x: isXAxisRight ? x + width : x - width,
          y: isYAxisTop ? y - height : y + height
        };
        var rectShape = {
          x: ltx,
          y: lty,
          width: Math.abs(width),
          height: Math.abs(height)
        };
        this.map.overlayLayer.addRectFeature(rectShape);
        this.setTip({
          text: '抬起完成绘制',
          position: moveGlobal
        });
      }
    }, {
      key: "handleRectEnd",
      value: function handleRectEnd(e) {
        this.dragging = false; // 鼠标抬起

        document.onmousemove = null;
        document.onmouseup = null;
        var scale = this.map.getScale();
        var _this$startPoint$scre = this.startPoint.screen,
            startScreeX = _this$startPoint$scre.x,
            startScreeY = _this$startPoint$scre.y;

        var _this$getDltXY8 = this.getDltXY(e),
            screenDltX = _this$getDltXY8.x,
            screenDltY = _this$getDltXY8.y;

        var width = Math.abs(screenDltX) / scale;
        var height = Math.abs(screenDltY) / scale;
        var pointRBX = startScreeX + screenDltX;
        var pointRBY = startScreeY + screenDltY;
        var pointLTX = Math.min(pointRBX, startScreeX);
        var pointLTY = Math.min(pointRBY, startScreeY);
        var globalLTPoint = this.map.transformScreenToGlobal({
          x: pointLTX,
          y: pointLTY
        });
        this.reset(); // 重置临时数据
        // rect矩形有效性判读是否合适

        if (Math.abs(screenDltX) <= 3 || Math.abs(screenDltY) <= 3) {
          console.warn('the rect is too small...');
          return;
        } // 组织矩形数据shape格式


        var rectShape = {
          x: globalLTPoint.x,
          y: globalLTPoint.y,
          width: width,
          height: height
        }; // 绘制矩形完成之后触发告知用户层

        this.map.eventsObServer.emit(EEventType.DrawDone, this.map.mode, rectShape);
      }
      /*****************************************************/

      /*************** map 矩形多边形 ************************/

      /*****************************************************/

    }, {
      key: "handlePolygonStart",
      value: function handlePolygonStart(e) {
        var _this9 = this;

        if (this.tmpPointsStore.length === 0) {
          this.clearDownTimer();
          this.downTimer = window.setTimeout(function () {
            _this9.tmpPointsStore.push(_this9.startPoint);

            _this9.setTip({
              text: '移动开始绘制',
              position: _this9.startPoint.global
            });
          }, 300);
        } else {
          this.tmpPointsStore.push(this.startPoint);

          if (this.map.withHotKeys) {
            this.setTip({
              text: 'ctrl+z撤销',
              position: this.startPoint.global
            });
          }
        }
      }
    }, {
      key: "handlePolygonMove",
      value: function handlePolygonMove(e) {
        var offsetX = e.offsetX,
            offsetY = e.offsetY;
        var moveGlobalPoint = this.map.transformScreenToGlobal({
          x: offsetX,
          y: offsetY
        });

        var drawingGlobalPoints = map_1(this.tmpPointsStore, function (_ref4) {
          var global = _ref4.global;
          return global;
        });

        drawingGlobalPoints.push(moveGlobalPoint);
        var drawingPointsCount = drawingGlobalPoints.length;

        if (drawingPointsCount === 1) {
          // 说明刚开始绘制
          this.setTip({
            text: '单击确定起点',
            position: moveGlobalPoint
          });
        } else if (drawingPointsCount > 1) {
          this.map.overlayLayer.addPolygonFeature({
            points: drawingGlobalPoints
          }, {
            node: true
          });
          var tipText = drawingPointsCount === 2 ? '单击绘制' : '单击绘制/双击结束';
          this.setTip({
            text: tipText,
            position: moveGlobalPoint
          });
        }
      }
    }, {
      key: "handlePolygonEnd",
      value: function handlePolygonEnd(e) {
        this.tmpPointsStore.pop(); // 移除两次handlePolygonStart事件执行多的一个点

        if (this.tmpPointsStore.length >= 3) {
          // 绘制矩形完成之后触发告知用户层
          var points = map_1(this.tmpPointsStore, function (_ref5) {
            var global = _ref5.global;
            return global;
          });

          this.map.eventsObServer.emit(EEventType.DrawDone, this.map.mode, points);
        }

        this.reset();
      }
      /*****************************************************/

      /**********+****** map 涂抹 ***************************/

      /*****************************************************/

    }, {
      key: "handleMaskStart",
      value: function handleMaskStart(e) {
        var _this10 = this;

        this.dragging = true; // 鼠标按下态

        document.onmousemove = function (e) {
          return _this10.handleMaskMove(e);
        };

        document.onmouseup = function (e) {
          return _this10.handleMaskEnd(e);
        };

        this.tmpPointsStore.push(this.startPoint);

        var points = map_1(this.tmpPointsStore, function (_ref6) {
          var global = _ref6.global;
          return global;
        }); // 模式变化


        switch (this.map.mode) {
          case EMapMode.DrawMask:
            {
              this.map.overlayLayer.addDrawAction({
                points: points
              });
              break;
            }

          case EMapMode.ClearMask:
            {
              this.handleMaskClearMoving({
                points: points
              });
              break;
            }
        }
      }
    }, {
      key: "handleMaskMove",
      value: function handleMaskMove(e) {
        var _this$startPoint$scre2 = this.startPoint.screen,
            startScreeX = _this$startPoint$scre2.x,
            startScreeY = _this$startPoint$scre2.y;

        var _this$getDltXY9 = this.getDltXY(e),
            dltX = _this$getDltXY9.x,
            dltY = _this$getDltXY9.y;

        var middleScreenPoint = {
          x: startScreeX + dltX,
          y: startScreeY + dltY
        };
        var middleGlobalPoint = this.map.transformScreenToGlobal(middleScreenPoint); // 数据筛选过滤无效路径节点

        var lastPoint = last_1(this.tmpPointsStore);

        if (lastPoint) {
          var lastScreenPoint = lastPoint.screen;
          var distance = Util.MathUtil.distance(lastScreenPoint, middleScreenPoint);

          if (distance <= 3) {
            return;
          }
        } // 对有效路径节点添加


        this.tmpPointsStore.push({
          screen: middleScreenPoint,
          global: middleGlobalPoint
        });

        var points = map_1(this.tmpPointsStore, function (_ref7) {
          var global = _ref7.global;
          return global;
        }); // 模式变化


        switch (this.map.mode) {
          case EMapMode.DrawMask:
            {
              // 在临时层上绘制涂抹
              this.map.overlayLayer.addDrawAction({
                points: points
              });
              break;
            }

          case EMapMode.ClearMask:
            {
              // 在涂抹层上进行删除
              this.handleMaskClearMoving({
                points: points
              });
              break;
            }
        }
      }
    }, {
      key: "handleMaskEnd",
      value: function handleMaskEnd(e) {
        this.dragging = false; // 鼠标抬起

        document.onmousemove = null;
        document.onmouseup = null;

        var maskPoints = map_1(this.tmpPointsStore, function (_ref8) {
          var global = _ref8.global;
          return global;
        });

        this.map.eventsObServer.emit(EEventType.DrawDone, this.map.mode, // drawMask | clearMask
        maskPoints);
        this.reset();
        this.handleMaskClearMoving({
          reset: true
        });
      }
    }, {
      key: "handleMaskClearMoving",
      value: function handleMaskClearMoving(_ref9) {
        var _ref9$points = _ref9.points,
            points = _ref9$points === void 0 ? [] : _ref9$points,
            _ref9$reset = _ref9.reset,
            reset = _ref9$reset === void 0 ? false : _ref9$reset;
        var mapLayers = this.map.getLayers();
        var drawingStyle = this.map.drawingStyle;
        var _drawingStyle$lineWid = drawingStyle.lineWidth,
            lineWidth = _drawingStyle$lineWid === void 0 ? 10 : _drawingStyle$lineWid;
        var scale = this.map.getScale();
        var clearWidth = lineWidth / scale;

        forEach_1(mapLayers, function (layer) {
          // 需要进行擦除动作
          if (layer.type === ELayerType.Mask && !reset) {
            var clearAction = new ClearActionFeature("".concat(+new Date()), // id
            {
              points: points,
              width: clearWidth
            }, // shape
            {}, drawingStyle);
            layer.setMovingClearAction(clearAction);
          } else if (layer.type === ELayerType.Mask && reset) {
            layer.setMovingClearAction(null);
          }
        });
      }
      /*****************************************************/

      /************** map 鼠标滑轮缩放 ***********************/

      /*****************************************************/
      // mouse在map:pan模式下进行滑轮缩放[不断重绘图层方式，性能会受影响]

    }, {
      key: "handleMapZoom",
      value: function handleMapZoom(e) {
        console.log("项目需求原因,滚动缩放被我给关闭了,哈哈哈哈,需要请把return去掉")
        return false;
        var zoomNumber = 90 + this.map.zoomWheelRatio;
        var offsetX = e.offsetX,
            offsetY = e.offsetY;
        var screen = {
          x: offsetX,
          y: offsetY
        };
        var global = this.map.transformScreenToGlobal(screen);
        var basePoint = {
          screen: screen,
          global: global
        }; // 计算缩放中心点

        var newZoom = e.deltaY < 0 ? this.map.zoom * zoomNumber / 100 // zoomIn
        : this.map.zoom * 100 / zoomNumber; // 为了返回上一次的zoom

        var screenCenter = this.map.getScreenCenter();
        var newCenter = this.map.transformScreenToGlobal(screenCenter, {
          basePoint: basePoint,
          zoom: newZoom
        });
        this.map.centerAndZoom({
          center: newCenter,
          zoom: newZoom
        }, {
          refreshDelay: true
        });
      } // // 尝试改变dom容器的scale(但是会对一些sr的圆造成放大缩小展示问题)
      // mouseWheelTimer: number | null | undefined
      // zoomScale: number = 1
      // public handleMapZoom_abort(e: WheelEvent) {
      //     if (this.mouseWheelTimer) {
      //         window.clearTimeout(this.mouseWheelTimer);
      //         this.mouseWheelTimer = null;
      //     }
      //     this.zoomScale = e.deltaY >= 0
      //         ? this.zoomScale * 95 / 100 // zoomIn
      //         : this.zoomScale * 105.263 / 100; // 为了返回上一次的zoom
      //     this.map.onZoom(this.zoomScale);
      //     this.mouseWheelTimer = window.setTimeout(() => {
      //         const newZoom = this.map.zoom / this.zoomScale;
      //         this.zoomScale = 1;
      //         this.map.reset();
      //         this.map.zoomTo(newZoom);
      //     }, 300);
      // }

      /*****************************************************/

      /************** map 双击编辑 ***********************/

      /*****************************************************/

    }, {
      key: "handleFeatureSelect",
      value: function handleFeatureSelect(e) {
        var targetFeature = this.map.getTargetFeatureWithPoint(this.startPoint.global); // 如果捕捉到，则触发事件回调

        targetFeature && this.map.eventsObServer.emit(EEventType.FeatureSelected, targetFeature);
      }
      /*****************************************************/

      /*******+**** map 鼠标捕捉activeFeature ***************/

      /*****************************************************/

    }, {
      key: "handleActiveFeatureCapture",
      value: function handleActiveFeatureCapture(e) {
        var _this11 = this;

        var offsetX = e.offsetX,
            offsetY = e.offsetY;
        var currentPoint = {
          x: offsetX,
          y: offsetY
        };
        var currentGlobalPoint = this.map.transformScreenToGlobal(currentPoint);
        var activeFeature = this.map.activeFeature;

        var _ref10 = activeFeature || {},
            type = _ref10.type,
            shape = _ref10.shape; // 重置捕捉的feature及featureIndex


        this.hoverFeature = null;
        this.hoverFeatureIndex = undefined;

        switch (type) {
          case EFeatureType.Point:
            {
              if (activeFeature.captureWithPoint(currentGlobalPoint)) {
                this.hoverFeature = activeFeature;
                this.setEventCursor(ECursorType.Pointer);
                this.map.eventLayer.breakFeatureCapture = true;
                this.setTip({
                  text: '按下移动图形/右键删除',
                  position: currentGlobalPoint
                });
              }

              break;
            }

          case EFeatureType.Rect:
          case EFeatureType.Circle:
            {
              var isRectType = type === EFeatureType.Rect; // 计算获取点集合

              var points = isRectType ? activeFeature.getPoints() : activeFeature.getEdgePoints(); // 首先进行捕捉点判断

              forEach_1(points, function (point, index) {
                // 首先判断当前点
                var sPoint = _this11.map.transformGlobalToScreen(point);

                var distance = Util.MathUtil.distance(sPoint, currentPoint);

                if (distance <= 5) {
                  _this11.hoverFeatureIndex = index;
                  var cursor = index === 1 || index === 3 ? ECursorType.NESW_Resize : ECursorType.NWSE_Resize;

                  _this11.setEventCursor(cursor);

                  _this11.map.eventLayer.breakFeatureCapture = true;

                  _this11.setTip({
                    text: '按下拖动',
                    position: currentGlobalPoint
                  });

                  return false;
                }
              }); // 如果没有捕捉到点，此时需要判断是否捕捉到图形


              if (!isNumber_1(this.hoverFeatureIndex) && activeFeature.captureWithPoint(currentGlobalPoint)) {
                this.hoverFeature = activeFeature;
                this.setEventCursor(ECursorType.Move);
                this.map.eventLayer.breakFeatureCapture = true;
                this.setTip({
                  text: '按下移动图形',
                  position: currentGlobalPoint
                });
              }

              break;
            }

          case EFeatureType.Line:
          case EFeatureType.Polyline:
          case EFeatureType.Polygon:
            {
              var isLine = type === EFeatureType.Line;
              var isPolyline = type === EFeatureType.Polyline;
              type === EFeatureType.Polygon;
              var _ref11 = shape,
                  lineStartPoint = _ref11.start,
                  lineEndPoint = _ref11.end;
              var _ref12 = shape,
                  _ref12$points = _ref12.points,
                  multiPoints = _ref12$points === void 0 ? [] : _ref12$points;

              var _points = isLine ? [lineStartPoint, lineEndPoint] : multiPoints;

              var pointsLength = _points.length; // 首先进行捕捉点判断

              forEach_1(_points, function (point, index) {
                // 首先判断当前点
                var sPoint = _this11.map.transformGlobalToScreen(point);

                var distance = Util.MathUtil.distance(sPoint, currentPoint);

                if (distance <= 5) {
                  _this11.hoverFeatureIndex = index;

                  _this11.setEventCursor(ECursorType.Pointer);

                  var minPointsCount = isLine || isPolyline ? 2 : 3;
                  var deleteTip = pointsLength > minPointsCount ? '/右键删除' : '';
                  _this11.map.eventLayer.breakFeatureCapture = true;

                  _this11.setTip({
                    text: "\u6309\u4E0B\u62D6\u52A8".concat(deleteTip),
                    position: currentGlobalPoint
                  });

                  return false;
                } // 如果是线段，不需要判断中间节点，直接判断下一节点


                if (isLine) {
                  return;
                } // 如果是多段线且最后一个节点


                if (isPolyline && !_points[index + 1]) {
                  return false;
                } // 其次判断当前点与下一点之间的中心点


                var nextPoint = _points[index + 1] || _points[0];
                var middlePoint = Util.MathUtil.getMiddlePoint(point, nextPoint);

                var sMiddlePoint = _this11.map.transformGlobalToScreen(middlePoint);

                var distance2 = Util.MathUtil.distance(sMiddlePoint, currentPoint);

                if (distance2 <= 5) {
                  _this11.hoverFeatureIndex = index + 0.5;

                  _this11.setEventCursor(ECursorType.Pointer);

                  _this11.map.eventLayer.breakFeatureCapture = true;

                  _this11.setTip({
                    text: '按下拖动添加新节点',
                    position: currentGlobalPoint
                  });

                  return false;
                }
              }); // 如果没有捕捉到点，此时需要判断是否捕捉到图形


              if (!isNumber_1(this.hoverFeatureIndex) && activeFeature.captureWithPoint(currentGlobalPoint)) {
                this.hoverFeature = activeFeature;
                this.setEventCursor(ECursorType.Move);
                this.map.eventLayer.breakFeatureCapture = true;
                this.setTip({
                  text: '按下移动图形',
                  position: currentGlobalPoint
                });
              }

              break;
            }
        }
      }
      /*****************************************************/

      /*******+**** map 捕捉到的feature鼠标按下 ***************/

      /*****************************************************/

    }, {
      key: "handleActiveFeatureStart",
      value: function handleActiveFeatureStart(e) {
        var _this12 = this;

        // 鼠标按下时清空tipLayer
        this.map.tipLayer.removeAllFeatureActionText(); // 鼠标相关变量

        var btnIndex = Util.EventUtil.getButtonIndex(e); // 鼠标左键按下

        if (btnIndex === 0) {
          this.dragging = true; // 鼠标按下态

          document.onmousemove = function (e) {
            return _this12.handleActiveFeatureMove(e);
          };

          document.onmouseup = function (e) {
            return _this12.handleActiveFeatureEnd(e);
          };
        } // 鼠标右键按下
        else if (btnIndex === 2) {
          this.handleActiveFeatureElse(e);
        }
      }
    }, {
      key: "handleActiveFeatureMove",
      value: function handleActiveFeatureMove(e) {
        var _this13 = this;

        var _this$getDltXY10 = this.getDltXY(e, {
          transform: true
        }),
            preGlobalDltX = _this$getDltXY10.x,
            preGlobalDltY = _this$getDltXY10.y;

        var _this$getDltXY11 = this.getDltXY(e, {
          transform: false
        }),
            preScreenDltX = _this$getDltXY11.x;
            _this$getDltXY11.y;

        var activeFeature = this.map.activeFeature;
        var type = activeFeature.type,
            shape = activeFeature.shape,
            style = activeFeature.style;
        var isXAxisRight = this.map.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.map.yAxis.direction === EYAxisDirection.Top;
        var globalDltX = isXAxisRight ? preGlobalDltX : -preGlobalDltX;
        var globalDltY = isYAxisTop ? preGlobalDltY : -preGlobalDltY;
        var screenDltX = isXAxisRight ? preScreenDltX : -preScreenDltX;

        switch (type) {
          case EFeatureType.Point:
            {
              var _this$map;

              var _ref13 = shape,
                  x = _ref13.x,
                  y = _ref13.y;
              this.toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), {}, {
                x: x + globalDltX,
                y: y - globalDltY
              }); // 临时层执行绘制

              this.map.overlayLayer.addActiveFeature(activeFeature);
              this.map.overlayLayer.addPointFeature(this.toUpdateShape, {
                clear: false,
                style: _objectSpread$8(_objectSpread$8({}, style), {}, {
                  fillStyle: (_this$map = this.map) === null || _this$map === void 0 ? void 0 : _this$map.editingColor
                })
              });
              break;
            }

          case EFeatureType.Circle:
            {
              var _this$map2;

              var _ref14 = shape,
                  cx = _ref14.cx,
                  cy = _ref14.cy,
                  r = _ref14.r,
                  sr = _ref14.sr;

              if (this.hoverFeature) {
                this.toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), {}, {
                  cx: cx + globalDltX,
                  cy: cy - globalDltY
                });
              } else if (isNumber_1(this.hoverFeatureIndex)) {
                this.hoverFeatureIndex === 0 || this.hoverFeatureIndex === 3;
                var isRight = this.hoverFeatureIndex === 1 || this.hoverFeatureIndex === 2;
                var circleSubtype = activeFeature.getSubType();
                var isGlobalType = circleSubtype === EFeatureCircleSubtype.Global;
                var newRadius = isGlobalType ? isRight ? r + globalDltX : r - globalDltX : isRight ? sr + screenDltX : sr - screenDltX; // 如果半径小于0不做任何处理å

                if (newRadius <= 0) {
                  console.warn('circle update error: invalid radius, radius <= 0');
                  return;
                }

                this.toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), isGlobalType ? {
                  r: newRadius
                } : {
                  sr: newRadius
                });
              }

              this.map.overlayLayer.addActiveFeature(activeFeature);
              this.map.overlayLayer.addCircleFeature(this.toUpdateShape, {
                clear: false,
                style: _objectSpread$8(_objectSpread$8({}, style), {}, {
                  lineWidth: 1,
                  strokeStyle: (_this$map2 = this.map) === null || _this$map2 === void 0 ? void 0 : _this$map2.editingColor
                })
              });
              break;
            }

          case EFeatureType.Rect:
            {
              var _this$map3;

              var _ref15 = shape,
                  _x = _ref15.x,
                  _y = _ref15.y,
                  width = _ref15.width,
                  height = _ref15.height; // 说明捕捉到了feature元素

              var newRectShape = null;

              if (this.hoverFeature) {
                newRectShape = {
                  x: _x + globalDltX,
                  y: _y - globalDltY,
                  width: width,
                  height: height
                };
              } // 说明捕捉到了feature节点
              else if (isNumber_1(this.hoverFeatureIndex)) {
                // newRectShape = {x: x + globalDltX, y: y - globalDltY, width, height};
                var _isLeft = this.hoverFeatureIndex === 0 || this.hoverFeatureIndex === 3;

                var isTop = this.hoverFeatureIndex === 0 || this.hoverFeatureIndex === 1;
                var preNewX = _isLeft ? _x + globalDltX : _x;
                var preNewY = isTop ? _y - globalDltY : _y;
                var preNewWidth = _isLeft ? width - preGlobalDltX : width + preGlobalDltX;
                var preNewHeight = isTop ? height - preGlobalDltY : height + preGlobalDltY;
                var RBX = isXAxisRight ? preNewX + preNewWidth : preNewX - preNewWidth;
                var RBY = isYAxisTop ? preNewY - preNewHeight : preNewY + preNewHeight;
                var newX = isXAxisRight ? Math.min(preNewX, RBX) : Math.max(preNewX, RBX);
                var newY = isYAxisTop ? Math.max(preNewY, RBY) : Math.min(preNewY, RBY);
                var newWidth = Math.abs(preNewWidth);
                var newHeight = Math.abs(preNewHeight);
                newRectShape = {
                  x: newX,
                  y: newY,
                  width: newWidth,
                  height: newHeight
                };
              } // 保存


              this.toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), newRectShape); // 临时层执行绘制

              this.map.overlayLayer.addActiveFeature(activeFeature);
              this.map.overlayLayer.addRectFeature(this.toUpdateShape, {
                clear: false,
                style: _objectSpread$8(_objectSpread$8({}, style), {}, {
                  lineWidth: 1,
                  strokeStyle: (_this$map3 = this.map) === null || _this$map3 === void 0 ? void 0 : _this$map3.editingColor
                })
              });
              break;
            }

          case EFeatureType.Line:
          case EFeatureType.Polyline:
          case EFeatureType.Polygon:
            {
              var _this$map4, _this$map5, _this$map6;

              var isLine = type === EFeatureType.Line;
              var isPolyline = type === EFeatureType.Polyline;
              var isPolygon = type === EFeatureType.Polygon;
              var _ref16 = shape,
                  lineStartPoint = _ref16.start,
                  lineEndPoint = _ref16.end;
              var _ref17 = shape,
                  _ref17$points = _ref17.points,
                  multiPoints = _ref17$points === void 0 ? [] : _ref17$points;
              var points = isLine ? [lineStartPoint, lineEndPoint] : multiPoints; // 说明捕捉到了feature元素

              var newPoints = [];

              if (this.hoverFeature) {
                newPoints = map_1(points, function (_ref18) {
                  var x = _ref18.x,
                      y = _ref18.y;
                  return {
                    x: x + globalDltX,
                    y: y - globalDltY
                  };
                });
              } // 说明捕捉到了feature节点
              else if (isNumber_1(this.hoverFeatureIndex)) {
                var intIndex = parseInt("".concat(this.hoverFeatureIndex), 10);

                forEach_1(points, function (_ref19, index) {
                  var x = _ref19.x,
                      y = _ref19.y;

                  // 说明是真实节点
                  if (index === intIndex && intIndex === _this13.hoverFeatureIndex) {
                    newPoints.push({
                      x: x + globalDltX,
                      y: y - globalDltY
                    });
                  } // 说明是中间节点
                  else if (index === intIndex && intIndex !== _this13.hoverFeatureIndex) {
                    // 其次判断当前点与下一点之间的中心点
                    var nextPoint = points[index + 1] || points[0];
                    var middlePoint = Util.MathUtil.getMiddlePoint({
                      x: x,
                      y: y
                    }, nextPoint);
                    newPoints.push({
                      x: x,
                      y: y
                    });
                    newPoints.push({
                      x: middlePoint.x + globalDltX,
                      y: middlePoint.y - globalDltY
                    });
                  } // 说明其他节点
                  else {
                    newPoints.push({
                      x: x,
                      y: y
                    });
                  }
                });
              } // 保存


              if (isLine) {
                var _newPoints = newPoints,
                    _newPoints2 = _slicedToArray(_newPoints, 2),
                    start = _newPoints2[0],
                    end = _newPoints2[1];

                this.toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), {}, {
                  start: start,
                  end: end
                });
              } else {
                this.toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), {}, {
                  points: newPoints
                });
              } // 临时层执行绘制


              this.map.overlayLayer.addActiveFeature(activeFeature); // 线段绘制

              isLine && this.map.overlayLayer.addLineFeature(this.toUpdateShape, {
                clear: false,
                style: _objectSpread$8(_objectSpread$8({}, style), {}, {
                  strokeStyle: (_this$map4 = this.map) === null || _this$map4 === void 0 ? void 0 : _this$map4.editingColor
                })
              }); // 多段线绘制

              isPolyline && this.map.overlayLayer.addPolylineFeature(this.toUpdateShape, {
                clear: false,
                style: _objectSpread$8(_objectSpread$8({}, style), {}, {
                  strokeStyle: (_this$map5 = this.map) === null || _this$map5 === void 0 ? void 0 : _this$map5.editingColor
                })
              }); // 多边形绘制

              isPolygon && this.map.overlayLayer.addPolygonFeature(this.toUpdateShape, {
                clear: false,
                style: _objectSpread$8(_objectSpread$8({}, style), {}, {
                  lineWidth: 1,
                  strokeStyle: (_this$map6 = this.map) === null || _this$map6 === void 0 ? void 0 : _this$map6.editingColor
                })
              });
              break;
            }
        }

        this.map.eventsObServer.emit(EEventType.Draging, this.map.activeFeature, this.toUpdateShape);
      }
    }, {
      key: "handleActiveFeatureEnd",
      value: function handleActiveFeatureEnd(e) {
        this.dragging = false; // 鼠标抬起

        document.onmousemove = null;
        document.onmouseup = null;
        this.map.overlayLayer.removeAllFeatureActionText();
        var activeFeature = this.map.activeFeature; // 首先需要恢复选中要素的选中态

        activeFeature && this.map.overlayLayer.addActiveFeature(activeFeature); // 如果存在更新数据

        if (this.toUpdateShape && activeFeature) {
          // 然后进行事件回调处理事件
          var type = activeFeature.type;

          switch (type) {
            case EFeatureType.Point:
            case EFeatureType.Circle:
            case EFeatureType.Line:
            case EFeatureType.Polyline:
            case EFeatureType.Rect:
            case EFeatureType.Polygon:
              {
                this.map.eventsObServer.emit(EEventType.FeatureUpdated, activeFeature, this.toUpdateShape);
                break;
              }
          } // 重置还原


          this.toUpdateShape = null;
        }
      } // 鼠标右键事件处理

    }, {
      key: "handleActiveFeatureElse",
      value: function handleActiveFeatureElse(e) {
        var activeFeature = this.map.activeFeature; // 如果存在更新数据

        if (activeFeature) {
          var type = activeFeature.type,
              shape = activeFeature.shape;

          switch (type) {
            case EFeatureType.Point:
              {
                this.map.eventsObServer.emit(EEventType.FeatureDeleted, activeFeature);
                break;
              }

            case EFeatureType.Polyline:
            case EFeatureType.Polygon:
              {
                var isPolyline = type === EFeatureType.Polyline;
                type === EFeatureType.Polygon;
                var minPointsCount = isPolyline ? 2 : 3;
                var _ref20 = shape,
                    _ref20$points = _ref20.points,
                    points = _ref20$points === void 0 ? [] : _ref20$points; // 如果捕捉到节点 && 当前点的个数大于minPointsCount个点【有可供删除的节点】

                if (isNumber_1(this.hoverFeatureIndex) && points.length > minPointsCount) {
                  var intIndex = parseInt("".concat(this.hoverFeatureIndex), 10); // 说明此时需要删除右键单击的真实节点

                  if (intIndex === this.hoverFeatureIndex) {
                    var newPoints = filter_1(points, function (__, index) {
                      return index !== intIndex;
                    }); // 修正后的shape数据返回


                    var toUpdateShape = _objectSpread$8(_objectSpread$8({}, shape), {}, {
                      points: newPoints
                    });

                    this.map.eventsObServer.emit(EEventType.FeatureUpdated, activeFeature, toUpdateShape);
                  }
                }

                break;
              }
          }
        }
      }
      /*****************************************************/

      /********* mousemove过程中进行捕捉feature判断[临时方案，耗性能] ***********/

      /*****************************************************/

    }, {
      key: "handleFeatureCapture",
      value: function handleFeatureCapture(point) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _option$extraTip = option.extraTip,
            extraTip = _option$extraTip === void 0 ? '' : _option$extraTip;
        var drawing = this.dragging || this.tmpPointsStore.length; // 首先判断用户是否开启捕捉

        if (!this.map.featureCaptureWhenMove || drawing) {
          return;
        } // 进行捕捉判断


        var targetFeature = this.map.getTargetFeatureWithPoint(point); // 如果捕捉到，则触发事件回调

        targetFeature && this.setTip({
          text: (extraTip ? extraTip + '/' : '') + '双击选中',
          position: point
        }); // // 清楚timeout-timer
        // this.clearMousemoveTimer();
        // // 重置breakFeatureCapture为非打断状态
        // this.breakFeatureCapture = false;
        // this.mousemoveTimer = window.setTimeout(() => {
        //     // 如果已被后续逻辑重置打断，则直接返回
        //     if (this.breakFeatureCapture) {
        //         return;
        //     }
        //     // 进行捕捉判断
        //     const targetFeature = this.map.getTargetFeatureWithPoint(point);
        //     // 如果捕捉到，则触发事件回调
        //     targetFeature && this.setTip({
        //         text: (extraTip ? extraTip + '/' : '') + '双击选中',
        //         position: point
        //     });
        // }, 200);
      } // 清除mousemove过程捕捉feature的防抖timer

    }, {
      key: "clearMousemoveTimer",
      value: function clearMousemoveTimer() {
        if (this.mousemoveTimer) {
          window.clearTimeout(this.mousemoveTimer);
          this.mousemoveTimer = null;
        }
      } // 获取mouse事件point

    }, {
      key: "getMouseEventPoint",
      value: function getMouseEventPoint(e) {
        // 相关坐标值处理
        var offsetX = e.offsetX,
            offsetY = e.offsetY; // 记录起始坐标

        var screen = {
          x: offsetX,
          y: offsetY
        };
        var global = this.map.transformScreenToGlobal(screen);
        return {
          screen: screen,
          global: global
        };
      }
      /*****************************************************/

      /**************** map 事件绑定 ************************/

      /*****************************************************/
      // onMouseDown: 事件绑定

    }, {
      key: "onMouseDown",
      value: function onMouseDown(e) {
        // 相关坐标值处理
        var screenX = e.screenX,
            screenY = e.screenY; // 设置保存起始坐标

        this.startPoint = this.getMouseEventPoint(e);
        this.startPageScreenPoint = {
          x: screenX,
          y: screenY
        };
        var mapMode = this.map.mode;
        var dragging = this.dragging;

        var isCapturedFeature = this.hoverFeature || isNumber_1(this.hoverFeatureIndex);

        var drawing = !dragging && !isCapturedFeature; // 对外暴露事件执行

        this.map.eventsObServer.emit(EEventType.MouseDown, this.startPoint); // 首先判断是否是取消选中

        if (this.map.activeFeature && !isCapturedFeature) {
          this.map.eventsObServer.emit(EEventType.FeatureUnselected, this.map.activeFeature, 'cancel by click');
          return;
        }

        var btnIndex = Util.EventUtil.getButtonIndex(e); // 如果存在捕捉到feature或者featureIndex

        var validCaptured = isCapturedFeature && !dragging; // 鼠标左键按下

        if (btnIndex !== 0 && !validCaptured) {
          return;
        }

        if (mapMode === EMapMode.Ban) {
          // 禁用任何逻辑判断
          return;
        } else if (mapMode === EMapMode.Pan && drawing) {
          this.handleMapPanStart(e);
        } else if (mapMode === EMapMode.MARKER && drawing) {
          this.handleMarkerStart(e);
        } else if (mapMode === EMapMode.Point && drawing) {
          this.handlePointStart(e);
        } else if (mapMode === EMapMode.Circle && drawing) {
          this.handleCircleStart(e);
        } else if (mapMode === EMapMode.Line && drawing) {
          this.handleLineStart(e);
        } else if (mapMode === EMapMode.Polyline && drawing) {
          this.handlePolylineStart(e);
        } else if (mapMode === EMapMode.Rect && drawing) {
          this.handleRectStart(e);
        } else if (mapMode === EMapMode.Polygon && drawing) {
          this.handlePolygonStart(e);
        } else if ((mapMode === EMapMode.DrawMask || mapMode === EMapMode.ClearMask) && drawing) {
          // 绘制｜清除涂抹
          this.handleMaskStart(e);
        }

        if (validCaptured) {
          this.handleActiveFeatureStart(e);
        }
      } // onMouseMove: 事件绑定

    }, {
      key: "onMouseMove",
      value: function onMouseMove(e) {
        // 实时记录mouseMoveEvent事件对象
        this.mouseMoveEvent = e; // 获取move坐标

        var _this$getMouseEventPo = this.getMouseEventPoint(e),
            screen = _this$getMouseEventPo.screen,
            global = _this$getMouseEventPo.global; // 后续对应模式处理


        var mapMode = this.map.mode;
        var dragging = this.dragging; // 对外暴露事件执行

        this.map.eventsObServer.emit(EEventType.MouseMove, {
          screen: screen,
          global: global
        });

        if (!this.map.activeFeature && !dragging) {
          // 首先清空临时层
          this.map.overlayLayer.removeAllFeatureActionText();
        }

        if (mapMode === EMapMode.Ban) {
          // 禁用任何逻辑判断
          return;
        } else if (mapMode === EMapMode.Pan && !dragging) {
          this.setEventCursor(ECursorType.Grab);
        } else if (mapMode === EMapMode.MARKER && !dragging) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);
        } else if (mapMode === EMapMode.Point && !dragging) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);
          this.setTip({
            text: '点击绘制点',
            position: global
          });
          this.handleFeatureCapture(global);
        } else if (mapMode === EMapMode.Circle) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);

          if (!dragging) {
            this.setTip({
              text: '按下确定圆心',
              position: global
            });
            this.handleFeatureCapture(global);
          }
        } else if (mapMode === EMapMode.Line && !dragging) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);
          this.handleLineMove(e);
          this.handleFeatureCapture(global);
        } else if (mapMode === EMapMode.Polyline && !dragging) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);
          this.handlePolylineMove(e);
          this.handleFeatureCapture(global);
        } else if (mapMode === EMapMode.Rect) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);

          if (!dragging) {
            this.setTip({
              text: '按下确定起点',
              position: global
            });
            this.handleFeatureCapture(global);
          }
        } else if (mapMode === EMapMode.Polygon && !dragging) {
          this.setEventCursor(ECursorType.Crosshair, {}, global);
          this.handlePolygonMove(e);
          this.handleFeatureCapture(global);
        } else if (mapMode === EMapMode.DrawMask) {
          var lineWidth = get_1(this.map.drawingStyle, 'lineWidth', 1);

          this.setEventCursor(EUrlCursorType.DrawMask, {
            type: EFeatureType.Circle,
            shape: {
              sr: lineWidth / 2,
              cx: global.x,
              cy: global.y
            }
          });
        } else if (mapMode === EMapMode.ClearMask) {
          var _lineWidth = get_1(this.map.drawingStyle, 'lineWidth', 1);

          this.setEventCursor(EUrlCursorType.ClearMask, {
            type: EFeatureType.Circle,
            shape: {
              sr: _lineWidth / 2,
              cx: global.x,
              cy: global.y
            }
          });
        } // 首先判断是否是取消选中


        if (this.map.activeFeature && !dragging) {
          this.setTip({
            text: '单击取消选中',
            position: global
          });
        } // 编辑态，平移捕捉


        if (includes_1([EMapMode.Point, EMapMode.Circle, EMapMode.Line, EMapMode.Polyline, EMapMode.Rect, EMapMode.Polygon], mapMode) && !dragging) {
          // 如果存在activeFeature, 此时需要进行捕捉
          this.handleActiveFeatureCapture(e);
        }
      } // onMouseUp: 事件绑定

    }, {
      key: "onMouseUp",
      value: function onMouseUp(e) {
        // 对外暴露事件执行
        this.map.eventsObServer.emit(EEventType.MouseUp, this.getMouseEventPoint(e));
      } // 单击事件

    }, {
      key: "onMouseClick",
      value: function onMouseClick(e) {
        // 对外暴露事件执行
        this.map.eventsObServer.emit(EEventType.Click, this.getMouseEventPoint(e));
      } // onMouseDblClick: 事件绑定-双击事件

    }, {
      key: "onMouseDblClick",
      value: function onMouseDblClick(e) {
        // 判断是否在绘制或者编辑拖拽过程中
        var mapMode = this.map.mode;
        this.clearDownTimer();
        var drawing = this.dragging || this.tmpPointsStore.length; // 对外暴露事件执行

        this.map.eventsObServer.emit(EEventType.DblClick, this.getMouseEventPoint(e));

        if (mapMode === EMapMode.Ban) {
          // 禁用任何逻辑判断
          return;
        } else if (mapMode === EMapMode.Polyline && drawing) {
          this.handlePolylineEnd(e);
        } else if (mapMode === EMapMode.Polygon && drawing) {
          this.handlePolygonEnd(e);
        } // 编辑态，平移捕捉


        if (includes_1([EMapMode.Point, EMapMode.Circle, EMapMode.Line, EMapMode.Polyline, EMapMode.Rect, EMapMode.Polygon], mapMode) && !drawing) {
          this.handleFeatureSelect(e);
        }
      } // onMouseWheel: 鼠标滑动

    }, {
      key: "onMouseWheel",
      value: function onMouseWheel(e) {
        var mapMode = this.map.mode;
        mapMode !== EMapMode.Ban && e.preventDefault(); // 后续对应模式处理

        switch (mapMode) {
          case EMapMode.Ban:
            {
              // 啥都不做
              break;
            }

          case EMapMode.Pan:
            {
              this.handleMapZoom(e);
              break;
            }

          default:
            {
              // 需要判断在绘制过程中是否允许缩放
              if (this.map.zoomWhenDrawing) {
                this.handleMapZoom(e);
              }

              break;
            }
        }
      } // 清除计时器timer

    }, {
      key: "clearPanWhenDrawingTimer",
      value: function clearPanWhenDrawingTimer() {
        if (this.panWhenDrawingTimer) {
          window.clearInterval(this.panWhenDrawingTimer);
          this.panWhenDrawingTimer = null;
        }
      } // 绘制过程中启用平移视野

    }, {
      key: "handlePanWhenDrawing",
      value: function handlePanWhenDrawing(e) {
        var _this14 = this;

        var directionIndex = Util.EventUtil.getMouseDirection(this.map.wrapperDom, e);
        this.clearPanWhenDrawingTimer();
        var panScreenDistance = 10; // 每次平移10个像素
        // 如果map设置不允许自动平移 || 没有进行任何绘制点时

        if (!this.map.panWhenDrawing || !this.tmpPointsStore.length) {
          return;
        }

        this.panWhenDrawingTimer = window.setInterval(function () {
          var scale = _this14.map.getScale();

          var panGlobalDistance = panScreenDistance / scale;

          var center = _this14.map.getCenter();

          var isXAxisRight = _this14.map.xAxis.direction === EXAxisDirection.Right;
          var isYAxisTop = _this14.map.yAxis.direction === EYAxisDirection.Top;
          var newCenter = center;

          switch (directionIndex) {
            case 0:
              {
                // 上
                newCenter = {
                  x: center.x,
                  y: isYAxisTop ? center.y + panGlobalDistance : center.y - panGlobalDistance
                };
                break;
              }

            case 1:
              {
                // 右
                newCenter = {
                  x: isXAxisRight ? center.x + panGlobalDistance : center.x - panGlobalDistance,
                  y: center.y
                };
                break;
              }

            case 2:
              {
                // 下
                newCenter = {
                  x: center.x,
                  y: isYAxisTop ? center.y - panGlobalDistance : center.y + panGlobalDistance
                };
                break;
              }

            case 3:
              {
                // 左
                newCenter = {
                  x: isXAxisRight ? center.x - panGlobalDistance : center.x + panGlobalDistance,
                  y: center.y
                };
                break;
              }
          }

          _this14.map.setCenter(newCenter);
        }, 100);
      } // onMouseOut: 鼠标移出

    }, {
      key: "onMouseOut",
      value: function onMouseOut(e) {
        e.preventDefault(); // 清空文字提示层

        this.map.tipLayer.removeAllFeatureActionText(); // 清空十字丝辅助层

        this.map.supportLayer.removeAllSupports(); // 清空鼠标矢量

        this.map.cursorLayer.removeAllFeatureActionText(); // 如果在绘制过程中，此时需要判断是否需要自动平移视野
        // 如果平移到marker上，做忽略处理

        if (e.toElement) {
          var eleDataType = e.toElement.getAttribute('data-type');

          if (eleDataType === EMarkerType.Marker) {
            return;
          }
        }

        this.handlePanWhenDrawing(e); // 对外暴露事件执行

        this.map.eventsObServer.emit(EEventType.MouseOut, this.getMouseEventPoint(e));
      } // onMouseOver: 鼠标移入

    }, {
      key: "onMouseOver",
      value: function onMouseOver(e) {
        e.preventDefault(); // 清空文字提示层

        this.map.tipLayer.removeAllFeatureActionText(); // 清除绘制过程中timer

        this.clearPanWhenDrawingTimer(); // 对外暴露事件执行

        this.map.eventsObServer.emit(EEventType.MouseOver, this.getMouseEventPoint(e));
      } // 撤销临时绘制点集

    }, {
      key: "revokeTmpPointsStore",
      value: function revokeTmpPointsStore() {
        if (!this.tmpPointsStore.length) {
          return;
        }

        this.tmpPointsStore.pop();
        var mouseMoveEvent = this.mouseMoveEvent;
        mouseMoveEvent && this.onMouseMove(mouseMoveEvent);
      } // 设置文字提示

    }, {
      key: "setTip",
      value: function setTip(textInfo) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.map.drawingTip) {
          this.map.tipLayer.addText(textInfo, option);
        } else {
          this.map.tipLayer.removeAllFeatureActionText();
        }
      } // 设置十字丝[绘制过程中十字丝]

    }, {
      key: "setCrosshair",
      value: function setCrosshair(pointInfo) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.map.drawingCrosshair) {
          this.map.supportLayer.addCrosshair(pointInfo, option);
        } else {
          this.map.supportLayer.removeAllSupports();
        }
      } // 设置鼠标样式

    }, {
      key: "setEventCursor",
      value: function setEventCursor(cursorType) {
        var mapCursorOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var globalPoint = arguments.length > 2 ? arguments[2] : undefined;
        this.map.setCursor(cursorType, mapCursorOption); // 十字丝逻辑处理

        if (globalPoint && this.map.drawingCrosshair) {
          this.setCrosshair(globalPoint);
        } else {
          this.map.supportLayer.removeAllSupports();
        }
      } // 重置drawing过程中产生的临时数据&清空临时绘制层

    }, {
      key: "reset",
      value: function reset() {
        // 绘制完成之后进行this.tmpPointsStore清空处理
        this.tmpPointsStore = []; // 清空overlayLayer

        this.map.overlayLayer.removeAllFeatureActionText(); // 清空tipLayer

        this.map.tipLayer.removeAllFeatureActionText();
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        _get(_getPrototypeOf(EventLayer.prototype), "refresh", this).call(this);
      }
    }]);

    return EventLayer;
  }(Layer$1);

  // 格式
  var IMAGE_FORMAT = {
    BASE64: 'base64',
    BLOB: 'blob'
  };

  var ExportHelperLayer = /*#__PURE__*/function () {
    // canvas大小
    // 当前maskLayer中所有的actions
    // 伪造map对象，给feature使用
    // function: constructor
    function ExportHelperLayer(bounds) {
      _classCallCheck(this, ExportHelperLayer);

      _defineProperty$1(this, "objects", []);

      _defineProperty$1(this, "map", {
        // 空属性/方法
        activeFeature: null,
        setActiveFeature: function setActiveFeature() {},
        getScale: function getScale() {
          return 1;
        },
        transformGlobalToScreen: function transformGlobalToScreen(point) {
          var x = point.x,
              y = point.y;
          var _this$bounds = this.bounds,
              startX = _this$bounds.x,
              startY = _this$bounds.y;
          return {
            x: x - startX,
            y: y - startY
          };
        }
      });

      this.bounds = bounds;
      this.createRenderCanvas(); // 对象冒充运行环境

      this.map.getScale = this.map.getScale.bind(this);
      this.map.transformGlobalToScreen = this.map.transformGlobalToScreen.bind(this);
    } // override 创建Canvas层


    _createClass(ExportHelperLayer, [{
      key: "createRenderCanvas",
      value: function createRenderCanvas() {
        var _this$bounds2 = this.bounds,
            width = _this$bounds2.width,
            height = _this$bounds2.height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width * CanvasLayer.dpr;
        this.canvas.height = height * CanvasLayer.dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.canvasContext = this.canvas.getContext('2d');
        Graphic.drawRect(this.canvasContext, {
          x: 0,
          y: 0,
          width: this.canvas.width,
          height: this.canvas.height
        }, {
          fill: true,
          fillStyle: '#fff',
          stroke: false
        });
      } // 添加object至当前HelperLayer中

    }, {
      key: "addObject",
      value: function addObject(object) {
        object.onAdd(this);
        this.objects.push(object);
      } // 添加objects至当前HelperLayer中

    }, {
      key: "addObjects",
      value: function addObjects(objects) {
        var _this = this;

        forEach_1(objects, function (object) {
          return _this.addObject(object);
        });
      } // 添加imag至当前canvas

    }, {
      key: "putImage",
      value: function putImage(image) {
        this.canvasContext.drawImage(image, 0, 0);
      } // 添加图片

    }, {
      key: "addImageLayer",
      value: function addImageLayer(imageLayer) {
        // 执行坐标转换
        var _this$map$transformGl = this.map.transformGlobalToScreen(imageLayer.position),
            screenX = _this$map$transformGl.x,
            screenY = _this$map$transformGl.y;

        var dpr = CanvasLayer.dpr;
        var scale = this.map.getScale();
        var _imageLayer$imageInfo = imageLayer.imageInfo,
            width = _imageLayer$imageInfo.width,
            height = _imageLayer$imageInfo.height;
        var screenWidth = width * scale;
        var screenHeight = height * scale;
        imageLayer.image && imageLayer.imageSuccess && Graphic.drawImage(this.canvasContext, {
          image: imageLayer.image,
          x: screenX * dpr,
          y: screenY * dpr,
          width: screenWidth * dpr,
          height: screenHeight * dpr
        }, {});
      }
      /**
       * type: 输出类型，目前支持base64/blob两种格式
       * format: 图片格式： ‘image/png ｜ image/jpeg’,
       * quality：图片质量
       */

    }, {
      key: "convertCanvasToImage",
      value: function convertCanvasToImage(type, format, quality) {
        if (type === IMAGE_FORMAT.BASE64) {
          return this.convertCanvasToBase64(format, quality);
        } else if (type === IMAGE_FORMAT.BLOB) {
          return this.convertCanvasToBlob(format, quality);
        }

        return new Promise(function (resolve, reject) {
          reject(new Error('export params error：' + type));
        });
      } // 转blob

    }, {
      key: "convertCanvasToBlob",
      value: function convertCanvasToBlob(format, quality) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          _this2.canvas.toBlob(function (blob) {
            _this2.canvas = null;
            var _this2$bounds = _this2.bounds,
                width = _this2$bounds.width,
                height = _this2$bounds.height;

            _this2.resizeBlobImage(blob, {
              width: width,
              height: height
            }, format, resolve, reject);
          }, format, quality);
        });
      } // 重设图片大小

    }, {
      key: "resizeBlobImage",
      value: function resizeBlobImage(blob, size) {
        var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/png';
        var resolve = arguments.length > 3 ? arguments[3] : undefined;
        var reject = arguments.length > 4 ? arguments[4] : undefined;
        var image = new Image();
        var url = URL.createObjectURL(blob);
        image.src = url; // create an off-screen canvas

        var width = size.width,
            height = size.height;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d'); // set its dimension to target size

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        image.onload = function () {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url); // drawImage

          ctx.drawImage(image, 0, 0, width, height);
          canvas.toBlob(function (blob) {
            canvas = null;
            resolve(blob);
          }, format, 1);
        };

        image.onerror = function () {
          reject(new Error('resize image error'));
        };
      } // 转base64

    }, {
      key: "convertCanvasToBase64",
      value: function convertCanvasToBase64(format, quality) {
        // 获取base64
        var base64 = this.canvas.toDataURL(format); // 释放内存

        this.canvas = null; // resize图片大小（因为dpr的存在，会导致大小变成dpr倍）

        var _this$bounds3 = this.bounds,
            width = _this$bounds3.width,
            height = _this$bounds3.height;
        return this.resizeBase64Image(base64, {
          width: width,
          height: height
        }, format);
      } // 重设图片大小

    }, {
      key: "resizeBase64Image",
      value: function resizeBase64Image(base64, size) {
        var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/png';
        var image = new Image();
        image.src = base64; // create an off-screen canvas

        var width = size.width,
            height = size.height;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d'); // set its dimension to target size

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        return new Promise(function (resolve, reject) {
          image.onload = function () {
            // drawImage
            ctx.drawImage(image, 0, 0, width, height);
            resolve(canvas.toDataURL(format));
          };

          image.onerror = function () {
            reject(new Error('resize image error'));
          };
        });
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        // 绘制objects中所有object对象
        forEach_1(this.objects, function (object) {
          return object.refresh();
        });
      } // 清空canvas画布

    }, {
      key: "clear",
      value: function clear() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      } // // 格式转换
      // _fixImageType(format: string) {
      //     format = format.toLowerCase().replace(/jpg/i, 'jpeg');
      //     const r = format.match(/png|jpeg|bmp|gif/)[0];
      //     return 'image/' + r;
      // }
      // // 测试图片下载
      // _testImageDownload(downloadUrl: string, fileName: string = 'export.png'){
      //     let aLink = document.createElement('a');
      //     aLink.style.display = 'none';
      //     aLink.href = downloadUrl;
      //     aLink.download = fileName;
      //     // 触发点击-然后移除
      //     document.body.appendChild(aLink);
      //     aLink.click();
      //     document.body.removeChild(aLink);
      // }

    }]);

    return ExportHelperLayer;
  }();

  var Feature$1 = /*#__PURE__*/function () {
    // featureId
    // featureType
    // props
    // 对象空间数据结构
    // 最小外接矩形
    // 平移feature的步长，默认1个屏幕项目

    /**
     * props: feature样式
     * defaultStyle: 默认配置项
     * style: userFeatureStyle merge defaultStyle
    */
    // function: constructor
    function Feature(id, type) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Feature);

      this.id = id;
      this.type = type;
      this.props = props;
      this.style = assign_1({}, Feature.defaultStyle, style);
    } // function: trigger when feature add to featureLayer


    _createClass(Feature, [{
      key: "onAdd",
      value: function onAdd(layer) {
        this.layer = layer;
        this.refresh();
      } // trigger when layer remove from map
      // map exits first

    }, {
      key: "onRemove",
      value: function onRemove() {
        var _this$layer, _this$layer$map;

        // 如果map上的activeFeature 为 当前feature，此时需要同步更新map.activeFeature
        var activeFeature = (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.activeFeature;

        if (activeFeature && activeFeature.id === this.id) {
          this.layer.map.setActiveFeature(null);
        }
      } // 获取最小外接矩形[各子类自行实现]

    }, {
      key: "getBounds",
      value: function getBounds() {
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      } // 判断是否捕捉到当前对象，各子类自行实现

    }, {
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        return false;
      } // 更新图形坐标

    }, {
      key: "updateShape",
      value: function updateShape(shape) {
        var _this$layer2, _this$layer3, _this$layer3$map;

        this.shape = shape;
        (_this$layer2 = this.layer) === null || _this$layer2 === void 0 ? void 0 : _this$layer2.refresh(); // 如果map上的activeFeature 为 当前feature，此时需要同步更新map.activeFeature

        var activeFeature = (_this$layer3 = this.layer) === null || _this$layer3 === void 0 ? void 0 : (_this$layer3$map = _this$layer3.map) === null || _this$layer3$map === void 0 ? void 0 : _this$layer3$map.activeFeature;

        if (activeFeature && activeFeature.id === this.id) {
          this.layer.map.setActiveFeature(this);
        }
      } // 移动feature, 各子类自行实现对应方法

    }, {
      key: "onMove",
      value: function onMove(direction) {} // 改变样式

    }, {
      key: "setStyle",
      value: function setStyle(style, option) {
        var _this$layer4;

        var _option$refresh = option.refresh,
            refresh = _option$refresh === void 0 ? true : _option$refresh;
        this.style = style;
        refresh && ((_this$layer4 = this.layer) === null || _this$layer4 === void 0 ? void 0 : _this$layer4.refresh());
      } // 刷新当前数据

    }, {
      key: "refresh",
      value: function refresh() {} // 打印测试输出

    }, {
      key: "printInfo",
      value: function printInfo() {}
    }]);

    return Feature;
  }();

  _defineProperty$1(Feature$1, "moveStep", 1);

  _defineProperty$1(Feature$1, "defaultStyle", {
    opacity: 1,
    fillStyle: 'rgba(255, 0, 0, 0)',
    lineWidth: 1,
    strokeStyle: '#000' // 边框颜色

  });

  function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var PointFeature = /*#__PURE__*/function (_Feature) {
    _inherits(PointFeature, _Feature);

    var _super = _createSuper$h(PointFeature);

    // PointFeature附件选项，附加字段
    // function: constructor
    function PointFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var option = arguments.length > 4 ? arguments[4] : undefined;

      _classCallCheck(this, PointFeature);

      _this = _super.call(this, id, EFeatureType.Point, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "option", {});

      _this.shape = shape;
      _this.option = assign_1({}, PointFeature.defaultOption, option || {});
      return _this;
    } // @override
    // 判断是否捕捉到当前对象，各子类自行实现


    _createClass(PointFeature, [{
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        var _this$layer, _this$layer$map;

        var _ref = this.shape,
            x = _ref.x,
            y = _ref.y,
            r = _ref.r,
            sr = _ref.sr;
        var mapScale = (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.getScale();
        var buffer = mapScale ? 3 / mapScale : 0;
        var tolerance = isNumber_1(r) ? r + buffer : isNumber_1(sr) ? sr / mapScale + buffer : buffer;
        return Util.MathUtil.pointInPoint(point, {
          x: x,
          y: y
        }, {
          tolerance: tolerance
        });
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer2;

        // 执行坐标转换
        var _ref2 = this.shape,
            x = _ref2.x,
            y = _ref2.y,
            r = _ref2.r,
            sr = _ref2.sr;

        if (!((_this$layer2 = this.layer) !== null && _this$layer2 !== void 0 && _this$layer2.map)) {
          return;
        }

        var _this$layer$map$trans = this.layer.map.transformGlobalToScreen({
          x: x,
          y: y
        }),
            screenX = _this$layer$map$trans.x,
            screenY = _this$layer$map$trans.y;

        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale();
        var screenWidth = isNumber_1(r) ? r * scale : isNumber_1(sr) ? sr : 2;
        var cx = screenX * dpr;
        var cy = screenY * dpr;
        var cr = screenWidth * dpr;
        Graphic.drawPoint(this.layer.canvasContext, {
          x: cx,
          y: cy,
          r: cr
        }, this.style, {}); // 说明是选中态，需要绘制边框&交叉线

        if (this.option.active) {
          var LTX = cx - cr - 2;
          var LTY = cy - cr - 2;
          var width = cr * 2 + 4;
          var height = cr * 2 + 4; // 绘制对角线

          var RTX = LTX + width;
          var RTY = LTY;
          var RBX = RTX;
          var RBY = RTY + height;
          var LBX = LTX;
          var LBY = RBY; // 绘制斜对角线

          Graphic.drawLine(this.layer.canvasContext, {
            start: {
              x: LTX,
              y: LTY
            },
            end: {
              x: RBX,
              y: RBY
            }
          }, {
            strokeStyle: '#fff'
          });
          Graphic.drawLine(this.layer.canvasContext, {
            start: {
              x: RTX,
              y: RTY
            },
            end: {
              x: LBX,
              y: LBY
            }
          }, {
            strokeStyle: '#fff'
          }); // 绘制外接矩形

          Graphic.drawRect(this.layer.canvasContext, {
            x: LTX,
            y: LTY,
            width: width,
            height: height
          }, {
            strokeStyle: '#666'
          });
        }
      }
    }]);

    return PointFeature;
  }(Feature$1);

  _defineProperty$1(PointFeature, "defaultOption", {
    active: false // 是否绘制选中态，默认不是选中态【内部使用/内部使用/内部使用】

  });

  function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var LineFeature = /*#__PURE__*/function (_Feature) {
    _inherits(LineFeature, _Feature);

    var _super = _createSuper$g(LineFeature);

    // function: constructor
    function LineFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, LineFeature);

      _this = _super.call(this, id, EFeatureType.Line, props, style);
      _this.shape = shape;
      return _this;
    } // @override
    // 判断是否捕捉到当前对象，各子类自行实现


    _createClass(LineFeature, [{
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        var _this$layer, _this$layer$map;

        var _ref = this.shape,
            start = _ref.start,
            end = _ref.end,
            width = _ref.width;
        var mapScale = (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.getScale();
        var bufferWidth = mapScale ? 3 / mapScale : 0;
        var tolerance = isNumber_1(width) ? width / 2 + bufferWidth : bufferWidth;
        return Util.MathUtil.pointInPolyline(point, [start, end], {
          tolerance: tolerance
        });
      } // 获取线宽

    }, {
      key: "getLineWidth",
      value: function getLineWidth() {
        var _this$layer2, _this$layer2$map;

        var _ref2 = this.shape,
            width = _ref2.width;
        var styleLineWidth = this.style.lineWidth || 1;
        var scale = (_this$layer2 = this.layer) === null || _this$layer2 === void 0 ? void 0 : (_this$layer2$map = _this$layer2.map) === null || _this$layer2$map === void 0 ? void 0 : _this$layer2$map.getScale();
        return width ? width * scale : styleLineWidth;
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer3;

        if (!((_this$layer3 = this.layer) !== null && _this$layer3 !== void 0 && _this$layer3.map)) {
          return;
        } // 执行坐标转换


        var _ref3 = this.shape,
            start = _ref3.start,
            end = _ref3.end,
            width = _ref3.width;

        var _this$layer$map$trans = this.layer.map.transformGlobalToScreen(start),
            startX = _this$layer$map$trans.x,
            startY = _this$layer$map$trans.y;

        var _this$layer$map$trans2 = this.layer.map.transformGlobalToScreen(end),
            endX = _this$layer$map$trans2.x,
            endY = _this$layer$map$trans2.y;

        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale();
        var screenWidth = (width || 0) * scale;
        var lineWidth = this.getLineWidth(); // // draw the starting arrowhead
        // var startRadians=Math.atan((y2-y1)/(x2-x1));
        // startRadians+=((x2>x1)?-90:90)*Math.PI/180;
        // draw the ending arrowhead

        var endRadians = Math.atan((endY - startY) / (endX - startX));
        endRadians += (endX > startX ? 90 : -90) * Math.PI / 180;
        var xDistance = lineWidth * 1.2 * dpr;
        var bufferDltY = lineWidth * 1.4 * dpr; // 判断是否绘制箭头

        if (this.style.arrow) {
          Graphic.drawArrow(this.layer.canvasContext, {
            position: {
              x: endX * dpr,
              y: endY * dpr
            },
            points: [{
              x: 0 * dpr,
              y: 0 - bufferDltY
            }, {
              x: xDistance,
              y: xDistance * 2 - bufferDltY
            }, {
              x: -xDistance,
              y: xDistance * 2 - bufferDltY
            }]
          }, endRadians, _objectSpread$7(_objectSpread$7({}, this.style), {}, {
            lineWidth: 2
          }, this.style.strokeStyle ? {
            fillStyle: this.style.strokeStyle
          } : {}));
        } // 绘制线段


        Graphic.drawLine(this.layer.canvasContext, _objectSpread$7({
          start: {
            x: startX * dpr,
            y: startY * dpr
          },
          end: {
            x: endX * dpr,
            y: endY * dpr
          }
        }, isNumber_1(width) ? {
          width: screenWidth * dpr
        } : {}), this.style, {});
      }
    }]);

    return LineFeature;
  }(Feature$1);

  function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var PolylineFeature = /*#__PURE__*/function (_Feature) {
    _inherits(PolylineFeature, _Feature);

    var _super = _createSuper$f(PolylineFeature);

    // function: constructor
    function PolylineFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, PolylineFeature);

      _this = _super.call(this, id, EFeatureType.Polyline, props, style);
      _this.shape = shape;
      return _this;
    } // @override
    // 判断是否捕捉到当前对象，各子类自行实现


    _createClass(PolylineFeature, [{
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        var _this$layer, _this$layer$map;

        var _ref = this.shape,
            _ref$points = _ref.points,
            points = _ref$points === void 0 ? [] : _ref$points,
            width = _ref.width;
        var mapScale = (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.getScale();
        var bufferWidth = mapScale ? 3 / mapScale : 0;
        var tolerance = isNumber_1(width) ? width / 2 + bufferWidth : bufferWidth;
        return Util.MathUtil.pointInPolyline(point, points, {
          tolerance: tolerance
        });
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer2,
            _this2 = this;

        if (!((_this$layer2 = this.layer) !== null && _this$layer2 !== void 0 && _this$layer2.map)) {
          return;
        } // 执行坐标转换


        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale();
        Graphic.drawPolyline(this.layer.canvasContext, this.shape, this.style, {
          format: function format(shape) {
            var points = shape.points,
                width = shape.width;
            return _objectSpread$6({
              points: map_1(points, function (point) {
                var _this2$layer$map$tran = _this2.layer.map.transformGlobalToScreen(point),
                    screenX = _this2$layer$map$tran.x,
                    screenY = _this2$layer$map$tran.y;

                return {
                  x: screenX * dpr,
                  y: screenY * dpr
                };
              })
            }, isNumber_1(width) ? {
              width: width * scale * dpr
            } : {});
          }
        });
      }
    }]);

    return PolylineFeature;
  }(Feature$1);

  function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var RectFeature = /*#__PURE__*/function (_Feature) {
    _inherits(RectFeature, _Feature);

    var _super = _createSuper$e(RectFeature);

    // function: constructor
    function RectFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, RectFeature);

      _this = _super.call(this, id, EFeatureType.Rect, props, style);
      _this.shape = shape;
      return _this;
    } // @override
    // 判断是否捕捉到当前对象，各子类自行实现


    _createClass(RectFeature, [{
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        var rectPoints = this.getPoints();
        return Util.MathUtil.pointInPolygon(point, rectPoints);
      } // 获取rect矩形的四个点

    }, {
      key: "getPoints",
      value: function getPoints() {
        var _this$layer, _this$layer$map, _this$layer2, _this$layer2$map;

        var isXAxisLeft = ((_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.xAxis.direction) === EXAxisDirection.Left;
        var isYAxisBottom = ((_this$layer2 = this.layer) === null || _this$layer2 === void 0 ? void 0 : (_this$layer2$map = _this$layer2.map) === null || _this$layer2$map === void 0 ? void 0 : _this$layer2$map.yAxis.direction) === EYAxisDirection.Bottom;
        var _ref = this.shape,
            startX = _ref.x,
            startY = _ref.y,
            width = _ref.width,
            height = _ref.height;
        var endX = !isXAxisLeft ? startX + width : startX - width;
        var endY = !isYAxisBottom ? startY - height : startY + height; // 矩形点

        return [{
          x: startX,
          y: startY
        }, {
          x: endX,
          y: startY
        }, {
          x: endX,
          y: endY
        }, {
          x: startX,
          y: endY
        }];
      } // 移动feature
      // @override

    }, {
      key: "onMove",
      value: function onMove(direction) {
        var _this$layer3, _this$layer3$map, _this$layer4, _this$layer4$map, _this$layer4$map$xAxi, _this$layer5, _this$layer5$map, _this$layer5$map$yAxi, _this$layer6, _this$layer6$map, _this$layer6$map$even;

        var moveStep = Feature$1.moveStep; // 每次移动步长

        var _ref2 = this.shape,
            x = _ref2.x,
            y = _ref2.y;
        var scale = (_this$layer3 = this.layer) === null || _this$layer3 === void 0 ? void 0 : (_this$layer3$map = _this$layer3.map) === null || _this$layer3$map === void 0 ? void 0 : _this$layer3$map.getScale();
        var isXAxisLeft = ((_this$layer4 = this.layer) === null || _this$layer4 === void 0 ? void 0 : (_this$layer4$map = _this$layer4.map) === null || _this$layer4$map === void 0 ? void 0 : (_this$layer4$map$xAxi = _this$layer4$map.xAxis) === null || _this$layer4$map$xAxi === void 0 ? void 0 : _this$layer4$map$xAxi.direction) === EXAxisDirection.Left;
        var isYAxisBottom = ((_this$layer5 = this.layer) === null || _this$layer5 === void 0 ? void 0 : (_this$layer5$map = _this$layer5.map) === null || _this$layer5$map === void 0 ? void 0 : (_this$layer5$map$yAxi = _this$layer5$map.yAxis) === null || _this$layer5$map$yAxi === void 0 ? void 0 : _this$layer5$map$yAxi.direction) === EYAxisDirection.Bottom;
        var newStep = moveStep / scale;
        var newPosition = {}; // 新的feature：xy位置信息

        switch (direction) {
          case EDirection.UP:
            {
              newPosition = {
                y: isYAxisBottom ? y - newStep : y + newStep
              };
              break;
            }

          case EDirection.DOWN:
            {
              newPosition = {
                y: isYAxisBottom ? y + newStep : y - newStep
              };
              break;
            }

          case EDirection.LEFT:
            {
              newPosition = {
                x: isXAxisLeft ? x + newStep : x - newStep
              };
              break;
            }

          case EDirection.RIGHT:
            {
              newPosition = {
                x: isXAxisLeft ? x - newStep : x + newStep
              };
              break;
            }
        } // 回调函数告知业务层


        var toUpdateShape = _objectSpread$5(_objectSpread$5({}, this.shape), newPosition);

        (_this$layer6 = this.layer) === null || _this$layer6 === void 0 ? void 0 : (_this$layer6$map = _this$layer6.map) === null || _this$layer6$map === void 0 ? void 0 : (_this$layer6$map$even = _this$layer6$map.eventsObServer) === null || _this$layer6$map$even === void 0 ? void 0 : _this$layer6$map$even.emit(EEventType.FeatureUpdated, this, toUpdateShape);
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer7,
            _this2 = this;

        if (!((_this$layer7 = this.layer) !== null && _this$layer7 !== void 0 && _this$layer7.map)) {
          return;
        }

        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale();
        Graphic.drawRect(this.layer.canvasContext, this.shape, this.style, {
          format: function format(shape) {
            var x = shape.x,
                y = shape.y,
                width = shape.width,
                height = shape.height;

            var _this2$layer$map$tran = _this2.layer.map.transformGlobalToScreen({
              x: x,
              y: y
            }),
                screenX = _this2$layer$map$tran.x,
                screenY = _this2$layer$map$tran.y;

            var screenWidth = width * scale;
            var screenHeight = height * scale;
            return {
              x: screenX * dpr,
              y: screenY * dpr,
              width: screenWidth * dpr,
              height: screenHeight * dpr
            };
          }
        });
      }
    }]);

    return RectFeature;
  }(Feature$1);

  function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var PolygonFeature = /*#__PURE__*/function (_Feature) {
    _inherits(PolygonFeature, _Feature);

    var _super = _createSuper$d(PolygonFeature);

    // function: constructor
    function PolygonFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, PolygonFeature);

      _this = _super.call(this, id, EFeatureType.Polygon, props, style);
      _this.shape = shape;
      return _this;
    } // @override
    // 判断是否捕捉到当前对象，各子类自行实现


    _createClass(PolygonFeature, [{
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        var _ref = this.shape,
            _ref$points = _ref.points,
            points = _ref$points === void 0 ? [] : _ref$points;
        return Util.MathUtil.pointInPolygon(point, points);
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer,
            _this2 = this;

        if (!((_this$layer = this.layer) !== null && _this$layer !== void 0 && _this$layer.map)) {
          return;
        } // 执行坐标转换


        var _ref2 = this.shape,
            points = _ref2.points;
            _ref2.inner;
        var dpr = CanvasLayer.dpr;
        Graphic.drawPolygon(this.layer.canvasContext, points, this.style, {
          format: function format(point) {
            var _this2$layer$map$tran = _this2.layer.map.transformGlobalToScreen(point),
                screenX = _this2$layer$map$tran.x,
                screenY = _this2$layer$map$tran.y;

            return {
              x: screenX * dpr,
              y: screenY * dpr
            };
          }
        });
      }
    }]);

    return PolygonFeature;
  }(Feature$1);

  function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var CircleFeature = /*#__PURE__*/function (_Feature) {
    _inherits(CircleFeature, _Feature);

    var _super = _createSuper$c(CircleFeature);

    // PointFeature附件选项，附加字段
    // function: constructor
    function CircleFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var option = arguments.length > 4 ? arguments[4] : undefined;

      _classCallCheck(this, CircleFeature);

      _this = _super.call(this, id, EFeatureType.Circle, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "option", {});

      _this.shape = shape;
      _this.option = assign_1({}, CircleFeature.defaultOption, option || {});
      return _this;
    } // 根据shape设置subtype属性


    _createClass(CircleFeature, [{
      key: "getSubType",
      value: function getSubType() {
        var _ref = this.shape,
            r = _ref.r,
            sr = _ref.sr;

        if (isNumber_1(r)) {
          return EFeatureCircleSubtype.Global;
        } else if (isNumber_1(sr)) {
          return EFeatureCircleSubtype.Screen;
        }
      } // @override
      // 判断是否捕捉到当前对象，各子类自行实现

    }, {
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        var _this$layer, _this$layer$map;

        var isGlobalSubtype = this.getSubType() === EFeatureCircleSubtype.Global;
        var isScreenSubtype = this.getSubType() === EFeatureCircleSubtype.Screen;
        var _ref2 = this.shape,
            cx = _ref2.cx,
            cy = _ref2.cy,
            r = _ref2.r,
            sr = _ref2.sr;
        var mapScale = (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.getScale();
        var buffer = mapScale ? 3 / mapScale : 0;
        var tolerance = isGlobalSubtype ? r + buffer : isScreenSubtype ? sr / mapScale + buffer : buffer;
        return Util.MathUtil.pointInPoint(point, {
          x: cx,
          y: cy
        }, {
          tolerance: tolerance
        });
      } // // @override
      // // 获取最小外接矩形
      // getBounds(): IRectShape {
      //     const isGlobalSubtype = this.getSubType() === EFeatureCircleSubtype.Global;
      //     const {cx, cy, r, sr} = this.shape as ICircleShape;
      //     const radius = isGlobalSubtype ? r : (_isNumber(sr) ? sr : 0);
      //     const width = radius * 2;
      //     const height = radius * 2;
      // }
      // 获取4个边界点：如果用户传入的是sr屏幕半径坐标，则返回的点集会随视野变化发生变化

    }, {
      key: "getEdgePoints",
      value: function getEdgePoints() {
        var _this$layer2, _this$layer2$map, _this$layer3, _this$layer3$map;

        var isGlobalSubtype = this.getSubType() === EFeatureCircleSubtype.Global;
        var isScreenSubtype = this.getSubType() === EFeatureCircleSubtype.Screen;
        var isXAxisLeft = ((_this$layer2 = this.layer) === null || _this$layer2 === void 0 ? void 0 : (_this$layer2$map = _this$layer2.map) === null || _this$layer2$map === void 0 ? void 0 : _this$layer2$map.xAxis.direction) === EXAxisDirection.Left;
        var isYAxisBottom = ((_this$layer3 = this.layer) === null || _this$layer3 === void 0 ? void 0 : (_this$layer3$map = _this$layer3.map) === null || _this$layer3$map === void 0 ? void 0 : _this$layer3$map.yAxis.direction) === EYAxisDirection.Bottom;
        var _ref3 = this.shape,
            cx = _ref3.cx,
            cy = _ref3.cy,
            r = _ref3.r,
            sr = _ref3.sr;
        var radius = isGlobalSubtype ? r : isScreenSubtype ? sr : 0;
        var halfRadius = Math.sqrt(radius * radius / 2);
        var xHalfRadius = !isXAxisLeft ? halfRadius : -halfRadius;
        var yHalfRadius = !isYAxisBottom ? halfRadius : -halfRadius;

        if (isGlobalSubtype) {
          return [{
            x: cx - xHalfRadius,
            y: cy + yHalfRadius
          }, // 左上
          {
            x: cx + xHalfRadius,
            y: cy + yHalfRadius
          }, // 右上
          {
            x: cx + xHalfRadius,
            y: cy - yHalfRadius
          }, // 右下
          {
            x: cx - xHalfRadius,
            y: cy - yHalfRadius
          } // 左下
          ];
        } else if (isScreenSubtype) {
          var _this$layer4, _this$layer4$map;

          var scale = (_this$layer4 = this.layer) === null || _this$layer4 === void 0 ? void 0 : (_this$layer4$map = _this$layer4.map) === null || _this$layer4$map === void 0 ? void 0 : _this$layer4$map.getScale();

          if (!scale) {
            console.error('circle getEdgePoints error: no added to layer or map');
            return [];
          }

          var globalRadius = halfRadius / scale;
          var xGlobalRadius = !isXAxisLeft ? globalRadius : -globalRadius;
          var yHGlobalRadius = !isYAxisBottom ? globalRadius : -globalRadius;
          return [{
            x: cx - xGlobalRadius,
            y: cy + yHGlobalRadius
          }, // 左上
          {
            x: cx + xGlobalRadius,
            y: cy + yHGlobalRadius
          }, // 右上
          {
            x: cx + xGlobalRadius,
            y: cy - yHGlobalRadius
          }, // 右下
          {
            x: cx - xGlobalRadius,
            y: cy - yHGlobalRadius
          } // 左下
          ];
        } else {
          console.error('circle getEdgePoints error: no valid radius');
          return [];
        }
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer5,
            _this2 = this;

        if (!((_this$layer5 = this.layer) !== null && _this$layer5 !== void 0 && _this$layer5.map)) {
          return;
        }

        var isGlobalSubtype = this.getSubType() === EFeatureCircleSubtype.Global;
        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale();
        Graphic.drawCircle(this.layer.canvasContext, this.shape, this.style, // style
        {
          format: function format(shape) {
            var cx = shape.cx,
                cy = shape.cy,
                r = shape.r,
                sr = shape.sr;
            var screenWidth = isGlobalSubtype ? r * scale : isNumber_1(sr) ? sr : 2;

            var _this2$layer$map$tran = _this2.layer.map.transformGlobalToScreen({
              x: cx,
              y: cy
            }),
                globalX = _this2$layer$map$tran.x,
                globalY = _this2$layer$map$tran.y;

            return {
              cx: globalX * dpr,
              cy: globalY * dpr,
              r: screenWidth * dpr
            };
          }
        }); // 说明是选中态，需要绘制边界节点

        if (this.option.active) {
          var edgePoints = this.getEdgePoints();

          forEach_1(edgePoints, function (point) {
            var cx = point.x,
                cy = point.y;
            Graphic.drawCircle(_this2.layer.canvasContext, {
              sr: 3.5,
              cx: cx,
              cy: cy
            }, {
              strokeStyle: '#666',
              fillStyle: '#fff',
              stroke: true,
              fill: true,
              lineWidth: 1
            }, {
              format: function format(shape) {
                var cx = shape.cx,
                    cy = shape.cy,
                    sr = shape.sr;
                var screenWidth = sr;

                var _this2$layer$map$tran2 = _this2.layer.map.transformGlobalToScreen({
                  x: cx,
                  y: cy
                }),
                    globalX = _this2$layer$map$tran2.x,
                    globalY = _this2$layer$map$tran2.y;

                return {
                  cx: globalX * dpr,
                  cy: globalY * dpr,
                  r: screenWidth * dpr
                };
              }
            });
          });
        }
      }
    }]);

    return CircleFeature;
  }(Feature$1);

  _defineProperty$1(CircleFeature, "defaultOption", {
    active: false // 是否绘制选中态，默认不是选中态【内部使用/内部使用/内部使用】

  });

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var DrawActionFeature = /*#__PURE__*/function (_Action) {
    _inherits(DrawActionFeature, _Action);

    var _super = _createSuper$b(DrawActionFeature);

    // 当前涂抹action分类
    // function: constructor
    function DrawActionFeature(id, category, shape) {
      var _this;

      var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      _classCallCheck(this, DrawActionFeature);

      _this = _super.call(this, id, EMaskActionType.Draw, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "category", '');

      _this.shape = shape;
      _this.category = category;
      return _this;
    } // 执行绘制当前
    // @override


    _createClass(DrawActionFeature, [{
      key: "refresh",
      value: function refresh() {
        var _this2 = this;

        // 执行坐标转换
        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale(); // 设置倒圆角

        var formateStyle = _objectSpread$4(_objectSpread$4({}, this.style || {}), {}, {
          lineCap: 'round',
          lineJoin: 'round'
        });

        Graphic.drawPolyline(this.layer.canvasContext, this.shape, formateStyle, {
          format: function format(shape) {
            var points = shape.points,
                width = shape.width;
            return _objectSpread$4({
              points: map_1(points, function (point) {
                var _this2$layer$map$tran = _this2.layer.map.transformGlobalToScreen(point),
                    screenX = _this2$layer$map$tran.x,
                    screenY = _this2$layer$map$tran.y;

                return {
                  x: screenX * dpr,
                  y: screenY * dpr
                };
              })
            }, isNumber_1(width) ? {
              width: width * scale * dpr
            } : {});
          }
        });
      }
    }]);

    return DrawActionFeature;
  }(Action);

  var ETextType;

  (function (ETextType) {
    ETextType["Text"] = "TEXT";
  })(ETextType || (ETextType = {}));

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  var Text = /*#__PURE__*/function () {
    // textId
    // textType
    // props
    // text-container

    /**
     * props: feature样式
     * defaultStyle: 默认配置项
     * style: userFeatureStyle merge defaultStyle
    */

    /**
     * props: text文本
     * defaultTextInfo: 默认文本配置项
     * style: userTextInfo merge defaultTextInfo
    */
    // function: constructor
    function Text(id, text) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Text);

      this.id = id;
      this.type = ETextType.Text;
      this.props = props;
      this.textInfo = assign_1({}, Text.defaultTextInfo, text);
      this.style = assign_1({}, Text.defaultStyle, style);
    } // function: trigger when feature add to featureLayer


    _createClass(Text, [{
      key: "onAdd",
      value: function onAdd(layer) {
        this.layer = layer;
        this.refresh();
      } // trigger when control remove from layer
      // layer exits first

    }, {
      key: "onRemove",
      value: function onRemove() {} // 更新text

    }, {
      key: "updateText",
      value: function updateText(text) {
        if (isString_1(text) && text) {
          var _this$layer;

          var textInfo = this.textInfo;
          this.textInfo = _objectSpread$3(_objectSpread$3({}, textInfo), {}, {
            text: text
          });
          (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : _this$layer.refresh();
        }
      } // 更新text位置

    }, {
      key: "updatePosition",
      value: function updatePosition(position) {
        var _this$layer2;

        var textInfo = this.textInfo;
        this.textInfo = _objectSpread$3(_objectSpread$3({}, textInfo), {}, {
          position: position
        });
        (_this$layer2 = this.layer) === null || _this$layer2 === void 0 ? void 0 : _this$layer2.refresh();
      } // 刷新当前数据

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer3,
            _this = this;

        if (!((_this$layer3 = this.layer) !== null && _this$layer3 !== void 0 && _this$layer3.map)) {
          return;
        }

        var textInfo = this.textInfo;
        var dpr = CanvasLayer.dpr;
        Graphic.drawText(this.layer.canvasContext, textInfo, this.style, {
          format: function format(info) {
            var position = info.position,
                offset = info.offset;

            var _this$layer$map$trans = _this.layer.map.transformGlobalToScreen(position),
                screenX = _this$layer$map$trans.x,
                screenY = _this$layer$map$trans.y;

            var offsetX = offset.x,
                offsetY = offset.y;
            return _objectSpread$3(_objectSpread$3({}, info), {}, {
              position: {
                x: screenX * dpr,
                y: screenY * dpr
              },
              offset: {
                x: offsetX * dpr,
                y: offsetY * dpr
              }
            });
          }
        });
      } // 打印测试输出

    }, {
      key: "printInfo",
      value: function printInfo() {}
    }]);

    return Text;
  }();

  _defineProperty$1(Text, "defaultStyle", {
    opacity: 1,
    strokeStyle: '#FF0000',
    background: true,
    // 是否有背景色
    fontColor: '#FFFFFF',
    // 字体颜色
    fillStyle: '#FF0000',
    font: 'normal 12px Arial',
    textAlign: 'left',
    textBaseline: 'bottom'
  });

  _defineProperty$1(Text, "defaultTextInfo", {
    text: '',
    position: {
      x: 0,
      y: 0
    },
    // 文本位置
    offset: {
      x: 0,
      y: 0
    } // 文本偏移量

  });

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var OverlayLayer = /*#__PURE__*/function (_CanvasLayer) {
    _inherits(OverlayLayer, _CanvasLayer);

    var _super = _createSuper$a(OverlayLayer);

    // 当前featureLayer中所有的features
    // 默认active的样式
    // 默认text文本的样式
    // function: constructor
    function OverlayLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, OverlayLayer);

      _this = _super.call(this, id, ELayerType.Overlay, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "featureActionTexts", []);

      _defineProperty$1(_assertThisInitialized(_this), "defaultActiveFeatureStyle", {
        strokeStyle: '#FF0000',
        fillStyle: '#FF0000',
        lineWidth: 1
      });

      _defineProperty$1(_assertThisInitialized(_this), "defaultTextStyle", {
        fillStyle: '#FFFFFF',
        strokeStyle: '#D2691E',
        background: true,
        globalAlpha: 1,
        fontColor: '#333',
        font: 'normal 10px Arial',
        textBaseline: 'top'
      });

      return _this;
    } // 添加feature至当前FeatureLayer中


    _createClass(OverlayLayer, [{
      key: "addFeatureActionText",
      value: function addFeatureActionText(feature, option) {
        var _ref = option || {},
            _ref$clear = _ref.clear,
            clear = _ref$clear === void 0 ? false : _ref$clear;

        clear && this.removeAllFeatureActionText();
        feature.onAdd(this);
        this.featureActionTexts.push(feature);
      } // 添加point

    }, {
      key: "addPointFeature",
      value: function addPointFeature(shape) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = option.style,
            _option$clear = option.clear,
            clear = _option$clear === void 0 ? true : _option$clear,
            _option$active = option.active,
            active = _option$active === void 0 ? false : _option$active;
        var feature = new PointFeature("".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || this.map.drawingStyle, // style
        {
          active: active
        });
        this.addFeatureActionText(feature, {
          clear: clear
        });
      } // 添加line

    }, {
      key: "addLineFeature",
      value: function addLineFeature(shape) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = option.style,
            _option$clear2 = option.clear,
            clear = _option$clear2 === void 0 ? true : _option$clear2;
        var feature = new LineFeature("".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || this.map.drawingStyle // style
        );
        this.addFeatureActionText(feature, {
          clear: clear
        }); // 节点绘制

        var _ref2 = shape,
            start = _ref2.start,
            end = _ref2.end;
        this.addDrawingPoints([start, end]);
      } // 添加polyline

    }, {
      key: "addPolylineFeature",
      value: function addPolylineFeature(shape) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = option.style,
            _option$clear3 = option.clear,
            clear = _option$clear3 === void 0 ? true : _option$clear3;
        var feature = new PolylineFeature("".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || this.map.drawingStyle // style
        );
        this.addFeatureActionText(feature, {
          clear: clear
        }); // 节点绘制

        this.addDrawingPoints(shape.points);
      } // 添加rect

    }, {
      key: "addRectFeature",
      value: function addRectFeature(shape) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = option.style,
            _option$clear4 = option.clear,
            clear = _option$clear4 === void 0 ? true : _option$clear4;
        var feature = new RectFeature("".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || this.map.drawingStyle // style
        );
        this.addFeatureActionText(feature, {
          clear: clear
        });
        var rectPoints = feature.getPoints();
        this.addDrawingPoints(rectPoints);
      } // 添加polygon

    }, {
      key: "addPolygonFeature",
      value: function addPolygonFeature(shape) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = option.style,
            _option$clear5 = option.clear,
            clear = _option$clear5 === void 0 ? true : _option$clear5;
        var feature = new PolygonFeature( // 为了非闭合多段线
        "".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || this.map.drawingStyle // style
        );
        this.addFeatureActionText(feature, {
          clear: clear
        }); // 节点绘制

        this.addDrawingPoints(shape.points);
      } // 添加circle

    }, {
      key: "addCircleFeature",
      value: function addCircleFeature(shape, option) {
        var _ref3 = option || {},
            _ref3$clear = _ref3.clear,
            clear = _ref3$clear === void 0 ? true : _ref3$clear,
            style = _ref3.style,
            _ref3$active = _ref3.active,
            active = _ref3$active === void 0 ? false : _ref3$active;

        var feature = new CircleFeature("".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || this.map.drawingStyle, // style
        {
          active: active
        });
        this.addFeatureActionText(feature, {
          clear: clear
        });
      } // 添加涂抹action

    }, {
      key: "addDrawAction",
      value: function addDrawAction(shape) {
        var action = new DrawActionFeature("".concat(+new Date()), // id
        'drawAction', shape, // shape
        {}, // props
        this.map.drawingStyle // style
        );
        this.addFeatureActionText(action, {
          clear: true
        });
      } // 添加文本

    }, {
      key: "addText",
      value: function addText(textInfo, option) {
        var _ref4 = option || {},
            _ref4$clear = _ref4.clear,
            clear = _ref4$clear === void 0 ? true : _ref4$clear;

        var text = new Text("".concat(+new Date()), // id
        _objectSpread$2(_objectSpread$2({}, textInfo), {}, {
          offset: {
            x: 5,
            y: -5
          }
        }), // shape
        {}, // props
        this.defaultTextStyle // style
        );
        this.addFeatureActionText(text, {
          clear: clear
        });
      } // 绘制当前activeFeature

    }, {
      key: "addActiveFeature",
      value: function addActiveFeature(feature) {
        if (!feature) {
          this.removeAllFeatureActionText();
          return;
        } // 高亮的样式


        var style = this.defaultActiveFeatureStyle; // 做一下深度克隆，避免原有feature被污染[暂时不做克隆，效率太低]
        // const activeFeature = _cloneDeep(feature);

        var type = feature.type,
            shape = feature.shape;

        switch (type) {
          case EFeatureType.Point:
            {
              this.addPointFeature(shape, {
                style: style,
                active: true
              });
              break;
            }

          case EFeatureType.Line:
            {
              this.addLineFeature(shape, {
                style: style
              });
              break;
            }

          case EFeatureType.Polyline:
            {
              this.addPolylineFeature(shape, {
                style: style
              });
              this.addActiveMiddlePoints(shape.points, {
                withClose: false
              });
              break;
            }

          case EFeatureType.Rect:
            {
              this.addRectFeature(shape, {
                style: style
              });
              break;
            }

          case EFeatureType.Polygon:
            {
              this.addPolygonFeature(shape, {
                style: style
              });
              this.addActiveMiddlePoints(shape.points, {
                withClose: true
              });
              break;
            }

          case EFeatureType.Circle:
            {
              this.addCircleFeature(shape, {
                style: style,
                active: true
              });
              break;
            }
        }
      } // 绘制节点中间高亮点

    }, {
      key: "addActiveMiddlePoints",
      value: function addActiveMiddlePoints(points) {
        var _this2 = this;

        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _option$withClose = option.withClose,
            withClose = _option$withClose === void 0 ? true : _option$withClose;

        forEach_1(points, function (point, index) {
          var nextPoint = withClose ? points[index + 1] || points[0] : points[index + 1];

          if (!nextPoint) {
            return;
          }

          var middlePoint = Util.MathUtil.getMiddlePoint(point, nextPoint);

          _this2.addDrawingPoint(middlePoint, {
            strokeStyle: '#228B22',
            withAddIcon: true,
            isMiddlePoint: true
          });
        });
      } // 绘制过程中节点

    }, {
      key: "addDrawingPoints",
      value: function addDrawingPoints(points) {
        var _this3 = this;

        forEach_1(points, function (point) {
          _this3.addDrawingPoint(point);
        });
      } // 绘制节点

    }, {
      key: "addDrawingPoint",
      value: function addDrawingPoint(point) {
        var _this$map, _this$map2;

        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _option$strokeStyle = option.strokeStyle,
            strokeStyle = _option$strokeStyle === void 0 ? '#666' : _option$strokeStyle,
            _option$fillStyle = option.fillStyle,
            fillStyle = _option$fillStyle === void 0 ? '#fff' : _option$fillStyle,
            _option$withAddIcon = option.withAddIcon,
            withAddIcon = _option$withAddIcon === void 0 ? false : _option$withAddIcon,
            _option$iconColor = option.iconColor,
            iconColor = _option$iconColor === void 0 ? '#228B22' : _option$iconColor,
            _option$isMiddlePoint = option.isMiddlePoint,
            isMiddlePoint = _option$isMiddlePoint === void 0 ? false : _option$isMiddlePoint;
        var cx = point.x,
            cy = point.y; // EEventSlotType.DrawActivePoint 插槽拦截处理

        var onDrawActivePoint = (_this$map = this.map) === null || _this$map === void 0 ? void 0 : _this$map.slotsObServer[EEventSlotType.DrawActivePoint];

        if (!isMiddlePoint && isFunction_1(onDrawActivePoint)) {
          var res = onDrawActivePoint(point, this);

          if (res === false) {
            return;
          }
        }

        var onDrawActiveMiddlePoint = (_this$map2 = this.map) === null || _this$map2 === void 0 ? void 0 : _this$map2.slotsObServer[EEventSlotType.DrawActiveMiddlePoint];

        if (isMiddlePoint && isFunction_1(onDrawActiveMiddlePoint)) {
          var _res = onDrawActiveMiddlePoint(point, this);

          if (_res === false) {
            return;
          }
        }
        this.addCircleFeature({
          sr: 3.5,
          cx: cx,
          cy: cy
        }, {
          clear: false,
          style: {
            strokeStyle: strokeStyle,
            fillStyle: fillStyle,
            stroke: true,
            fill: true,
            lineWidth: 1
          }
        }); // 绘制+号

        if (withAddIcon) {
          this.addCircleFeature({
            sr: 1.25,
            cx: cx,
            cy: cy
          }, {
            clear: false,
            style: {
              fillStyle: iconColor,
              stroke: false,
              fill: true
            }
          });
        }
      } // 清空所有子对象

    }, {
      key: "removeAllFeatureActionText",
      value: function removeAllFeatureActionText() {
        this.featureActionTexts = [];
        this.clear();
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        _get(_getPrototypeOf(OverlayLayer.prototype), "refresh", this).call(this);

        forEach_1(this.featureActionTexts, function (featureActionText) {
          return featureActionText.refresh();
        });
      }
    }]);

    return OverlayLayer;
  }(CanvasLayer);

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var SupportLayer = /*#__PURE__*/function (_CanvasLayer) {
    _inherits(SupportLayer, _CanvasLayer);

    var _super = _createSuper$9(SupportLayer);

    // 当前supportLayer中所有的supports
    // 默认text文本的样式
    // 默认feature的样式
    // function: constructor
    function SupportLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, SupportLayer);

      _this = _super.call(this, id, ELayerType.Support, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "supports", []);

      return _this;
    } // 添加feature至当前FeatureLayer中


    _createClass(SupportLayer, [{
      key: "addSupports",
      value: function addSupports(feature, option) {
        var _ref = option || {},
            _ref$clear = _ref.clear,
            clear = _ref$clear === void 0 ? false : _ref$clear;

        clear && this.removeAllSupports();
        feature.onAdd(this);
        this.supports.push(feature);
      } // 添加文本

    }, {
      key: "addText",
      value: function addText(textInfo, option) {
        var _ref2 = option || {},
            style = _ref2.style,
            _ref2$clear = _ref2.clear,
            clear = _ref2$clear === void 0 ? true : _ref2$clear;

        var text = new Text("".concat(+new Date()), // id
        _objectSpread$1(_objectSpread$1({}, textInfo), {}, {
          offset: {
            x: 5,
            y: -5
          }
        }), // shape
        {}, // props
        style || SupportLayer.defaultTextStyle // style
        );
        this.addSupports(text, {
          clear: clear
        });
      } // 添加line

    }, {
      key: "addLineFeature",
      value: function addLineFeature(shape) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = option.style,
            _option$clear = option.clear,
            clear = _option$clear === void 0 ? true : _option$clear;
        var feature = new LineFeature("".concat(+new Date()), // id
        shape, // shape
        {}, // props
        style || SupportLayer.defaultFeatureStyle // style
        );
        this.addSupports(feature, {
          clear: clear
        });
      } // 绘制全屏十字丝

    }, {
      key: "addCrosshair",
      value: function addCrosshair(pointInfo) {
        var mouseGlobalX = pointInfo.x,
            mouseGlobalY = pointInfo.y;

        var _this$map$getBounds = this.map.getBounds(),
            x = _this$map$getBounds.x,
            y = _this$map$getBounds.y,
            width = _this$map$getBounds.width,
            height = _this$map$getBounds.height; // 水平线


        var horizontalLineStartPoint = {
          x: x,
          y: mouseGlobalY
        };
        var horizontalLineEndPoint = {
          x: x + width,
          y: mouseGlobalY
        }; // 垂直线

        var verticalLineStartPoint = {
          x: mouseGlobalX,
          y: y
        };
        var verticalLineEndPoint = {
          x: mouseGlobalX,
          y: y - height
        };
        this.addLineFeature({
          start: horizontalLineStartPoint,
          end: horizontalLineEndPoint
        }, {
          clear: true
        });
        this.addLineFeature({
          start: verticalLineStartPoint,
          end: verticalLineEndPoint
        }, {
          clear: false
        });
      } // 清空所有子对象

    }, {
      key: "removeAllSupports",
      value: function removeAllSupports() {
        this.supports = [];
        this.clear();
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        _get(_getPrototypeOf(SupportLayer.prototype), "refresh", this).call(this);

        forEach_1(this.supports, function (support) {
          return support.refresh();
        });
      }
    }]);

    return SupportLayer;
  }(CanvasLayer);

  _defineProperty$1(SupportLayer, "defaultTextStyle", {
    fillStyle: '#FFFFFF',
    strokeStyle: '#D2691E',
    background: true,
    globalAlpha: 1,
    fontColor: '#333',
    font: 'normal 10px Arial',
    textBaseline: 'top'
  });

  _defineProperty$1(SupportLayer, "defaultFeatureStyle", {
    fillStyle: '#FFFFFF',
    strokeStyle: '#D2691E',
    background: true,
    globalAlpha: .3,
    fontColor: '#333',
    font: 'normal 10px Arial',
    textBaseline: 'top'
  });

  var baseIteratee$1 = _baseIteratee,
      isArrayLike = isArrayLike_1,
      keys = keys_1;

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */
  function createFind$1(findIndexFunc) {
    return function(collection, predicate, fromIndex) {
      var iterable = Object(collection);
      if (!isArrayLike(collection)) {
        var iteratee = baseIteratee$1(predicate);
        collection = keys(collection);
        predicate = function(key) { return iteratee(iterable[key], key, iterable); };
      }
      var index = findIndexFunc(collection, predicate, fromIndex);
      return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    };
  }

  var _createFind = createFind$1;

  var baseFindIndex = _baseFindIndex,
      baseIteratee = _baseIteratee,
      toInteger = toInteger_1;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */
  function findIndex$1(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return -1;
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
      index = nativeMax(length + index, 0);
    }
    return baseFindIndex(array, baseIteratee(predicate), index);
  }

  var findIndex_1 = findIndex$1;

  var createFind = _createFind,
      findIndex = findIndex_1;

  /**
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */
  var find = createFind(findIndex);

  var find_1 = find;

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var MarkerLayer = /*#__PURE__*/function (_Layer) {
    _inherits(MarkerLayer, _Layer);

    var _super = _createSuper$8(MarkerLayer);

    // 当前MarkerLayer中所有的markers
    // function: constructor
    function MarkerLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, MarkerLayer);

      _this = _super.call(this, id, ELayerType.Marker, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "markers", []);

      return _this;
    } // 添加marker至当前MarkerLayer中


    _createClass(MarkerLayer, [{
      key: "addMarker",
      value: function addMarker(marker, option) {
        marker.onAdd(this);
        this.markers.push(marker);
      } // 删除marker

    }, {
      key: "removeMarkerById",
      value: function removeMarkerById(targetMarkerId) {
        var newMarkers = filter_1(this.markers, function (marker) {
          var markerId = marker.id;

          if (markerId === targetMarkerId) {
            marker.onRemove();
            return false;
          }

          return true;
        }); // 重新设置最新的markers


        this.markers = newMarkers;
        this.refresh();
      } // 获取指定marker对象

    }, {
      key: "getMarkerById",
      value: function getMarkerById(targetMarkerId) {
        return find_1(this.markers, function (_ref) {
          var id = _ref.id;
          return id === targetMarkerId;
        });
      } // 获取所有markers

    }, {
      key: "getAllMarkers",
      value: function getAllMarkers() {
        return this.markers;
      } // 删除所有markers

    }, {
      key: "removeAllMarkers",
      value: function removeAllMarkers() {
        var newMarkers = filter_1(this.markers, function (marker) {
          marker.onRemove();
          return false;
        }); // 重新设置最新的markers


        this.markers = newMarkers;
        this.refresh();
      } // @override 重写container大小，设置为0

    }, {
      key: "resize",
      value: function resize() {
        this.dom.style.width = '0px';
        this.dom.style.height = '0px';
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        _get(_getPrototypeOf(MarkerLayer.prototype), "refresh", this).call(this);

        forEach_1(this.markers, function (marker) {
          return marker.refresh();
        });
      }
    }]);

    return MarkerLayer;
  }(Layer$1);

  var Map = /*#__PURE__*/function () {
    // 用户侧传入的dom
    // props: domId / dom
    // props: layerDomId / layerDom
    // props: platformDomId / platformDom
    // props: layerDom2Id / layerDom2
    // props: controlDomId / controlDom

    /**
     * props: map可选初始化配置项
     * defaultMapOptions: 默认配置项
     * mapOptions: userMapOptions merge defaultMapOptions
    */
    // 左上角代表的实际坐标值
    // 当前map中包含的controls
    // 当前map中包含的layers
    // 绘制状态下相关样式设置
    // 绘制状态下鼠标旁提示文案开关[默认开启]
    // 绘制状态下鼠标十字丝是否展示[默认开启]
    // 编辑时临时feature的颜色
    // slots[暂时采用事件覆盖形式]
    // 当前选中的激活feature对象
    // function: constructor
    function Map(domId, mapOptions) {
      var _this = this;

      _classCallCheck(this, Map);

      _defineProperty$1(this, "controls", []);

      _defineProperty$1(this, "layers", []);

      _defineProperty$1(this, "drawingStyle", {});

      _defineProperty$1(this, "drawingTip", true);

      _defineProperty$1(this, "drawingCrosshair", true);

      _defineProperty$1(this, "editingColor", '#FF0000');

      _defineProperty$1(this, "slotsObServer", {});

      _defineProperty$1(this, "activeFeature", null);

      _defineProperty$1(this, "events", {
        on: function on(eventType, callback) {
          _this.eventsObServer.on(eventType, callback);
        }
      });

      _defineProperty$1(this, "slots", {
        on: function on(eventType, callback) {
          _this.slotsObServer[eventType] = callback;
        }
      });

      this.wrapperDomId = domId;
      this.wrapperDom = document.getElementById(domId); // 首先判断是否已经被实例化过
      // 在dom容器创建map主容器

      this.createMainDom(); // 相关参数初始化

      this.mapOptions = assign_1({}, Map.defaultMapOptions, mapOptions);
      this.zoom = this.mapOptions.zoom; // 更新初始zoom

      this.center = this.mapOptions.center; // 更新初始origin

      this.mode = this.mapOptions.mode; // 更新初始map操作模式

      this.refreshDelayWhenZooming = this.mapOptions.refreshDelayWhenZooming; // 是否持续缩放时延时刷新

      this.zoomWhenDrawing = this.mapOptions.zoomWhenDrawing; // 更新是否绘制过程中允许缩放

      this.panWhenDrawing = this.mapOptions.panWhenDrawing; // 更新是否绘制过程中允许平移

      this.featureCaptureWhenMove = this.mapOptions.featureCaptureWhenMove; // mousemove过程中是否开启捕捉, 默认不开启

      this.withHotKeys = this.mapOptions.withHotKeys; // 快捷键开关设置

      this.zoomWheelRatio = this.mapOptions.zoomWheelRatio; // 滑轮缩放速率

      this.xAxis = this.mapOptions.xAxis; // x轴设置

      this.yAxis = this.mapOptions.yAxis; // y轴设置

      this.size = this.mapOptions.size || {
        // 容器大小设置
        width: get_1(this.dom, 'clientWidth', 0),
        height: get_1(this.dom, 'clientHeight', 0)
      }; // 设置容器样式

      this.setDomStyle(); // 分别创建platformContainer/layerContainer/controlCOntainer

      this.createSubDoms(); // 添加overlayLayer至当前map，最终会被添加至platform层

      this.addOverlayLayer(); // 添加tipLayer至当前map，最终会被添加至platform层

      this.addTipLayer(); // 添加supportLayer至当前map，最终会被添加至platform层

      this.addSupportLayer(); // 添加cursorLayer至当前map，最终会被添加至platform层

      this.addCursorLayer(); // 添加eventLayer至当前map，最终会被添加至platform层

      this.addEventLayer(); // 添加markerLayer至当前map，最终会被添加至platform层

      this.addMarkerLayer(); // 事件监听实例添加

      this.eventsObServer = new events.EventEmitter(); // 注册快捷键（注意多实例时可能存在冲突问题，后面的实例会覆盖前面的）

      this.withHotKeys && this.registerHotkey();
    } // 设置dom容器的style样式


    _createClass(Map, [{
      key: "setDomStyle",
      value: function setDomStyle() {
        this.dom.ondragstart = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };

        this.dom.oncontextmenu = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };
      } // 设置当前mapMode模式

    }, {
      key: "setMode",
      value: function setMode(mode) {
        this.mode = mode;
        this.eventLayer.reset(); // 切换mode时，需要取消activeFeature的选中

        if (this.activeFeature) {
          this.eventsObServer.emit(EEventType.FeatureUnselected, this.activeFeature, 'cancel by switch mode');
        }
      } // 设置当前map绘制状态样式

    }, {
      key: "setDrawingStyle",
      value: function setDrawingStyle(drawingStyle) {
        this.drawingStyle = drawingStyle;
      } // 设置编辑时临时feature的颜色

    }, {
      key: "setEditingColor",
      value: function setEditingColor(color) {
        this.editingColor = color;
      } // 开启绘制过程中的tip提示文案

    }, {
      key: "enableDrawingTip",
      value: function enableDrawingTip() {
        this.drawingTip = true;
      } // 关闭绘制过程中的tip提示文案

    }, {
      key: "disableDrawingTip",
      value: function disableDrawingTip() {
        this.drawingTip = false;
      } // 开启绘制过程中的十字丝

    }, {
      key: "enableDrawingCrosshair",
      value: function enableDrawingCrosshair() {
        this.drawingCrosshair = true;
      } // 关闭绘制过程中的十字丝

    }, {
      key: "disableDrawingCrosshair",
      value: function disableDrawingCrosshair() {
        this.drawingCrosshair = false;
      } // 获取dom宽高（width/height）

    }, {
      key: "getSize",
      value: function getSize() {
        return this.size;
      } // 获取当前的缩放值

    }, {
      key: "getScale",
      value: function getScale(zoom) {
        var scaleZoom = isNumber_1(zoom) ? zoom : this.zoom;
        var dot = 1000000; // 小数点6位数

        var _this$getSize = this.getSize(),
            width = _this$getSize.width;

        var scale = parseInt(width * dot / scaleZoom + '', 10) / dot;
        return scale;
      } // 设置实际坐标系center

    }, {
      key: "setCenter",
      value: function setCenter(center) {
        this.center = center;
        this.refresh();
        this.triggerBoundsChanged();
        return this;
      } // 获取实际坐标系center

    }, {
      key: "getCenter",
      value: function getCenter() {
        return this.center;
      } // 获取屏幕中心点坐标

    }, {
      key: "getScreenCenter",
      value: function getScreenCenter() {
        var _this$getSize2 = this.getSize(),
            width = _this$getSize2.width,
            height = _this$getSize2.height;

        return {
          x: width / 2,
          y: height / 2
        };
      } // 获取当前视野范围

    }, {
      key: "getBounds",
      value: function getBounds(option) {
        var _this$getSize3 = this.getSize(),
            width = _this$getSize3.width,
            height = _this$getSize3.height;

        var _this$transformScreen = this.transformScreenToGlobal({
          x: 0,
          y: 0
        }),
            ltx = _this$transformScreen.x,
            lty = _this$transformScreen.y;

        var _this$transformScreen2 = this.transformScreenToGlobal({
          x: width,
          y: height
        }),
            rtx = _this$transformScreen2.x,
            rty = _this$transformScreen2.y;

        return {
          x: ltx,
          y: lty,
          width: rtx - ltx,
          height: lty - rty
        };
      } // 绘制过程中是否允许自由缩放

    }, {
      key: "enableZoomWhenDrawing",
      value: function enableZoomWhenDrawing() {
        this.zoomWhenDrawing = true;
      }
    }, {
      key: "disableZoomWhenDrawing",
      value: function disableZoomWhenDrawing() {
        this.zoomWhenDrawing = false;
      } // 绘制过程中是否允许自由平移

    }, {
      key: "enablePanWhenDrawing",
      value: function enablePanWhenDrawing() {
        this.panWhenDrawing = true;
      }
    }, {
      key: "disablePanWhenDrawing",
      value: function disablePanWhenDrawing() {
        this.panWhenDrawing = false;
      } // move过程中是否开启捕捉

    }, {
      key: "enableFeatureCaptureWhenMove",
      value: function enableFeatureCaptureWhenMove() {
        this.featureCaptureWhenMove = true;
      }
    }, {
      key: "disableFeatureCaptureWhenMove",
      value: function disableFeatureCaptureWhenMove() {
        this.featureCaptureWhenMove = false;
      } // 开启快捷键

    }, {
      key: "enableHotKeys",
      value: function enableHotKeys() {
        if (!this.withHotKeys) {
          this.withHotKeys = true;
          this.registerHotkey();
        }
      }
    }, {
      key: "disableHotKeys",
      value: function disableHotKeys() {
        if (this.withHotKeys) {
          this.withHotKeys = false;
          this.unbindHotkey();
        }
      } // 定位且zoom到指定zoom值

    }, {
      key: "centerAndZoom",
      value: function centerAndZoom(centerZoom) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _option$refreshDelay = option.refreshDelay,
            refreshDelay = _option$refreshDelay === void 0 ? false : _option$refreshDelay;
        var center = centerZoom.center,
            zoom = centerZoom.zoom;
        center && (this.center = center);
        isNumber_1(zoom) && (this.zoom = zoom); // 只有map设置了this.refreshDelayWhenZooming = true && refreshDelay = true才能允许延时刷新

        this.refresh(refreshDelay && this.refreshDelayWhenZooming);
        this.triggerBoundsChanged();
        return this;
      } // 缩放到指定zoom

    }, {
      key: "zoomTo",
      value: function zoomTo(zoom) {
        this.zoom = zoom;
        this.refresh();
        this.triggerBoundsChanged();
      } // 放大-中心点放大

    }, {
      key: "zoomIn",
      value: function zoomIn() {
        this.zoom = this.zoom / 2;
        this.refresh();
        this.triggerBoundsChanged();
      } // 缩小

    }, {
      key: "zoomOut",
      value: function zoomOut() {
        this.zoom = this.zoom * 2;
        this.refresh();
        this.triggerBoundsChanged();
      } // 设置滑轮缩放比例, 取值区间[0, 10)

    }, {
      key: "setZoomWheelRatio",
      value: function setZoomWheelRatio(ratio) {
        this.zoomWheelRatio = ratio;
      } // 添加控件

    }, {
      key: "addControl",
      value: function addControl(control) {
        control.onAdd(this);
        this.controls.push(control);
      } // 删除指定control

    }, {
      key: "removeControlById",
      value: function removeControlById(targetControlId) {
        var newControls = filter_1(this.controls, function (control) {
          var controlId = control.id;

          if (controlId === targetControlId) {
            control.onRemove();
            return false;
          }

          return true;
        }); // 重新设置最新的controls


        this.controls = newControls;
      } // 添加layer至当前map容器

    }, {
      key: "addLayer",
      value: function addLayer(layer) {
        // 首先将layer-dom-append到容器中
        var layerDom = layer.dom;
        this.layerDom.appendChild(layerDom); // 然后调用layer的onAdd方法

        layer.onAdd(this); // 添加对象layers中

        this.layers.push(layer);
      } // 删除指定layer

    }, {
      key: "removeLayerById",
      value: function removeLayerById(targetLayerId) {
        var newLayers = filter_1(this.layers, function (layer) {
          var layerId = layer.id;

          if (layerId === targetLayerId) {
            layer.onRemove();
            return false;
          }

          return true;
        }); // 重新设置最新的layers


        this.layers = newLayers; // 执行重绘刷新

        this.refresh();
      } // 删除所有layer[除内置layers]

    }, {
      key: "removeAllLayers",
      value: function removeAllLayers() {
        var newLayers = filter_1(this.layers, function (layer) {
          layer.onRemove();
          return false;
        }); // 重新设置最新的layers


        this.layers = newLayers; // 执行重绘刷新

        this.refresh();
      } // 获取所有手动添加的layers

    }, {
      key: "getLayers",
      value: function getLayers() {
        return this.layers;
      } // 触发视野范围变化回调

    }, {
      key: "triggerBoundsChanged",
      value: function triggerBoundsChanged() {
        var _this2 = this;

        // 通知上层视野范围发生变化
        if (this.boundsChangedTimer) {
          window.clearTimeout(this.boundsChangedTimer);
          this.boundsChangedTimer = null;
        }

        this.boundsChangedTimer = window.setTimeout(function () {
          _this2.eventsObServer.emit(EEventType.BoundsChanged);
        }, 666); // 刷新overlayLayer: 目的是绘制图形过程中刷新临时绘制要素信息

        this.overlayLayer.refresh();
      } // 刷新当前视图
      // refreshDelay 是否需要延迟刷新，主要为了解决滑轮缩放时频繁触发元素refresh

    }, {
      key: "refresh",
      value: function refresh() {
        var refreshDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // 用户加入layer刷新
        forEach_1(this.layers, function (layer) {
          return layer.refresh(refreshDelay);
        }); // markerLayer也要伴随刷新


        this.markerLayer.refresh();
      } // 刷新当前视图

    }, {
      key: "resize",
      value: function resize(size) {
        // 重设size大小
        this.size = size || {
          // 容器大小设置
          width: get_1(this.dom, 'clientWidth', 0),
          height: get_1(this.dom, 'clientHeight', 0)
        }; // 重设最外层容器大小

        this.setLayerDomSize();
        this.setPlatformDomSize(); // resize-layer

        forEach_1(this.layers, function (layer) {
          return layer.resizeAndRefresh();
        }); // 内置图层markerLayer/overlayLayer/tipLayer/eventLayer执行resize


        this.markerLayer.resizeAndRefresh();
        this.overlayLayer.resizeAndRefresh();
        this.tipLayer.resizeAndRefresh();
        this.cursorLayer.resizeAndRefresh();
        this.supportLayer.resizeAndRefresh();
        this.eventLayer.resizeAndRefresh();
      } // 设置当前active的feature

    }, {
      key: "setActiveFeature",
      value: function setActiveFeature(feature) {
        this.activeFeature = feature; // 如果不存在feature，则清空overLayer, 否则添加activeFeature

        this.overlayLayer.addActiveFeature(feature); // 主动触发一次mouseMove事件

        var mouseMoveEvent = this.eventLayer.mouseMoveEvent;
        mouseMoveEvent && this.eventLayer.onMouseMove(mouseMoveEvent);
      } // 获取当前active的feature

    }, {
      key: "getActiveFeature",
      value: function getActiveFeature() {
        return this.activeFeature;
      } // 撤销临时绘制点【如线段/多段线/多边形等】

    }, {
      key: "removeDrawingPoints",
      value: function removeDrawingPoints() {
        this.eventLayer.revokeTmpPointsStore();
      } // 根据点获取各Layer.Feature上的

    }, {
      key: "getTargetFeatureWithPoint",
      value: function getTargetFeatureWithPoint(globalPoint) {
        var mapLayers = this.getLayers();
        var targetFeatures = [];

        forEach_1(mapLayers, function (layer) {
          if (layer.type === ELayerType.Feature) {
            var target = layer.getTargetFeatureWithPoint(globalPoint);

            if (target) {
              targetFeatures.push(target);
              return false;
            }
          }
        });

        var targetFeature = get_1(targetFeatures, '[0]', null);

        return targetFeature;
      } // 以图片形式导出layers[当前只支持到处text/image/feature三种layer图层]

    }, {
      key: "exportLayersToImage",
      value: function exportLayersToImage(bounds) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _option$layers = option.layers,
            layers = _option$layers === void 0 ? this.getLayers() : _option$layers,
            _option$type = option.type,
            type = _option$type === void 0 ? 'base64' : _option$type,
            _option$format = option.format,
            format = _option$format === void 0 ? 'image/png' : _option$format,
            _option$quality = option.quality,
            quality = _option$quality === void 0 ? 1 : _option$quality;
        var exportLayers = layers;
        var exportLayerHelper = new ExportHelperLayer(bounds);
        var promises = []; // 循环添加feature/text/image

        forEach_1(exportLayers, /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(layer) {
            var features, allFeatures, texts, allTexts, imageBase64, imageLayer;
            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (layer.type === ELayerType.Feature) {
                      features = layer.getAllFeatures();
                      allFeatures = cloneDeep_1(features);
                      exportLayerHelper.addObjects(allFeatures); // 通知结束

                      promises.push(new Promise(function (resolve) {
                        resolve(true);
                      }));
                    } else if (layer.type === ELayerType.Text) {
                      texts = layer.getAllTexts();
                      allTexts = cloneDeep_1(texts); // ImageAction存在跨越问题

                      exportLayerHelper.addObjects(allTexts); // 通知结束

                      promises.push(new Promise(function (resolve) {
                        resolve(true);
                      }));
                    } else if (layer.type === ELayerType.Mask) {
                      imageBase64 = layer.getImageWithBounds(bounds); // 通知结束

                      promises.push(new Promise(function (resolve, reject) {
                        var image = new Image();

                        image.onload = function () {
                          exportLayerHelper.putImage(image);
                          resolve(true);
                        };

                        image.onerror = function () {
                          reject();
                        };

                        image.src = imageBase64;
                      })); // exportLayerHelper.putImage(image as HTMLImageElement);
                    } else if (layer.type === ELayerType.Image) {
                      imageLayer = cloneDeep_1(layer); // 存在跨越问题

                      exportLayerHelper.addImageLayer(imageLayer); // 通知结束

                      promises.push(new Promise(function (resolve) {
                        resolve(true);
                      }));
                    }

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()); // 返回promise对象


        return new Promise(function (resolve, reject) {
          Promise.all(promises).then(function () {
            var imagePromise = exportLayerHelper.convertCanvasToImage(type, format, quality);
            imagePromise.then(function (image) {
              exportLayerHelper = null;
              resolve(image);
            })["catch"](function (error) {
              console.log(error);
            });
          })["catch"](function (error) {
            console.log(error);
          });
        });
      } // 屏幕坐标转换全局【实际】坐标，默认基于中心点基准point进行计算

    }, {
      key: "transformScreenToGlobal",
      value: function transformScreenToGlobal(screenPoint, options) {
        var _ref2 = options || {},
            basePoint = _ref2.basePoint,
            zoom = _ref2.zoom;

        var scale = this.getScale(zoom);

        var _this$getScreenCenter = this.getScreenCenter(),
            screenCenterX = _this$getScreenCenter.x,
            screenCenterY = _this$getScreenCenter.y;

        var screenX = screenPoint.x,
            screenY = screenPoint.y;

        var screenBasePointX = get_1(basePoint, 'screen.x', screenCenterX);

        var screenBasePointY = get_1(basePoint, 'screen.y', screenCenterY);

        var _get2 = get_1(basePoint, 'global', this.center),
            basePointX = _get2.x,
            basePointY = _get2.y;

        var dltScreenX = screenX - screenBasePointX;
        var dltScreenY = screenY - screenBasePointY;
        var isXAxisRight = this.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.yAxis.direction === EYAxisDirection.Top;
        var globalX = isXAxisRight ? basePointX + dltScreenX / scale : basePointX - dltScreenX / scale;
        var globalY = isYAxisTop ? basePointY - dltScreenY / scale : basePointY + dltScreenY / scale;
        return {
          x: globalX,
          y: globalY
        };
      } // 全局【实际】坐标转换屏幕坐标，默认基于中心点基准point进行计算

    }, {
      key: "transformGlobalToScreen",
      value: function transformGlobalToScreen(globalPoint, options) {
        var _ref3 = options || {},
            basePoint = _ref3.basePoint,
            zoom = _ref3.zoom;

        var scale = this.getScale(zoom);

        var _this$getScreenCenter2 = this.getScreenCenter(),
            screenCenterX = _this$getScreenCenter2.x,
            screenCenterY = _this$getScreenCenter2.y;

        var globalX = globalPoint.x,
            globalY = globalPoint.y;

        var screenBasePointX = get_1(basePoint, 'screen.x', screenCenterX);

        var screenBasePointY = get_1(basePoint, 'screen.y', screenCenterY);

        var _get3 = get_1(basePoint, 'global', this.center),
            basePointX = _get3.x,
            basePointY = _get3.y;

        var dltGlobalX = globalX - basePointX;
        var dltGlobalY = globalY - basePointY;
        var isXAxisRight = this.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.yAxis.direction === EYAxisDirection.Top;
        var screenX = isXAxisRight ? screenBasePointX + dltGlobalX * scale : screenBasePointX - dltGlobalX * scale;
        var screenY = isYAxisTop ? screenBasePointY - dltGlobalY * scale : screenBasePointY + dltGlobalY * scale;
        return {
          x: screenX,
          y: screenY
        };
      } // 创建this.dom

    }, {
      key: "createMainDom",
      value: function createMainDom() {
        this.domId = "main-wrapper-".concat(uniqueId_1());
        this.dom = document.createElement('div');
        this.dom.setAttribute('id', this.domId);
        this.dom.style.position = 'absolute';
        this.dom.style.left = '0';
        this.dom.style.top = '0';
        this.dom.style.right = '0';
        this.dom.style.bottom = '0';
        this.wrapperDom.appendChild(this.dom);
      } // 创建map容器下相关的container

    }, {
      key: "createSubDoms",
      value: function createSubDoms() {
        this.setLayerDom();
        this.setPlatformDom();
        this.setLayerDom2();
        this.setControlDom();
      } // 创建图层container

    }, {
      key: "setLayerDom",
      value: function setLayerDom() {
        this.layerDomId = "layer-wrapper-".concat(uniqueId_1());
        this.layerDom = document.createElement('div');
        this.layerDom.setAttribute('id', this.layerDomId);
        this.layerDom.style.position = 'absolute';
        this.layerDom.style.left = '0';
        this.layerDom.style.top = '0';
        this.layerDom.style.zIndex = '1'; // 设置大小

        this.setLayerDomSize(); // add this.layerDom to dom

        this.dom.appendChild(this.layerDom);
      }
    }, {
      key: "setLayerDomSize",
      value: function setLayerDomSize() {
        var _this$getSize4 = this.getSize(),
            width = _this$getSize4.width,
            height = _this$getSize4.height;

        this.layerDom.style.width = "".concat(width, "px");
        this.layerDom.style.height = "".concat(height, "px");
      } // 创建platform平台container[不会进行位置的移动]

    }, {
      key: "setPlatformDom",
      value: function setPlatformDom() {
        this.platformDomId = "platform-wrapper-".concat(uniqueId_1());
        this.platformDom = document.createElement('div');
        this.platformDom.setAttribute('id', this.platformDomId);
        this.platformDom.style.position = 'absolute';
        this.platformDom.style.left = '0';
        this.platformDom.style.top = '0';
        this.platformDom.style.zIndex = '5'; // 设置大小

        this.setPlatformDomSize(); // add this.platformDom to dom

        this.dom.appendChild(this.platformDom);
      }
    }, {
      key: "setPlatformDomSize",
      value: function setPlatformDomSize() {
        var _this$getSize5 = this.getSize(),
            width = _this$getSize5.width,
            height = _this$getSize5.height;

        this.platformDom.style.width = "".concat(width, "px");
        this.platformDom.style.height = "".concat(height, "px");
      } // 创建layer控件container【不同于setLayerDom的是：此容器width=0, height=0】

    }, {
      key: "setLayerDom2",
      value: function setLayerDom2() {
        this.layerDom2Id = "layer2-wrapper-".concat(uniqueId_1());
        this.layerDom2 = document.createElement('div');
        this.layerDom2.setAttribute('id', this.layerDom2Id);
        this.layerDom2.style.position = 'absolute';
        this.layerDom2.style.left = '0';
        this.layerDom2.style.right = '0';
        this.layerDom2.style.width = '0';
        this.layerDom2.style.height = '0';
        this.layerDom2.style.zIndex = '10'; // add this.layerDom2 to dom

        this.dom.appendChild(this.layerDom2);
      } // 创建control控件container

    }, {
      key: "setControlDom",
      value: function setControlDom() {
        // 暂时不用，control直接会在dom上进行添加
        this.controlDomId = "control-wrapper-".concat(uniqueId_1());
        this.controlDom = document.createElement('div');
        this.controlDom.setAttribute('id', this.controlDomId);
        this.controlDom.style.position = 'absolute';
        this.controlDom.style.left = '0';
        this.controlDom.style.right = '0';
        this.controlDom.style.width = '0';
        this.controlDom.style.height = '0';
        this.controlDom.style.zIndex = '15'; // add this.controlDom to dom

        this.dom.appendChild(this.controlDom);
      } // 添加eventLayer至当前map

    }, {
      key: "addEventLayer",
      value: function addEventLayer() {
        // 实例化eventLayer
        this.eventLayer = new EventLayer("event-".concat(uniqueId_1()), {}, {
          zIndex: 5
        }); // 首先将layer-dom-append到容器中

        this.platformDom.appendChild(this.eventLayer.dom);
        this.eventLayer.onAdd(this);
      } // 添加overlayLayer至当前map

    }, {
      key: "addOverlayLayer",
      value: function addOverlayLayer() {
        // 实例化overlayLayer
        this.overlayLayer = new OverlayLayer("overlay-".concat(uniqueId_1()), {}, {
          zIndex: 1
        }); // 首先将layer-dom-append到容器中

        this.platformDom.appendChild(this.overlayLayer.dom);
        this.overlayLayer.onAdd(this);
      } // 添加tipLayer至当前map

    }, {
      key: "addTipLayer",
      value: function addTipLayer() {
        // 实例化tipLayer
        this.tipLayer = new OverlayLayer("tip-".concat(uniqueId_1()), {}, {
          zIndex: 2
        }); // 首先将layer-dom-append到容器中

        this.platformDom.appendChild(this.tipLayer.dom);
        this.tipLayer.onAdd(this);
      } // 添加supportLayer至当前map

    }, {
      key: "addSupportLayer",
      value: function addSupportLayer() {
        // 实例化supportLayer
        this.supportLayer = new SupportLayer("support-".concat(uniqueId_1()), {}, {
          zIndex: 1
        }); // 首先将layer-dom-append到容器中

        this.platformDom.appendChild(this.supportLayer.dom);
        this.supportLayer.onAdd(this);
      } // 添加cursorLayer至当前map

    }, {
      key: "addCursorLayer",
      value: function addCursorLayer() {
        // 实例化cursorLayer
        this.cursorLayer = new OverlayLayer("cursor-".concat(uniqueId_1()), {}, {
          zIndex: 3
        }); // 首先将layer-dom-append到容器中

        this.platformDom.appendChild(this.cursorLayer.dom);
        this.cursorLayer.onAdd(this);
      } // 添加markerLayer至当前map

    }, {
      key: "addMarkerLayer",
      value: function addMarkerLayer() {
        // 实例化markerLayer
        this.markerLayer = new MarkerLayer("marker-".concat(uniqueId_1()), {}, {
          zIndex: 10
        }); // 首先将layer-dom-append到容器中

        this.layerDom2.appendChild(this.markerLayer.dom);
        this.markerLayer.onAdd(this);
      } // 注册快捷键

    }, {
      key: "registerHotkey",
      value: function registerHotkey() {
        var _this3 = this;

        // 注册ctrl+z删除
        hotkeys('ctrl+z', function (event, handler) {
          _this3.removeDrawingPoints();
        });
        hotkeys('up,down,left,right', function (event, handler) {
          event.preventDefault();
          event.stopPropagation(); // 更新activeFeature的位置

          var activeFeature = _this3.getActiveFeature();

          activeFeature && activeFeature.onMove(handler.key);
        });
      } // 解绑快捷键

    }, {
      key: "unbindHotkey",
      value: function unbindHotkey() {
        hotkeys.unbind('ctrl+z');
        hotkeys.unbind('up,down,left,right');
      } // setCursor

    }, {
      key: "setCursor",
      value: function setCursor(cursor) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        // 鼠标矢量样式层清空
        this.cursorLayer.removeAllFeatureActionText(); // 设置mouse:cursor

        this.platformDom.style.cursor = cursor; // 然后判断是否需要绘制矢量鼠标样式

        this.setCursorFeature(option);
        return this;
      } // setUrlCursor

    }, {
      key: "setUrlCursor",
      value: function setUrlCursor(cursor) {
        return this;
      } // 设置矢量cursor

    }, {
      key: "setCursorFeature",
      value: function setCursorFeature() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var type = option.type,
            shape = option.shape; // 涂抹/擦除

        if (type === EFeatureType.Circle) {
          this.cursorLayer.addCircleFeature(shape, {
            style: {
              lineWidth: 1,
              strokeStyle: '#aaa',
              fillStyle: '#ffffffb3',
              stroke: true,
              fill: true
            }
          });
        }
      } // map-dragging时调用，在平移时调用

    }, {
      key: "onDrag",
      value: function onDrag(dltX, dltY) {
        this.layerDom.style.left = "".concat(dltX, "px");
        this.layerDom.style.top = "".concat(dltY, "px");
        this.layerDom2.style.left = "".concat(dltX, "px");
        this.layerDom2.style.top = "".concat(dltY, "px");
      } // map缩放

    }, {
      key: "onZoom",
      value: function onZoom(scale) {
        this.dom.style.transform = "scale(".concat(scale, ")");
      } // 复位

    }, {
      key: "reset",
      value: function reset() {
        this.layerDom.style.left = '0';
        this.layerDom.style.top = '0';
        this.layerDom2.style.left = '0';
        this.layerDom2.style.top = '0'; // this.dom.style.transform = 'scale(1)';

        return this;
      } // 用户事件添加

    }, {
      key: "destroy",
      value: // gMap实例销毁
      function destroy() {
        // 移除当前事件
        this.dom.remove();
      } // 打印测试输出

    }, {
      key: "printInfo",
      value: function printInfo() {}
    }]);

    return Map;
  }();

  _defineProperty$1(Map, "defaultMapOptions", {
    center: {
      x: 0,
      y: 0
    },
    // 中心点坐标
    zoom: 1000,
    // 缩放值
    zoomWheelRatio: 5,
    // 鼠标滑轮缩放大小,取值区间[0, 10)，zoomWheelRatio越小，代表缩放速度越快，反之越慢
    mode: EMapMode.Pan,
    // 默认当前map模式
    size: null,
    // 可自定义容器宽/高，默认取dom: clientWidth/clientHeight
    refreshDelayWhenZooming: true,
    // 当持续缩放时，是否延时feature刷新，默认delay，性能更优
    zoomWhenDrawing: false,
    // 绘制过程中是否允许缩放，默认不会缩放
    featureCaptureWhenMove: false,
    // mousemove过程中是否开启捕捉, 默认不开启
    withHotKeys: true,
    // 是否开启快捷键
    panWhenDrawing: false,
    // 绘制过程中是否允许自动平移，默认不会自动平移
    xAxis: {
      direction: EXAxisDirection.Right
    },
    // x坐标轴方向设置
    yAxis: {
      direction: EYAxisDirection.Bottom
    } // y坐标轴方向设置

  });

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ImageLayer = /*#__PURE__*/function (_CanvasLayer) {
    _inherits(ImageLayer, _CanvasLayer);

    var _super = _createSuper$7(ImageLayer);

    /**
     * props: image可选初始化配置项
     * defaultImageInfo: 默认配置项
     * image: userImage merge defaultImageInfo
    */
    // function: constructor
    function ImageLayer(id, image) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, ImageLayer);

      _this = _super.call(this, id, ELayerType.Image, props, style); // 事件监听实例添加

      _defineProperty$1(_assertThisInitialized(_this), "imageSuccess", false);

      _defineProperty$1(_assertThisInitialized(_this), "events", {
        on: function on(eventType, callback) {
          _this.eventsObServer.on(eventType, callback);
        }
      });

      _this.eventsObServer = new events.EventEmitter();
      _this.imageInfo = assign_1({}, ImageLayer.defaultImageInfo, image);
      _this.position = _this.imageInfo.position;
      _this.grid = _this.imageInfo.grid; // this.updateImage();

      return _this;
    } // 更新图片信息


    _createClass(ImageLayer, [{
      key: "updateImageInfo",
      value: function updateImageInfo(image) {
        this.imageInfo = assign_1({}, this.imageInfo, image);
        image.position && (this.position = this.imageInfo.position);
        image.src && this.updateImage();
        this.refresh();
      } // 更新image对象

    }, {
      key: "updateImage",
      value: function updateImage() {
        var _this2 = this;

        if (this.imageInfo.src) {
          this.imageSuccess = false; // 首先执行loadStart回调

          this.eventsObServer.emit(ELayerImageEventType.LoadStart, this.imageInfo.src, this);
          this.image = new Image();

          if (this.imageInfo.crossOrigin) {
            this.image.setAttribute('crossOrigin', 'anonymous');
          } else {
            this.image.removeAttribute('crossOrigin');
          }

          this.image.src = this.imageInfo.src;

          this.image.onload = function () {
            _this2.imageSuccess = true;
            _this2.map && _this2.refresh();

            _this2.eventsObServer.emit(ELayerImageEventType.LoadEnd, _this2.imageInfo.src, _this2);
          };

          this.image.onerror = function () {
            _this2.imageSuccess = false;
            console.error('image src: ' + _this2.imageInfo.src + ' load error');

            _this2.eventsObServer.emit(ELayerImageEventType.LoadError, _this2.imageInfo.src, _this2);
          };
        }
      } // 更新grid网格

    }, {
      key: "updateGrid",
      value: function updateGrid(gridInfo) {
        this.grid = gridInfo;
        this.refresh();
      } // @override

    }, {
      key: "onAdd",
      value: function onAdd(map) {
        _get(_getPrototypeOf(ImageLayer.prototype), "onAdd", this).call(this, map);

        this.updateImage();
        this.refresh();
      } // 绘制image信息

    }, {
      key: "drawImage",
      value: function drawImage() {
        // 执行坐标转换
        var _this$map$transformGl = this.map.transformGlobalToScreen(this.position),
            screenX = _this$map$transformGl.x,
            screenY = _this$map$transformGl.y;

        var dpr = CanvasLayer.dpr;
        var scale = this.map.getScale();
        var _this$imageInfo = this.imageInfo,
            width = _this$imageInfo.width,
            height = _this$imageInfo.height;
        var screenWidth = width * scale;
        var screenHeight = height * scale;
        this.image && this.imageSuccess && Graphic.drawImage(this.canvasContext, {
          image: this.image,
          x: screenX * dpr,
          y: screenY * dpr,
          width: screenWidth * dpr,
          height: screenHeight * dpr
        }, {});
      } // 绘制grid信息

    }, {
      key: "drawGrid",
      value: function drawGrid() {
        var _this3 = this;

        var _this$imageInfo2 = this.imageInfo,
            width = _this$imageInfo2.width,
            height = _this$imageInfo2.height;
        var _this$position = this.position,
            startX = _this$position.x,
            startY = _this$position.y;
        var dpr = CanvasLayer.dpr;
        var isXAxisRight = this.map.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.map.yAxis.direction === EYAxisDirection.Top;

        var columns = get_1(this.grid, 'columns', []);

        var rows = get_1(this.grid, 'rows', []); // 绘制列


        var columnsCount = columns.length;
        var columnItemWidth = width / (columnsCount + 1);

        forEach_1(columns, function (column, index) {
          var _ref = column || {},
              _ref$color = _ref.color,
              lineColor = _ref$color === void 0 ? '#333' : _ref$color,
              _ref$width = _ref.width,
              lineWidth = _ref$width === void 0 ? 1 : _ref$width;

          var totalItemWidth = (index + 1) * columnItemWidth;
          var itemX = isXAxisRight ? startX + totalItemWidth : startX - totalItemWidth;
          var itemTopY = startY;
          var itemBottomY = isYAxisTop ? startY - height : startY + height;

          var startPoint = _this3.map.transformGlobalToScreen({
            x: itemX,
            y: itemTopY
          });

          var endPoint = _this3.map.transformGlobalToScreen({
            x: itemX,
            y: itemBottomY
          });

          Graphic.drawLine(_this3.canvasContext, {
            start: {
              x: startPoint.x * dpr,
              y: startPoint.y * dpr
            },
            end: {
              x: endPoint.x * dpr,
              y: endPoint.y * dpr
            }
          }, {
            strokeStyle: lineColor,
            lineWidth: lineWidth
          });
        }); // 绘制行


        var rowsCount = rows.length;
        var rowItemHeight = height / (rowsCount + 1);

        forEach_1(rows, function (row, index) {
          var _ref2 = row || {},
              _ref2$color = _ref2.color,
              lineColor = _ref2$color === void 0 ? '#333' : _ref2$color,
              _ref2$width = _ref2.width,
              lineWidth = _ref2$width === void 0 ? 1 : _ref2$width;

          var totalItemHeight = (index + 1) * rowItemHeight;
          var itemY = isYAxisTop ? startY - totalItemHeight : startY + totalItemHeight;
          var itemLeftX = startX;
          var itemRightX = isXAxisRight ? startX + width : startX - width;

          var startPoint = _this3.map.transformGlobalToScreen({
            x: itemLeftX,
            y: itemY
          });

          var endPoint = _this3.map.transformGlobalToScreen({
            x: itemRightX,
            y: itemY
          });

          Graphic.drawLine(_this3.canvasContext, {
            start: {
              x: startPoint.x * dpr,
              y: startPoint.y * dpr
            },
            end: {
              x: endPoint.x * dpr,
              y: endPoint.y * dpr
            }
          }, {
            strokeStyle: lineColor,
            lineWidth: lineWidth
          });
        });
      } // 用户事件添加

    }, {
      key: "refresh",
      value: // @override
      function refresh() {
        _get(_getPrototypeOf(ImageLayer.prototype), "refresh", this).call(this);

        this.drawImage();
        this.drawGrid();
      }
    }]);

    return ImageLayer;
  }(CanvasLayer);

  _defineProperty$1(ImageLayer, "defaultImageInfo", {
    src: '',
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0
    },
    // 默认起始位置
    crossOrigin: false,
    grid: {
      columns: [],
      rows: []
    }
  });

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var FeatureLayer = /*#__PURE__*/function (_CanvasLayer) {
    _inherits(FeatureLayer, _CanvasLayer);

    var _super = _createSuper$6(FeatureLayer);

    // function: constructor
    function FeatureLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, FeatureLayer);

      _this = _super.call(this, id, ELayerType.Feature, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "features", []);

      return _this;
    } // 添加feature至当前FeatureLayer中


    _createClass(FeatureLayer, [{
      key: "addFeature",
      value: function addFeature(feature, option) {
        var _ref = option || {},
            _ref$clear = _ref.clear,
            clear = _ref$clear === void 0 ? false : _ref$clear;

        if (clear) {
          this.features = [];
          this.clear();
        }

        feature.onAdd(this);
        this.features.push(feature);
      } // 删除feature

    }, {
      key: "removeFeatureById",
      value: function removeFeatureById(targetFeatureId) {
        var newFeatures = filter_1(this.features, function (feature) {
          var featureId = feature.id;

          if (featureId === targetFeatureId) {
            feature.onRemove();
            return false;
          }

          return true;
        }); // 重新设置最新的features


        this.features = newFeatures; // 执行重绘刷新

        this.refresh();
      } // 获取指定feature对象

    }, {
      key: "getFeatureById",
      value: function getFeatureById(targetFeatureId) {
        return find_1(this.features, function (_ref2) {
          var id = _ref2.id;
          return id === targetFeatureId;
        });
      } // 获取所有features

    }, {
      key: "getAllFeatures",
      value: function getAllFeatures() {
        return this.features;
      } // 删除所有features

    }, {
      key: "removeAllFeatures",
      value: function removeAllFeatures() {
        var newFeatures = filter_1(this.features, function (feature) {
          feature.onRemove();
          return false;
        }); // 重新设置最新的features


        this.features = newFeatures; // 执行重绘刷新

        this.refresh();
      } // 根据点获取命中的feature

    }, {
      key: "getTargetFeatureWithPoint",
      value: function getTargetFeatureWithPoint(point) {
        var targetFeatures = []; // 为了以后命中多个的返回判断

        forEach_1(this.features, function (feature) {
          var captured = feature.captureWithPoint(point);

          if (captured) {
            targetFeatures.push(feature);
            return false; // 中断玄幻
          }
        });

        return get_1(targetFeatures, '[0]', null);
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this2 = this;

        var refreshDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // 首先清除refreshTimer
        if (this.refreshDelayTimer) {
          window.clearTimeout(this.refreshDelayTimer);
          this.refreshDelayTimer = null;
        }

        _get(_getPrototypeOf(FeatureLayer.prototype), "refresh", this).call(this); // 延迟执行刷新


        if (refreshDelay) {
          this.refreshDelayTimer = window.setTimeout(function () {
            forEach_1(_this2.features, function (feature) {
              return feature.refresh();
            });
          }, 100);
          return;
        } // 立即执行刷新


        forEach_1(this.features, function (feature) {
          return feature.refresh();
        });
      }
    }]);

    return FeatureLayer;
  }(CanvasLayer);

  var baseIndexOf = _baseIndexOf;

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes$1(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  var _arrayIncludes = arrayIncludes$1;

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */

  function arrayIncludesWith$1(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  var _arrayIncludesWith = arrayIncludesWith$1;

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */

  function noop$1() {
    // No operation performed.
  }

  var noop_1 = noop$1;

  var Set = _Set,
      noop = noop_1,
      setToArray$1 = _setToArray;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Creates a set object of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */
  var createSet$1 = !(Set && (1 / setToArray$1(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
    return new Set(values);
  };

  var _createSet = createSet$1;

  var SetCache = _SetCache,
      arrayIncludes = _arrayIncludes,
      arrayIncludesWith = _arrayIncludesWith,
      cacheHas = _cacheHas,
      createSet = _createSet,
      setToArray = _setToArray;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq$1(array, iteratee, comparator) {
    var index = -1,
        includes = arrayIncludes,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    }
    else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array);
      if (set) {
        return setToArray(set);
      }
      isCommon = false;
      includes = cacheHas;
      seen = new SetCache;
    }
    else {
      seen = iteratee ? [] : result;
    }
    outer:
    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = (comparator || value !== 0) ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      }
      else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  var _baseUniq = baseUniq$1;

  var baseUniq = _baseUniq;

  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurrence of each element
   * is kept. The order of result values is determined by the order they occur
   * in the array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   */
  function uniq(array) {
    return (array && array.length) ? baseUniq(array) : [];
  }

  var uniq_1 = uniq;

  var MaskHelperLayer = /*#__PURE__*/function () {
    // canvas大小
    // public canvas: HTMLCanvasElement
    // public canvasContext: CanvasRenderingContext2D
    // 当前maskLayer中所有的actions
    // 伪造map对象，给feature使用
    // function: constructor
    function MaskHelperLayer(bounds) {
      _classCallCheck(this, MaskHelperLayer);

      _defineProperty$1(this, "actions", []);

      _defineProperty$1(this, "map", {
        getScale: function getScale() {
          return 1;
        },
        transformGlobalToScreen: function transformGlobalToScreen(point) {
          var x = point.x,
              y = point.y;
          var _this$bounds = this.bounds,
              startX = _this$bounds.x,
              startY = _this$bounds.y;
          return {
            x: x - startX,
            y: y - startY
          };
        }
      });

      this.bounds = bounds;
      this.createRenderCanvas(); // 对象冒充运行环境

      this.map.getScale = this.map.getScale.bind(this);
      this.map.transformGlobalToScreen = this.map.transformGlobalToScreen.bind(this);
    } // override 创建offscreenCanvas层


    _createClass(MaskHelperLayer, [{
      key: "createRenderCanvas",
      value: function createRenderCanvas() {
        var _this$bounds2 = this.bounds,
            width = _this$bounds2.width,
            height = _this$bounds2.height;
        this.canvas = new OffscreenCanvas(width, height);
        this.canvas.width = width * CanvasLayer.dpr;
        this.canvas.height = height * CanvasLayer.dpr;
        this.canvasContext = this.canvas.getContext('2d'); // const {width, height} = this.bounds;
        // this.canvas = document.createElement('canvas');
        // this.canvas.width = width * CanvasLayer.dpr;
        // this.canvas.height = height * CanvasLayer.dpr;
        // this.canvas.style.width = width + 'px';
        // this.canvas.style.height = height + 'px';
        // this.canvas.style.border = '1px solid red';
        // this.canvasContext = this.canvas.getContext('2d');
        // document.body.appendChild(this.canvas);
      } // 添加action至当前ActionLayer中

    }, {
      key: "addAction",
      value: function addAction(action) {
        action.setStyle({
          strokeStyle: '#ff0000',
          fillStyle: '#ff0000'
        }, {
          refresh: false
        });
        action.onAdd(this);
        this.actions.push(action);
      } // 添加actions至当前ActionLayer中

    }, {
      key: "addActions",
      value: function addActions(actions) {
        var _this = this;

        forEach_1(actions, function (action) {
          return _this.addAction(action);
        });
      } // 获取当前层上的pixels

    }, {
      key: "getRle",
      value: function getRle() {
        var rlePixels = []; // rle数据，第一位是统计value=1的像素数

        var dpr = CanvasLayer.dpr;
        var _this$bounds3 = this.bounds,
            realWidth = _this$bounds3.width,
            realHeight = _this$bounds3.height;
        var _this$canvas = this.canvas,
            width = _this$canvas.width,
            height = _this$canvas.height;
        var pixels = this.canvasContext.getImageData(0, 0, width, height).data;
        var pixelCount = 0; // 统计数据

        var lastPixelValue = 1; // 上一次pixel-value值

        for (var i = 0; i < realHeight; i++) {
          for (var j = 0; j < realWidth; j++) {
            var rIndex = (i * dpr * realWidth + j) * 4 * dpr;
            var rValue = pixels[rIndex];
            var gValue = pixels[rIndex + 1];
            var bValue = pixels[rIndex + 2];
            var aValue = pixels[rIndex + 3];
            var currentPixelValue = +!!(rValue || gValue || bValue || aValue); // 如果当前pixelValue === lastPixelValue 上一次的pixel值

            if (currentPixelValue === lastPixelValue) {
              pixelCount++;
            } else {
              // 此时需要进行push数据
              rlePixels.push(pixelCount);
              pixelCount = 1; // 计数重置为1
            } // 然后判断是否达到最后一个像素点


            if (i + 1 === realHeight && j + 1 === realWidth) {
              rlePixels.push(pixelCount);
            }

            lastPixelValue = currentPixelValue;
          }
        }

        return rlePixels;
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        // 绘制actions中所有action对象
        forEach_1(this.actions, function (action) {
          return action.refresh();
        });
      } // 清空canvas画布

    }, {
      key: "clear",
      value: function clear() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }]);

    return MaskHelperLayer;
  }();

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var MaskLayer = /*#__PURE__*/function (_CanvasLayer) {
    _inherits(MaskLayer, _CanvasLayer);

    var _super = _createSuper$5(MaskLayer);

    // function: constructor
    function MaskLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, MaskLayer);

      _this = _super.call(this, id, ELayerType.Mask, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "actions", []);

      return _this;
    } // 添加action至当前ActionLayer中


    _createClass(MaskLayer, [{
      key: "addAction",
      value: function addAction(action, option) {
        action.onAdd(this);
        this.actions.push(action);
      } // 删除action

    }, {
      key: "removeActionById",
      value: function removeActionById(targetActionId) {
        var newActions = filter_1(this.actions, function (action) {
          var actionId = action.id;

          if (actionId === targetActionId) {
            action.onRemove();
            return false;
          }

          return true;
        }); // 重新设置最新的actions


        this.actions = newActions; // 执行重绘刷新

        this.refresh();
      } // 获取所有actions

    }, {
      key: "getAllActions",
      value: function getAllActions() {
        return this.actions;
      } // 删除所有actions

    }, {
      key: "removeAllActions",
      value: function removeAllActions() {
        var newActions = filter_1(this.actions, function (action) {
          action.onRemove();
          return false;
        }); // 重新设置最新的actions


        this.actions = newActions; // 执行重绘刷新

        this.refresh();
      } // 内部方法
      // 在橡皮擦擦除时添加临时clearAction
      // 此action并非实际真正action, 不会被记录到this.actions中

    }, {
      key: "setMovingClearAction",
      value: function setMovingClearAction(clearAction) {
        clearAction && clearAction.onAdd(this);
        !clearAction && this.refresh();
      } // 获取当前layer上所有category分类

    }, {
      key: "getActionCategories",
      value: function getActionCategories() {
        var actions = this.actions;

        var categories = map_1(actions, function (_ref) {
          var category = _ref.category;
          return category;
        }); // 去重之后，然后去除clearAction对应的category=undefined的情况


        return filter_1(uniq_1(categories), function (category) {
          return !!category;
        });
      } // 根action.category进行分组

    }, {
      key: "groupByCategory",
      value: function groupByCategory() {
        var actions = this.actions;
        var categories = this.getActionCategories();
        var groups = [];

        forEach_1(categories, function (cat) {
          var mappedActions = filter_1(actions, function (_ref2) {
            var type = _ref2.type,
                category = _ref2.category;
            return category === cat || type === EMaskActionType.Clear;
          });

          groups.push({
            category: cat,
            actions: mappedActions
          });
        });

        return groups;
      } // 获取指定group的rleData

    }, {
      key: "getGroupRleData",
      value: function getGroupRleData(group, bounds) {
        var category = group.category,
            _group$actions = group.actions,
            actions = _group$actions === void 0 ? [] : _group$actions;
        var maskLayerHelper = new MaskHelperLayer(bounds);

        var copyActions = cloneDeep_1(actions);

        maskLayerHelper.addActions(copyActions);
        var rle = maskLayerHelper.getRle();
        return {
          category: category,
          rle: rle
        };
      } // 获取指定范围的imageDta

    }, {
      key: "getImageData",
      value: function getImageData(bounds) {
        var x = bounds.x,
            y = bounds.y,
            width = bounds.width,
            height = bounds.height;
        var screenXY = this.map.transformGlobalToScreen({
          x: x,
          y: y
        });
        var scale = this.map.getScale();
        var newX = screenXY.x * CanvasLayer.dpr;
        var newY = screenXY.y * CanvasLayer.dpr;
        var newWidth = width / scale * CanvasLayer.dpr;
        var newHeight = height / scale * CanvasLayer.dpr;
        var imageData = this.canvasContext.getImageData(newX, newY, newWidth, newHeight);
        return imageData;
      } // 返回指定范围的image对象

    }, {
      key: "getImageWithBounds",
      value: function getImageWithBounds(bounds) {
        var width = bounds.width,
            height = bounds.height;
        var imageData = this.getImageData(bounds);
        var canvas = document.createElement('canvas');
        canvas.width = width * CanvasLayer.dpr;
        canvas.height = height * CanvasLayer.dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        var canvasContext = canvas.getContext('2d'); // 绘制截图区域

        canvasContext.putImageData(imageData, 0, 0); // 产出base64图片

        var imageBase64 = canvas.toDataURL('image/png', 1.0); // 返回image对象

        return imageBase64;
      } // 根据分类获取分类分类rle数据, 截取某个范围的数据

    }, {
      key: "getRleData",
      value: function getRleData(bounds) {
        var _this2 = this;

        var groups = this.groupByCategory();
        var rles = []; // 所有category的rle数据集合

        forEach_1(groups, function (group) {
          var rle = _this2.getGroupRleData(group, bounds);

          rles.push(rle);
        });

        return rles;
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this3 = this;

        var refreshDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // 首先清除refreshTimer
        if (this.refreshDelayTimer) {
          window.clearTimeout(this.refreshDelayTimer);
          this.refreshDelayTimer = null;
        }

        _get(_getPrototypeOf(MaskLayer.prototype), "refresh", this).call(this); // 延迟执行刷新


        if (refreshDelay) {
          this.refreshDelayTimer = window.setTimeout(function () {
            forEach_1(_this3.actions, function (action) {
              return action.refresh();
            });
          }, 100);
          return;
        } // 立即执行


        forEach_1(this.actions, function (action) {
          return action.refresh();
        });
      }
    }]);

    return MaskLayer;
  }(CanvasLayer);

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var TextLayer = /*#__PURE__*/function (_CanvasLayer) {
    _inherits(TextLayer, _CanvasLayer);

    var _super = _createSuper$4(TextLayer);

    // function: constructor
    function TextLayer(id) {
      var _this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, TextLayer);

      _this = _super.call(this, id, ELayerType.Text, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "texts", []);

      return _this;
    }

    _createClass(TextLayer, [{
      key: "addText",
      value: function addText(text, option) {
        var _ref = option || {},
            _ref$clear = _ref.clear,
            clear = _ref$clear === void 0 ? false : _ref$clear;

        clear && this.clear();
        text.onAdd(this);
        this.texts.push(text);
      } // 删除text

    }, {
      key: "removeTextById",
      value: function removeTextById(targetTextId) {
        var newTexts = filter_1(this.texts, function (text) {
          var textId = text.id;

          if (textId === targetTextId) {
            text.onRemove();
            return false;
          }

          return true;
        }); // 重新设置最新的texts


        this.texts = newTexts; // 执行重绘刷新

        this.refresh();
      } // 获取指定text对象

    }, {
      key: "getTextById",
      value: function getTextById(targetTextId) {
        return find_1(this.texts, function (_ref2) {
          var id = _ref2.id;
          return id === targetTextId;
        });
      } // 获取所有texts

    }, {
      key: "getAllTexts",
      value: function getAllTexts() {
        return this.texts;
      } // 删除所有texts

    }, {
      key: "removeAllTexts",
      value: function removeAllTexts() {
        var newTexts = filter_1(this.texts, function (text) {
          text.onRemove();
          return false;
        }); // 重新设置最新的texts


        this.texts = newTexts; // 执行重绘刷新

        this.refresh();
      } // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this2 = this;

        var refreshDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // 首先清除refreshTimer
        if (this.refreshDelayTimer) {
          window.clearTimeout(this.refreshDelayTimer);
          this.refreshDelayTimer = null;
        }

        _get(_getPrototypeOf(TextLayer.prototype), "refresh", this).call(this); // 延迟执行刷新


        if (refreshDelay) {
          this.refreshDelayTimer = window.setTimeout(function () {
            forEach_1(_this2.texts, function (text) {
              return text.refresh();
            });
          }, 100);
          return;
        } // 立即刷新


        forEach_1(this.texts, function (text) {
          return text.refresh();
        });
      }
    }]);

    return TextLayer;
  }(CanvasLayer);

  var Layer = {
    Text: TextLayer,
    Mask: MaskLayer,
    Image: ImageLayer,
    Feature: FeatureLayer,
    OverlayLayer: OverlayLayer,
    SupportLayer: SupportLayer,
    EventLayer: EventLayer
  };

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ArrowFeature = /*#__PURE__*/function (_Feature) {
    _inherits(ArrowFeature, _Feature);

    var _super = _createSuper$3(ArrowFeature);

    // function: constructor
    function ArrowFeature(id, shape) {
      var _this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, ArrowFeature);

      _this = _super.call(this, id, EFeatureType.Arrow, props, style);
      _this.shape = shape;
      return _this;
    } // @override
    // 判断是否捕捉到当前对象，各子类自行实现


    _createClass(ArrowFeature, [{
      key: "captureWithPoint",
      value: function captureWithPoint(point) {
        return false;
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        var _this$layer;

        if (!((_this$layer = this.layer) !== null && _this$layer !== void 0 && _this$layer.map)) {
          return;
        }
      }
    }]);

    return ArrowFeature;
  }(Feature$1);

  var Feature = {
    Base: Feature$1,
    Point: PointFeature,
    Circle: CircleFeature,
    Line: LineFeature,
    Polyline: PolylineFeature,
    Rect: RectFeature,
    Polygon: PolygonFeature,
    Arrow: ArrowFeature
  };

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ImageActionFeature = /*#__PURE__*/function (_Action) {
    _inherits(ImageActionFeature, _Action);

    var _super = _createSuper$2(ImageActionFeature);

    // 当前涂抹action分类

    /**
     * props: image可选初始化配置项
     * defaultImageInfo: 默认配置项
     * image: userImage merge defaultImageInfo
    */
    // 图片当前的位置
    // function: constructor
    function ImageActionFeature(id, category, image) {
      var _this;

      var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      _classCallCheck(this, ImageActionFeature);

      _this = _super.call(this, id, EMaskActionType.Image, props, style);

      _defineProperty$1(_assertThisInitialized(_this), "category", '');

      _this.imageInfo = assign_1({}, ImageActionFeature.defaultImageInfo, image);
      _this.position = _this.imageInfo.position;

      _this.updateImage();

      _this.category = category;
      return _this;
    } // 更新image对象


    _createClass(ImageActionFeature, [{
      key: "updateImage",
      value: function updateImage() {
        var _this2 = this;

        if (this.imageInfo.src) {
          this.image = new Image();

          if (this.imageInfo.crossOrigin) {
            this.image.setAttribute('crossOrigin', 'anonymous');
          } else {
            this.image.removeAttribute('crossOrigin');
          }

          this.image.src = this.imageInfo.src;

          this.image.onload = function () {
            return _this2.layer && _this2.refresh();
          };
        }
      } // 绘制image信息

    }, {
      key: "drawImage",
      value: function drawImage() {
        var _this$layer;

        if (!((_this$layer = this.layer) !== null && _this$layer !== void 0 && _this$layer.map)) {
          return;
        } // 执行坐标转换


        var _this$layer$map$trans = this.layer.map.transformGlobalToScreen(this.position),
            screenX = _this$layer$map$trans.x,
            screenY = _this$layer$map$trans.y;

        var dpr = CanvasLayer.dpr;
        var scale = this.layer.map.getScale();
        var _this$imageInfo = this.imageInfo,
            width = _this$imageInfo.width,
            height = _this$imageInfo.height;
        var screenWidth = width * scale;
        var screenHeight = height * scale;
        Graphic.drawImage(this.layer.canvasContext, {
          image: this.image,
          x: screenX * dpr,
          y: screenY * dpr,
          width: screenWidth * dpr,
          height: screenHeight * dpr
        }, {});
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {
        _get(_getPrototypeOf(ImageActionFeature.prototype), "refresh", this).call(this);

        this.drawImage();
      }
    }]);

    return ImageActionFeature;
  }(Action);

  _defineProperty$1(ImageActionFeature, "defaultImageInfo", {
    src: '',
    width: 0,
    height: 0,
    crossOrigin: false,
    position: {
      x: 0,
      y: 0
    } // 默认起始位置

  });

  var Mask = {
    Draw: DrawActionFeature,
    Clear: ClearActionFeature,
    Image: ImageActionFeature
  };

  var Control$1 = /*#__PURE__*/function () {
    // controlId
    // controlType
    // control位置
    // props属性
    // option属性
    // props: domId
    // control-container
    // function: constructor
    function Control(id, type, props, option) {
      _classCallCheck(this, Control);

      this.id = id;
      this.type = type;
      this.props = props || {};
      this.option = option || {};
      this.domId = "control-grid-".concat(id, "-wrapper");
      this.createContainer();
    }

    _createClass(Control, [{
      key: "createContainer",
      value: function createContainer() {
        if (!this.dom) {
          this.dom = document.createElement('div');
          this.dom.setAttribute('id', this.domId);
          this.dom.style.position = 'absolute';
          this.dom.style.left = '0';
          this.dom.style.top = '0';
          this.dom.style.zIndex = '20';
        }
      } // function: trigger when control add to map

    }, {
      key: "onAdd",
      value: function onAdd(map) {
        // 首先判断当前layer是否已经被添加至map对象中
        this.map = map;
        this.map.dom.appendChild(this.dom);
      } // trigger when control remove from map
      // map exits first

    }, {
      key: "onRemove",
      value: function onRemove() {
        var controlElement = document.getElementById(this.domId);
        controlElement && controlElement.remove();
      } //

    }, {
      key: "updatePosition",
      value: function updatePosition(position) {
        this.position = position;
        this.refresh();
      } // 刷新当前数据

    }, {
      key: "refresh",
      value: function refresh() {} // 打印测试输出

    }, {
      key: "printInfo",
      value: function printInfo() {}
    }]);

    return Control;
  }();

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ScaleControl = /*#__PURE__*/function (_Control) {
    _inherits(ScaleControl, _Control);

    var _super = _createSuper$1(ScaleControl);

    // function: constructor
    function ScaleControl() {
      _classCallCheck(this, ScaleControl);

      return _super.call(this);
    } // 执行绘制当前
    // @override


    _createClass(ScaleControl, [{
      key: "refresh",
      value: function refresh() {}
    }]);

    return ScaleControl;
  }(Control$1);

  var EControlType;

  (function (EControlType) {
    EControlType["Scale"] = "SCALE";
    EControlType["Grid"] = "GRID";
  })(EControlType || (EControlType = {}));

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var GridControl = /*#__PURE__*/function (_Control) {
    _inherits(GridControl, _Control);

    var _super = _createSuper(GridControl);

    /**
     * props: gridInfo可选初始化配置项
     * defaultGridInfo: 默认配置项
     * grid: userGridInfo merge defaultGridInfo
    */
    // function: constructor
    function GridControl(id, gridInfo, props, option) {
      var _this;

      _classCallCheck(this, GridControl);

      console.log(111, id);
      _this = _super.call(this, id, EControlType.Grid, props, option);
      _this.gridInfo = assign_1({}, GridControl.defaultGridInfo, gridInfo); // 创建canvas

      _this.creatCanvasElement();

      _this.refreshElement();

      return _this;
    }

    _createClass(GridControl, [{
      key: "refreshElement",
      value: function refreshElement() {
        // 设置container相关
        this.setContainerSize();
        this.setContainerPosition();
        this.setContainerStyle(); // 设置canvas大小

        this.setRenderCanvasSize();
      }
    }, {
      key: "setContainerSize",
      value: function setContainerSize() {
        var _this$gridInfo$size = this.gridInfo.size,
            width = _this$gridInfo$size.width,
            height = _this$gridInfo$size.height;
        this.dom.style.width = width + 'px';
        this.dom.style.height = height + 'px';
      }
    }, {
      key: "setContainerPosition",
      value: function setContainerPosition() {
        var _this$gridInfo$positi = this.gridInfo.position,
            left = _this$gridInfo$positi.left,
            top = _this$gridInfo$positi.top,
            right = _this$gridInfo$positi.right,
            bottom = _this$gridInfo$positi.bottom;
        this.dom.style.left = isNumber_1(left) ? "".concat(left, "px") : 'initial';
        this.dom.style.right = isNumber_1(right) ? "".concat(right, "px") : 'initial';
        this.dom.style.top = isNumber_1(top) ? "".concat(top, "px") : 'initial';
        this.dom.style.bottom = isNumber_1(bottom) ? "".concat(bottom, "px") : 'initial';
      }
    }, {
      key: "setContainerStyle",
      value: function setContainerStyle() {
        this.dom.style.border = '1px solid red';
      } // 创建相关element:div & canvas

    }, {
      key: "creatCanvasElement",
      value: function creatCanvasElement() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.dom.appendChild(this.canvas); // canvas上下文赋值

        this.canvasContext = this.canvas.getContext('2d');
      }
    }, {
      key: "setRenderCanvasSize",
      value: function setRenderCanvasSize() {
        var _this$gridInfo$size2 = this.gridInfo.size,
            width = _this$gridInfo$size2.width,
            height = _this$gridInfo$size2.height;
        this.canvas.width = width * CanvasLayer.dpr;
        this.canvas.height = height * CanvasLayer.dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
      } // 执行绘制当前
      // @override

    }, {
      key: "refresh",
      value: function refresh() {}
    }]);

    return GridControl;
  }(Control$1);

  _defineProperty$1(GridControl, "defaultGridInfo", {
    position: {
      right: 10,
      bottom: 10
    },
    // 位置
    size: {
      width: 200,
      height: 200
    },
    // 大小
    grid: {
      // 网格信息
      columns: [],
      rows: []
    }
  });

  var Control = {
    Scale: ScaleControl,
    Grid: GridControl
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  var Marker = /*#__PURE__*/function () {
    // markerId
    // markerType
    // props
    // marker注记icon
    // 是否拖拽中
    // 是否可拖拽【默认可拖拽】

    /**
     * props: text文本
     * defaultMarkerInfo: 默认文本配置项
     * style: userMarkerInfo merge defaultMarkerInfo
    */
    // function: constructor
    function Marker(id, marker) {
      var _this = this;

      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Marker);

      _defineProperty$1(this, "dragging", false);

      _defineProperty$1(this, "draggingEnabled", false);

      _defineProperty$1(this, "events", {
        on: function on(eventType, callback) {
          _this.eventsObServer.on(eventType, callback);
        }
      });

      this.id = id;
      this.type = EMarkerType.Marker;
      this.props = props;
      this.markerInfo = assign_1({}, Marker.defaultMarkerInfo, marker);
      this.updateImage(); // 事件监听实例添加

      this.eventsObServer = new events.EventEmitter();
    } // function: trigger when marker add to markerLayer


    _createClass(Marker, [{
      key: "onAdd",
      value: function onAdd(layer) {
        this.layer = layer;
        this.refresh();
      } // trigger when marker remove from layer
      // layer exits first

    }, {
      key: "onRemove",
      value: function onRemove() {
        var imageElement = document.getElementById(this.id);
        imageElement && imageElement.remove();
      } // 开启鼠标按下拖拽

    }, {
      key: "enableDragging",
      value: function enableDragging() {
        this.draggingEnabled = true;
        this.dragging = false;
      }
    }, {
      key: "disableDragging",
      value: function disableDragging() {
        this.draggingEnabled = false;
        this.dragging = false;
      } // 更新image对象

    }, {
      key: "updateImage",
      value: function updateImage() {
        var _this2 = this;

        if (this.markerInfo.src) {
          this.image = new Image();
          this.image.id = this.id;
          this.image.setAttribute('data-type', this.type);
          this.image.style.position = 'absolute';
          this.image.style.cursor = 'pointer';
          this.image.style.userSelect = 'none';
          this.image.src = this.markerInfo.src;

          this.image.onload = function () {
            var _this2$layer, _this2$layer$dom;

            (_this2$layer = _this2.layer) === null || _this2$layer === void 0 ? void 0 : (_this2$layer$dom = _this2$layer.dom) === null || _this2$layer$dom === void 0 ? void 0 : _this2$layer$dom.appendChild(_this2.image);

            _this2.attachEvents();
          };

          this.image.onerror = function () {
            console.error('marker‘s src onerror');
          };
        }
      } // 更新marker位置

    }, {
      key: "updatePosition",
      value: function updatePosition(position) {
        var markerInfo = this.markerInfo;
        this.markerInfo = _objectSpread(_objectSpread({}, markerInfo), {}, {
          position: position
        });
        this.refresh();
      } // 鼠标按下事件

    }, {
      key: "handleMouseDown",
      value: function handleMouseDown(e) {
        var _this3 = this;

        // 相关坐标值处理
        var screenX = e.screenX,
            screenY = e.screenY;
        this.startPageScreenPoint = {
          x: screenX,
          y: screenY
        }; // 重置

        this.toUpdatePosition = null; // 鼠标event事件

        var buttonIndex = Util.EventUtil.getButtonIndex(e); // 首先执行回调

        this.eventsObServer.emit(EMarkerEventType.MouseDown, this); // 单击鼠标右键

        if (buttonIndex === 2) {
          this.eventsObServer.emit(EMarkerEventType.RightClick, this);
        } // 然后判断是否允许dragging


        if (!this.draggingEnabled) {
          return;
        } // 执行dragging拖拽


        this.dragging = true;

        document.onmousemove = function (e) {
          return _this3.handleMarkerMove(e);
        };

        document.onmouseup = function (e) {
          return _this3.handleMarkerUp(e);
        }; // 执行onDragStart回调


        this.eventsObServer.emit(EMarkerEventType.DragStart, this);
      } // marker平移中

    }, {
      key: "handleMarkerMove",
      value: function handleMarkerMove(e) {
        var scale = this.layer.map.getScale();
        var screenX = e.screenX,
            screenY = e.screenY;
        var _this$startPageScreen = this.startPageScreenPoint,
            x = _this$startPageScreen.x,
            y = _this$startPageScreen.y;
        var screenDltX = screenX - x;
        var screenDltY = screenY - y;
        var preGlobalDltX = screenDltX / scale;
        var preGlobalDltY = screenDltY / scale;
        var isXAxisRight = this.layer.map.xAxis.direction === EXAxisDirection.Right;
        var isYAxisTop = this.layer.map.yAxis.direction === EYAxisDirection.Top;
        var globalDltX = isXAxisRight ? preGlobalDltX : -preGlobalDltX;
        var globalDltY = isYAxisTop ? preGlobalDltY : -preGlobalDltY;
        var position = this.markerInfo.position;
        this.toUpdatePosition = {
          x: position.x + globalDltX,
          y: position.y - globalDltY
        };
        this.refresh(this.toUpdatePosition); // 执行onDragging回调

        this.eventsObServer.emit(EMarkerEventType.Dragging, this, this.toUpdatePosition);
      } // marker平移结束

    }, {
      key: "handleMarkerUp",
      value: function handleMarkerUp(e) {
        this.dragging = false;
        document.onmousemove = null;
        document.onmouseup = null;

        if (this.toUpdatePosition) {
          // 首先复原marker，然后执行回调
          this.refresh(); // 执行更新回调

          this.eventsObServer.emit(EMarkerEventType.DragEnd, this, this.toUpdatePosition);
        }

        this.toUpdatePosition = null;
      } // 鼠标弹起事件

    }, {
      key: "handleMouseUp",
      value: function handleMouseUp(e) {
        this.eventsObServer.emit(EMarkerEventType.MouseUp, this);
      } // 鼠标滑过事件

    }, {
      key: "handleMouseOver",
      value: function handleMouseOver(e) {
        var _this$layer, _this$layer$map;

        // 清空tipLayer文字提示
        this.layer.map.eventLayer.breakFeatureCapture = true;
        (_this$layer = this.layer) === null || _this$layer === void 0 ? void 0 : (_this$layer$map = _this$layer.map) === null || _this$layer$map === void 0 ? void 0 : _this$layer$map.tipLayer.removeAllFeatureActionText(); // 触发事件回调

        this.eventsObServer.emit(EMarkerEventType.MouseOver, this);
      } // 鼠标离开事件

    }, {
      key: "handleMouseOut",
      value: function handleMouseOut(e) {
        this.eventsObServer.emit(EMarkerEventType.MouseOut, this);
      }
    }, {
      key: "handleClick",
      value: function handleClick(e) {
        this.eventsObServer.emit(EMarkerEventType.Click, this);
      } // marker添加事件绑定

    }, {
      key: "attachEvents",
      value: function attachEvents() {
        var _this4 = this;

        this.image.onmousedown = function (e) {
          return _this4.handleMouseDown(e);
        };

        this.image.onmouseup = function (e) {
          return _this4.handleMouseUp(e);
        };

        this.image.onmouseover = function (e) {
          return _this4.handleMouseOver(e);
        };

        this.image.onmouseout = function (e) {
          return _this4.handleMouseOut(e);
        };

        this.image.onclick = function (e) {
          return _this4.handleClick(e);
        };
      } // 刷新当前数据

    }, {
      key: "refresh",
      value: function refresh(customPosition) {
        var _this$markerInfo = this.markerInfo,
            markerPosition = _this$markerInfo.position,
            offset = _this$markerInfo.offset;
        var position = customPosition || markerPosition;

        var _this$layer$map$trans = this.layer.map.transformGlobalToScreen(position),
            screenX = _this$layer$map$trans.x,
            screenY = _this$layer$map$trans.y;

        var offsetX = offset.x,
            offsetY = offset.y;
        var left = screenX + offsetX;
        var top = screenY - offsetY;
        this.image.style.left = "".concat(left, "px");
        this.image.style.top = "".concat(top, "px");
      } // 用户事件添加

    }, {
      key: "printInfo",
      value: // 打印测试输出
      function printInfo() {}
    }]);

    return Marker;
  }();

  _defineProperty$1(Marker, "defaultMarkerInfo", {
    src: '',
    position: {
      x: 0,
      y: 0
    },
    // 文本位置
    offset: {
      x: 0,
      y: 0
    } // 文本偏移量

  });

  var name = "ailabel";
  var version = "5.1.15";
  var description = "图像标注";
  var main = "dist/index.js";
  var browser = "dist/index.js";
  var browser_demo = "demo/index.js";
  var browser_website = "website/src/dist/index.js";
  var dependencies = {
  	"@babel/runtime": "^7.15.4",
  	events: "^3.3.0",
  	"hotkeys-js": "^3.8.7",
  	lodash: "^4.17.21"
  };
  var devDependencies = {
  	"@babel/core": "^7.14.6",
  	"@babel/plugin-transform-runtime": "^7.15.0",
  	"@babel/preset-env": "^7.14.7",
  	"@babel/preset-typescript": "^7.14.5",
  	"@rollup/plugin-commonjs": "^19.0.1",
  	"@rollup/plugin-json": "^4.1.0",
  	"@rollup/plugin-node-resolve": "^13.0.2",
  	rollup: "^2.53.2",
  	"rollup-plugin-babel": "^4.4.0",
  	"rollup-plugin-uglify": "^6.0.4"
  };
  var scripts = {
  	build: "rollup -c",
  	dev: "rollup -c -w",
  	pretest: "npm run build"
  };
  var files = [
  	"dist"
  ];
  var repository = {
  	type: "git",
  	url: "git+https://github.com/dingyang9642/AILabel.git"
  };
  var keywords = [
  	"ailabel",
  	"ocr",
  	"ai",
  	"label",
  	"annotation"
  ];
  var author = "dingyang";
  var license = "Apache-2.0";
  var bugs = {
  	url: "https://github.com/dingyang9642/AILabel/issues"
  };
  var homepage = "https://github.com/dingyang9642/AILabel#readme";
  var packageJson = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	browser: browser,
  	browser_demo: browser_demo,
  	browser_website: browser_website,
  	dependencies: dependencies,
  	devDependencies: devDependencies,
  	scripts: scripts,
  	files: files,
  	repository: repository,
  	keywords: keywords,
  	author: author,
  	license: license,
  	bugs: bugs,
  	homepage: homepage
  };

  var SDK_VERSION = "".concat(packageJson.version); // 版本号

  var AILabel = {
    Map: Map,
    Layer: Layer,
    Feature: Feature,
    Mask: Mask,
    Control: Control,
    Text: Text,
    Marker: Marker,
    Util: Util,
    Graphic: Graphic,
    version: SDK_VERSION
  };

  return AILabel;

}));
