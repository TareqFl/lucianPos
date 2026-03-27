import Lt, { app as Fn, BrowserWindow as El } from "electron";
import { fileURLToPath as xf } from "node:url";
import ft from "node:path";
import yt from "fs";
import Lf from "constants";
import Gr from "stream";
import To from "util";
import yl from "assert";
import ne from "path";
import Yn from "child_process";
import vl from "events";
import Wr from "crypto";
import wl from "tty";
import zn from "os";
import vt from "url";
import _l from "zlib";
import Uf from "http";
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Al = {}, kt = {}, Oe = {};
Oe.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Oe.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var ot = Lf, kf = process.cwd, Pn = null, Mf = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Pn || (Pn = kf.call(process)), Pn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Aa = process.chdir;
  process.chdir = function(e) {
    Pn = null, Aa.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Aa);
}
var Bf = jf;
function jf(e) {
  ot.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, f, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, f, h, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), Mf === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function f(h, g, v) {
      var E = Date.now(), A = 0;
      c(h, g, function C(S) {
        if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - E < 6e4) {
          setTimeout(function() {
            e.stat(g, function($, B) {
              $ && $.code === "ENOENT" ? c(h, g, C) : v(S);
            });
          }, A), A < 100 && (A += 10);
          return;
        }
        v && v(S);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function f(h, g, v, E, A, C) {
      var S;
      if (C && typeof C == "function") {
        var $ = 0;
        S = function(B, q, J) {
          if (B && B.code === "EAGAIN" && $ < 10)
            return $++, c.call(e, h, g, v, E, A, S);
          C.apply(this, arguments);
        };
      }
      return c.call(e, h, g, v, E, A, S);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(f, h, g, v, E) {
      for (var A = 0; ; )
        try {
          return c.call(e, f, h, g, v, E);
        } catch (C) {
          if (C.code === "EAGAIN" && A < 10) {
            A++;
            continue;
          }
          throw C;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(f, h, g) {
      c.open(
        f,
        ot.O_WRONLY | ot.O_SYMLINK,
        h,
        function(v, E) {
          if (v) {
            g && g(v);
            return;
          }
          c.fchmod(E, h, function(A) {
            c.close(E, function(C) {
              g && g(A || C);
            });
          });
        }
      );
    }, c.lchmodSync = function(f, h) {
      var g = c.openSync(f, ot.O_WRONLY | ot.O_SYMLINK, h), v = !0, E;
      try {
        E = c.fchmodSync(g, h), v = !1;
      } finally {
        if (v)
          try {
            c.closeSync(g);
          } catch {
          }
        else
          c.closeSync(g);
      }
      return E;
    };
  }
  function r(c) {
    ot.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(f, h, g, v) {
      c.open(f, ot.O_SYMLINK, function(E, A) {
        if (E) {
          v && v(E);
          return;
        }
        c.futimes(A, h, g, function(C) {
          c.close(A, function(S) {
            v && v(C || S);
          });
        });
      });
    }, c.lutimesSync = function(f, h, g) {
      var v = c.openSync(f, ot.O_SYMLINK), E, A = !0;
      try {
        E = c.futimesSync(v, h, g), A = !1;
      } finally {
        if (A)
          try {
            c.closeSync(v);
          } catch {
          }
        else
          c.closeSync(v);
      }
      return E;
    }) : c.futimes && (c.lutimes = function(f, h, g, v) {
      v && process.nextTick(v);
    }, c.lutimesSync = function() {
    });
  }
  function n(c) {
    return c && function(f, h, g) {
      return c.call(e, f, h, function(v) {
        m(v) && (v = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(f, h) {
      try {
        return c.call(e, f, h);
      } catch (g) {
        if (!m(g)) throw g;
      }
    };
  }
  function o(c) {
    return c && function(f, h, g, v) {
      return c.call(e, f, h, g, function(E) {
        m(E) && (E = null), v && v.apply(this, arguments);
      });
    };
  }
  function a(c) {
    return c && function(f, h, g) {
      try {
        return c.call(e, f, h, g);
      } catch (v) {
        if (!m(v)) throw v;
      }
    };
  }
  function s(c) {
    return c && function(f, h, g) {
      typeof h == "function" && (g = h, h = null);
      function v(E, A) {
        A && (A.uid < 0 && (A.uid += 4294967296), A.gid < 0 && (A.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return h ? c.call(e, f, h, v) : c.call(e, f, v);
    };
  }
  function l(c) {
    return c && function(f, h) {
      var g = h ? c.call(e, f, h) : c.call(e, f);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function m(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var Ta = Gr.Stream, Hf = qf;
function qf(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Ta.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var m = a[s];
      this[m] = i[m];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, f) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Ta.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Gf = Vf, Wf = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Vf(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Wf(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var re = yt, Yf = Bf, zf = Hf, Xf = Gf, hn = To, me, xn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (me = Symbol.for("graceful-fs.queue"), xn = Symbol.for("graceful-fs.previous")) : (me = "___graceful-fs.queue", xn = "___graceful-fs.previous");
function Kf() {
}
function Tl(e, t) {
  Object.defineProperty(e, me, {
    get: function() {
      return t;
    }
  });
}
var Ft = Kf;
hn.debuglog ? Ft = hn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Ft = function() {
  var e = hn.format.apply(hn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!re[me]) {
  var Jf = Ce[me] || [];
  Tl(re, Jf), re.close = function(e) {
    function t(r, n) {
      return e.call(re, r, function(i) {
        i || Sa(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, xn, {
      value: e
    }), t;
  }(re.close), re.closeSync = function(e) {
    function t(r) {
      e.apply(re, arguments), Sa();
    }
    return Object.defineProperty(t, xn, {
      value: e
    }), t;
  }(re.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Ft(re[me]), yl.equal(re[me].length, 0);
  });
}
Ce[me] || Tl(Ce, re[me]);
var Ie = So(Xf(re));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !re.__patched && (Ie = So(re), re.__patched = !0);
function So(e) {
  Yf(e), e.gracefulify = So, e.createReadStream = q, e.createWriteStream = J;
  var t = e.readFile;
  e.readFile = r;
  function r(U, y, H) {
    return typeof y == "function" && (H = y, y = null), Y(U, y, H);
    function Y(Z, I, O, N) {
      return t(Z, I, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Gt([Y, [Z, I, O], R, N || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(U, y, H, Y) {
    return typeof H == "function" && (Y = H, H = null), Z(U, y, H, Y);
    function Z(I, O, N, R, D) {
      return n(I, O, N, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Gt([Z, [I, O, N, R], P, D || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(U, y, H, Y) {
    return typeof H == "function" && (Y = H, H = null), Z(U, y, H, Y);
    function Z(I, O, N, R, D) {
      return o(I, O, N, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Gt([Z, [I, O, N, R], P, D || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(U, y, H, Y) {
    return typeof H == "function" && (Y = H, H = 0), Z(U, y, H, Y);
    function Z(I, O, N, R, D) {
      return s(I, O, N, function(P) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Gt([Z, [I, O, N, R], P, D || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = f;
  var c = /^v[0-5]\./;
  function f(U, y, H) {
    typeof y == "function" && (H = y, y = null);
    var Y = c.test(process.version) ? function(O, N, R, D) {
      return m(O, Z(
        O,
        N,
        R,
        D
      ));
    } : function(O, N, R, D) {
      return m(O, N, Z(
        O,
        N,
        R,
        D
      ));
    };
    return Y(U, y, H);
    function Z(I, O, N, R) {
      return function(D, P) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Gt([
          Y,
          [I, O, N],
          D,
          R || Date.now(),
          Date.now()
        ]) : (P && P.sort && P.sort(), typeof N == "function" && N.call(this, D, P));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = zf(e);
    C = h.ReadStream, $ = h.WriteStream;
  }
  var g = e.ReadStream;
  g && (C.prototype = Object.create(g.prototype), C.prototype.open = S);
  var v = e.WriteStream;
  v && ($.prototype = Object.create(v.prototype), $.prototype.open = B), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return C;
    },
    set: function(U) {
      C = U;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return $;
    },
    set: function(U) {
      $ = U;
    },
    enumerable: !0,
    configurable: !0
  });
  var E = C;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return E;
    },
    set: function(U) {
      E = U;
    },
    enumerable: !0,
    configurable: !0
  });
  var A = $;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return A;
    },
    set: function(U) {
      A = U;
    },
    enumerable: !0,
    configurable: !0
  });
  function C(U, y) {
    return this instanceof C ? (g.apply(this, arguments), this) : C.apply(Object.create(C.prototype), arguments);
  }
  function S() {
    var U = this;
    oe(U.path, U.flags, U.mode, function(y, H) {
      y ? (U.autoClose && U.destroy(), U.emit("error", y)) : (U.fd = H, U.emit("open", H), U.read());
    });
  }
  function $(U, y) {
    return this instanceof $ ? (v.apply(this, arguments), this) : $.apply(Object.create($.prototype), arguments);
  }
  function B() {
    var U = this;
    oe(U.path, U.flags, U.mode, function(y, H) {
      y ? (U.destroy(), U.emit("error", y)) : (U.fd = H, U.emit("open", H));
    });
  }
  function q(U, y) {
    return new e.ReadStream(U, y);
  }
  function J(U, y) {
    return new e.WriteStream(U, y);
  }
  var Q = e.open;
  e.open = oe;
  function oe(U, y, H, Y) {
    return typeof H == "function" && (Y = H, H = null), Z(U, y, H, Y);
    function Z(I, O, N, R, D) {
      return Q(I, O, N, function(P, k) {
        P && (P.code === "EMFILE" || P.code === "ENFILE") ? Gt([Z, [I, O, N, R], P, D || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  return e;
}
function Gt(e) {
  Ft("ENQUEUE", e[0].name, e[1]), re[me].push(e), Co();
}
var pn;
function Sa() {
  for (var e = Date.now(), t = 0; t < re[me].length; ++t)
    re[me][t].length > 2 && (re[me][t][3] = e, re[me][t][4] = e);
  Co();
}
function Co() {
  if (clearTimeout(pn), pn = void 0, re[me].length !== 0) {
    var e = re[me].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Ft("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Ft("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), m = Math.min(l * 1.2, 100);
      s >= m ? (Ft("RETRY", t.name, r), t.apply(null, r.concat([i]))) : re[me].push(e);
    }
    pn === void 0 && (pn = setTimeout(Co, 0));
  }
}
(function(e) {
  const t = Oe.fromCallback, r = Ie, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, l, m) {
    return typeof m == "function" ? r.read(i, o, a, s, l, m) : new Promise((c, f) => {
      r.read(i, o, a, s, l, (h, g, v) => {
        if (h) return f(h);
        c({ bytesRead: g, buffer: v });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffer: f });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffers: f });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(kt);
var bo = {}, Sl = {};
const Qf = ne;
Sl.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Qf.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const Cl = kt, { checkPath: bl } = Sl, Rl = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
bo.makeDir = async (e, t) => (bl(e), Cl.mkdir(e, {
  mode: Rl(t),
  recursive: !0
}));
bo.makeDirSync = (e, t) => (bl(e), Cl.mkdirSync(e, {
  mode: Rl(t),
  recursive: !0
}));
const Zf = Oe.fromPromise, { makeDir: ed, makeDirSync: Ci } = bo, bi = Zf(ed);
var Je = {
  mkdirs: bi,
  mkdirsSync: Ci,
  // alias
  mkdirp: bi,
  mkdirpSync: Ci,
  ensureDir: bi,
  ensureDirSync: Ci
};
const td = Oe.fromPromise, Ol = kt;
function rd(e) {
  return Ol.access(e).then(() => !0).catch(() => !1);
}
var Mt = {
  pathExists: td(rd),
  pathExistsSync: Ol.existsSync
};
const tr = Ie;
function nd(e, t, r, n) {
  tr.open(e, "r+", (i, o) => {
    if (i) return n(i);
    tr.futimes(o, t, r, (a) => {
      tr.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function id(e, t, r) {
  const n = tr.openSync(e, "r+");
  return tr.futimesSync(n, t, r), tr.closeSync(n);
}
var Il = {
  utimesMillis: nd,
  utimesMillisSync: id
};
const nr = kt, he = ne, od = To;
function ad(e, t, r) {
  const n = r.dereference ? (i) => nr.stat(i, { bigint: !0 }) : (i) => nr.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function sd(e, t, r) {
  let n;
  const i = r.dereference ? (a) => nr.statSync(a, { bigint: !0 }) : (a) => nr.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function ld(e, t, r, n, i) {
  od.callbackify(ad)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Vr(s, l)) {
        const m = he.basename(e), c = he.basename(t);
        return r === "move" && m !== c && m.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && Ro(e, t) ? i(new Error(Xn(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function cd(e, t, r, n) {
  const { srcStat: i, destStat: o } = sd(e, t, n);
  if (o) {
    if (Vr(i, o)) {
      const a = he.basename(e), s = he.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Ro(e, t))
    throw new Error(Xn(e, t, r));
  return { srcStat: i, destStat: o };
}
function Pl(e, t, r, n, i) {
  const o = he.resolve(he.dirname(e)), a = he.resolve(he.dirname(r));
  if (a === o || a === he.parse(a).root) return i();
  nr.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Vr(t, l) ? i(new Error(Xn(e, r, n))) : Pl(e, t, a, n, i));
}
function Nl(e, t, r, n) {
  const i = he.resolve(he.dirname(e)), o = he.resolve(he.dirname(r));
  if (o === i || o === he.parse(o).root) return;
  let a;
  try {
    a = nr.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Vr(t, a))
    throw new Error(Xn(e, r, n));
  return Nl(e, t, o, n);
}
function Vr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ro(e, t) {
  const r = he.resolve(e).split(he.sep).filter((i) => i), n = he.resolve(t).split(he.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Xn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var sr = {
  checkPaths: ld,
  checkPathsSync: cd,
  checkParentPaths: Pl,
  checkParentPathsSync: Nl,
  isSrcSubdir: Ro,
  areIdentical: Vr
};
const De = Ie, Ir = ne, ud = Je.mkdirs, fd = Mt.pathExists, dd = Il.utimesMillis, Pr = sr;
function hd(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Pr.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Pr.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? Dl(Ca, s, e, t, r, n) : Ca(s, e, t, r, n));
  });
}
function Ca(e, t, r, n, i) {
  const o = Ir.dirname(r);
  fd(o, (a, s) => {
    if (a) return i(a);
    if (s) return Ln(e, t, r, n, i);
    ud(o, (l) => l ? i(l) : Ln(e, t, r, n, i));
  });
}
function Dl(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function pd(e, t, r, n, i) {
  return n.filter ? Dl(Ln, e, t, r, n, i) : Ln(e, t, r, n, i);
}
function Ln(e, t, r, n, i) {
  (n.dereference ? De.stat : De.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? _d(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? md(s, e, t, r, n, i) : s.isSymbolicLink() ? Sd(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function md(e, t, r, n, i, o) {
  return t ? gd(e, r, n, i, o) : $l(e, r, n, i, o);
}
function gd(e, t, r, n, i) {
  if (n.overwrite)
    De.unlink(r, (o) => o ? i(o) : $l(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function $l(e, t, r, n, i) {
  De.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? Ed(e.mode, t, r, i) : Kn(r, e.mode, i));
}
function Ed(e, t, r, n) {
  return yd(e) ? vd(r, e, (i) => i ? n(i) : ba(e, t, r, n)) : ba(e, t, r, n);
}
function yd(e) {
  return (e & 128) === 0;
}
function vd(e, t, r) {
  return Kn(e, t | 128, r);
}
function ba(e, t, r, n) {
  wd(t, r, (i) => i ? n(i) : Kn(r, e, n));
}
function Kn(e, t, r) {
  return De.chmod(e, t, r);
}
function wd(e, t, r) {
  De.stat(e, (n, i) => n ? r(n) : dd(t, i.atime, i.mtime, r));
}
function _d(e, t, r, n, i, o) {
  return t ? Fl(r, n, i, o) : Ad(e.mode, r, n, i, o);
}
function Ad(e, t, r, n, i) {
  De.mkdir(r, (o) => {
    if (o) return i(o);
    Fl(t, r, n, (a) => a ? i(a) : Kn(r, e, i));
  });
}
function Fl(e, t, r, n) {
  De.readdir(e, (i, o) => i ? n(i) : xl(o, e, t, r, n));
}
function xl(e, t, r, n, i) {
  const o = e.pop();
  return o ? Td(e, o, t, r, n, i) : i();
}
function Td(e, t, r, n, i, o) {
  const a = Ir.join(r, t), s = Ir.join(n, t);
  Pr.checkPaths(a, s, "copy", i, (l, m) => {
    if (l) return o(l);
    const { destStat: c } = m;
    pd(c, a, s, i, (f) => f ? o(f) : xl(e, r, n, i, o));
  });
}
function Sd(e, t, r, n, i) {
  De.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = Ir.resolve(process.cwd(), a)), e)
      De.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? De.symlink(a, r, i) : i(s) : (n.dereference && (l = Ir.resolve(process.cwd(), l)), Pr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Pr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : Cd(a, r, i)));
    else
      return De.symlink(a, r, i);
  });
}
function Cd(e, t, r) {
  De.unlink(t, (n) => n ? r(n) : De.symlink(e, t, r));
}
var bd = hd;
const _e = Ie, Nr = ne, Rd = Je.mkdirsSync, Od = Il.utimesMillisSync, Dr = sr;
function Id(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Dr.checkPathsSync(e, t, "copy", r);
  return Dr.checkParentPathsSync(e, n, t, "copy"), Pd(i, e, t, r);
}
function Pd(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Nr.dirname(r);
  return _e.existsSync(i) || Rd(i), Ll(e, t, r, n);
}
function Nd(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Ll(e, t, r, n);
}
function Ll(e, t, r, n) {
  const o = (n.dereference ? _e.statSync : _e.lstatSync)(t);
  if (o.isDirectory()) return kd(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Dd(o, e, t, r, n);
  if (o.isSymbolicLink()) return jd(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Dd(e, t, r, n, i) {
  return t ? $d(e, r, n, i) : Ul(e, r, n, i);
}
function $d(e, t, r, n) {
  if (n.overwrite)
    return _e.unlinkSync(r), Ul(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Ul(e, t, r, n) {
  return _e.copyFileSync(t, r), n.preserveTimestamps && Fd(e.mode, t, r), Oo(r, e.mode);
}
function Fd(e, t, r) {
  return xd(e) && Ld(r, e), Ud(t, r);
}
function xd(e) {
  return (e & 128) === 0;
}
function Ld(e, t) {
  return Oo(e, t | 128);
}
function Oo(e, t) {
  return _e.chmodSync(e, t);
}
function Ud(e, t) {
  const r = _e.statSync(e);
  return Od(t, r.atime, r.mtime);
}
function kd(e, t, r, n, i) {
  return t ? kl(r, n, i) : Md(e.mode, r, n, i);
}
function Md(e, t, r, n) {
  return _e.mkdirSync(r), kl(t, r, n), Oo(r, e);
}
function kl(e, t, r) {
  _e.readdirSync(e).forEach((n) => Bd(n, e, t, r));
}
function Bd(e, t, r, n) {
  const i = Nr.join(t, e), o = Nr.join(r, e), { destStat: a } = Dr.checkPathsSync(i, o, "copy", n);
  return Nd(a, i, o, n);
}
function jd(e, t, r, n) {
  let i = _e.readlinkSync(t);
  if (n.dereference && (i = Nr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = _e.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return _e.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Nr.resolve(process.cwd(), o)), Dr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (_e.statSync(r).isDirectory() && Dr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Hd(i, r);
  } else
    return _e.symlinkSync(i, r);
}
function Hd(e, t) {
  return _e.unlinkSync(t), _e.symlinkSync(e, t);
}
var qd = Id;
const Gd = Oe.fromCallback;
var Io = {
  copy: Gd(bd),
  copySync: qd
};
const Ra = Ie, Ml = ne, X = yl, $r = process.platform === "win32";
function Bl(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Ra[r], r = r + "Sync", e[r] = e[r] || Ra[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Po(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), X(e, "rimraf: missing path"), X.strictEqual(typeof e, "string", "rimraf: path should be a string"), X.strictEqual(typeof r, "function", "rimraf: callback function required"), X(t, "rimraf: invalid options argument provided"), X.strictEqual(typeof t, "object", "rimraf: options should be object"), Bl(t), Oa(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Oa(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Oa(e, t, r) {
  X(e), X(t), X(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && $r)
      return Ia(e, t, n, r);
    if (i && i.isDirectory())
      return Nn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return $r ? Ia(e, t, o, r) : Nn(e, t, o, r);
        if (o.code === "EISDIR")
          return Nn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Ia(e, t, r, n) {
  X(e), X(t), X(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? Nn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Pa(e, t, r) {
  let n;
  X(e), X(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Dn(e, t, r) : t.unlinkSync(e);
}
function Nn(e, t, r, n) {
  X(e), X(t), X(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Wd(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function Wd(e, t, r) {
  X(e), X(t), X(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      Po(Ml.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function jl(e, t) {
  let r;
  t = t || {}, Bl(t), X(e, "rimraf: missing path"), X.strictEqual(typeof e, "string", "rimraf: path should be a string"), X(t, "rimraf: missing options"), X.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && $r && Pa(e, t, n);
  }
  try {
    r && r.isDirectory() ? Dn(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return $r ? Pa(e, t, n) : Dn(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Dn(e, t, n);
  }
}
function Dn(e, t, r) {
  X(e), X(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      Vd(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function Vd(e, t) {
  if (X(e), X(t), t.readdirSync(e).forEach((r) => jl(Ml.join(e, r), t)), $r) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var Yd = Po;
Po.sync = jl;
const Un = Ie, zd = Oe.fromCallback, Hl = Yd;
function Xd(e, t) {
  if (Un.rm) return Un.rm(e, { recursive: !0, force: !0 }, t);
  Hl(e, t);
}
function Kd(e) {
  if (Un.rmSync) return Un.rmSync(e, { recursive: !0, force: !0 });
  Hl.sync(e);
}
var Jn = {
  remove: zd(Xd),
  removeSync: Kd
};
const Jd = Oe.fromPromise, ql = kt, Gl = ne, Wl = Je, Vl = Jn, Na = Jd(async function(t) {
  let r;
  try {
    r = await ql.readdir(t);
  } catch {
    return Wl.mkdirs(t);
  }
  return Promise.all(r.map((n) => Vl.remove(Gl.join(t, n))));
});
function Da(e) {
  let t;
  try {
    t = ql.readdirSync(e);
  } catch {
    return Wl.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Gl.join(e, r), Vl.removeSync(r);
  });
}
var Qd = {
  emptyDirSync: Da,
  emptydirSync: Da,
  emptyDir: Na,
  emptydir: Na
};
const Zd = Oe.fromCallback, Yl = ne, ct = Ie, zl = Je;
function eh(e, t) {
  function r() {
    ct.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  ct.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = Yl.dirname(e);
    ct.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? zl.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : ct.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function th(e) {
  let t;
  try {
    t = ct.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Yl.dirname(e);
  try {
    ct.statSync(r).isDirectory() || ct.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") zl.mkdirsSync(r);
    else throw n;
  }
  ct.writeFileSync(e, "");
}
var rh = {
  createFile: Zd(eh),
  createFileSync: th
};
const nh = Oe.fromCallback, Xl = ne, lt = Ie, Kl = Je, ih = Mt.pathExists, { areIdentical: Jl } = sr;
function oh(e, t, r) {
  function n(i, o) {
    lt.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  lt.lstat(t, (i, o) => {
    lt.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && Jl(s, o)) return r(null);
      const l = Xl.dirname(t);
      ih(l, (m, c) => {
        if (m) return r(m);
        if (c) return n(e, t);
        Kl.mkdirs(l, (f) => {
          if (f) return r(f);
          n(e, t);
        });
      });
    });
  });
}
function ah(e, t) {
  let r;
  try {
    r = lt.lstatSync(t);
  } catch {
  }
  try {
    const o = lt.lstatSync(e);
    if (r && Jl(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Xl.dirname(t);
  return lt.existsSync(n) || Kl.mkdirsSync(n), lt.linkSync(e, t);
}
var sh = {
  createLink: nh(oh),
  createLinkSync: ah
};
const ut = ne, Cr = Ie, lh = Mt.pathExists;
function ch(e, t, r) {
  if (ut.isAbsolute(e))
    return Cr.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = ut.dirname(t), i = ut.join(n, e);
    return lh(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : Cr.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: ut.relative(n, e)
    })));
  }
}
function uh(e, t) {
  let r;
  if (ut.isAbsolute(e)) {
    if (r = Cr.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = ut.dirname(t), i = ut.join(n, e);
    if (r = Cr.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Cr.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: ut.relative(n, e)
    };
  }
}
var fh = {
  symlinkPaths: ch,
  symlinkPathsSync: uh
};
const Ql = Ie;
function dh(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Ql.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function hh(e, t) {
  let r;
  if (t) return t;
  try {
    r = Ql.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var ph = {
  symlinkType: dh,
  symlinkTypeSync: hh
};
const mh = Oe.fromCallback, Zl = ne, qe = kt, ec = Je, gh = ec.mkdirs, Eh = ec.mkdirsSync, tc = fh, yh = tc.symlinkPaths, vh = tc.symlinkPathsSync, rc = ph, wh = rc.symlinkType, _h = rc.symlinkTypeSync, Ah = Mt.pathExists, { areIdentical: nc } = sr;
function Th(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, qe.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      qe.stat(e),
      qe.stat(t)
    ]).then(([a, s]) => {
      if (nc(a, s)) return n(null);
      $a(e, t, r, n);
    }) : $a(e, t, r, n);
  });
}
function $a(e, t, r, n) {
  yh(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, wh(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = Zl.dirname(t);
      Ah(l, (m, c) => {
        if (m) return n(m);
        if (c) return qe.symlink(e, t, s, n);
        gh(l, (f) => {
          if (f) return n(f);
          qe.symlink(e, t, s, n);
        });
      });
    });
  });
}
function Sh(e, t, r) {
  let n;
  try {
    n = qe.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = qe.statSync(e), l = qe.statSync(t);
    if (nc(s, l)) return;
  }
  const i = vh(e, t);
  e = i.toDst, r = _h(i.toCwd, r);
  const o = Zl.dirname(t);
  return qe.existsSync(o) || Eh(o), qe.symlinkSync(e, t, r);
}
var Ch = {
  createSymlink: mh(Th),
  createSymlinkSync: Sh
};
const { createFile: Fa, createFileSync: xa } = rh, { createLink: La, createLinkSync: Ua } = sh, { createSymlink: ka, createSymlinkSync: Ma } = Ch;
var bh = {
  // file
  createFile: Fa,
  createFileSync: xa,
  ensureFile: Fa,
  ensureFileSync: xa,
  // link
  createLink: La,
  createLinkSync: Ua,
  ensureLink: La,
  ensureLinkSync: Ua,
  // symlink
  createSymlink: ka,
  createSymlinkSync: Ma,
  ensureSymlink: ka,
  ensureSymlinkSync: Ma
};
function Rh(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function Oh(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var No = { stringify: Rh, stripBom: Oh };
let ir;
try {
  ir = Ie;
} catch {
  ir = yt;
}
const Qn = Oe, { stringify: ic, stripBom: oc } = No;
async function Ih(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || ir, n = "throws" in t ? t.throws : !0;
  let i = await Qn.fromCallback(r.readFile)(e, t);
  i = oc(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const Ph = Qn.fromPromise(Ih);
function Nh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || ir, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = oc(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Dh(e, t, r = {}) {
  const n = r.fs || ir, i = ic(t, r);
  await Qn.fromCallback(n.writeFile)(e, i, r);
}
const $h = Qn.fromPromise(Dh);
function Fh(e, t, r = {}) {
  const n = r.fs || ir, i = ic(t, r);
  return n.writeFileSync(e, i, r);
}
var xh = {
  readFile: Ph,
  readFileSync: Nh,
  writeFile: $h,
  writeFileSync: Fh
};
const mn = xh;
var Lh = {
  // jsonfile exports
  readJson: mn.readFile,
  readJsonSync: mn.readFileSync,
  writeJson: mn.writeFile,
  writeJsonSync: mn.writeFileSync
};
const Uh = Oe.fromCallback, br = Ie, ac = ne, sc = Je, kh = Mt.pathExists;
function Mh(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = ac.dirname(e);
  kh(i, (o, a) => {
    if (o) return n(o);
    if (a) return br.writeFile(e, t, r, n);
    sc.mkdirs(i, (s) => {
      if (s) return n(s);
      br.writeFile(e, t, r, n);
    });
  });
}
function Bh(e, ...t) {
  const r = ac.dirname(e);
  if (br.existsSync(r))
    return br.writeFileSync(e, ...t);
  sc.mkdirsSync(r), br.writeFileSync(e, ...t);
}
var Do = {
  outputFile: Uh(Mh),
  outputFileSync: Bh
};
const { stringify: jh } = No, { outputFile: Hh } = Do;
async function qh(e, t, r = {}) {
  const n = jh(t, r);
  await Hh(e, n, r);
}
var Gh = qh;
const { stringify: Wh } = No, { outputFileSync: Vh } = Do;
function Yh(e, t, r) {
  const n = Wh(t, r);
  Vh(e, n, r);
}
var zh = Yh;
const Xh = Oe.fromPromise, Re = Lh;
Re.outputJson = Xh(Gh);
Re.outputJsonSync = zh;
Re.outputJSON = Re.outputJson;
Re.outputJSONSync = Re.outputJsonSync;
Re.writeJSON = Re.writeJson;
Re.writeJSONSync = Re.writeJsonSync;
Re.readJSON = Re.readJson;
Re.readJSONSync = Re.readJsonSync;
var Kh = Re;
const Jh = Ie, oo = ne, Qh = Io.copy, lc = Jn.remove, Zh = Je.mkdirp, ep = Mt.pathExists, Ba = sr;
function tp(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Ba.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    Ba.checkParentPaths(e, s, t, "move", (m) => {
      if (m) return n(m);
      if (rp(t)) return ja(e, t, i, l, n);
      Zh(oo.dirname(t), (c) => c ? n(c) : ja(e, t, i, l, n));
    });
  });
}
function rp(e) {
  const t = oo.dirname(e);
  return oo.parse(t).root === t;
}
function ja(e, t, r, n, i) {
  if (n) return Ri(e, t, r, i);
  if (r)
    return lc(t, (o) => o ? i(o) : Ri(e, t, r, i));
  ep(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : Ri(e, t, r, i));
}
function Ri(e, t, r, n) {
  Jh.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : np(e, t, r, n) : n());
}
function np(e, t, r, n) {
  Qh(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : lc(e, n));
}
var ip = tp;
const cc = Ie, ao = ne, op = Io.copySync, uc = Jn.removeSync, ap = Je.mkdirpSync, Ha = sr;
function sp(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Ha.checkPathsSync(e, t, "move", r);
  return Ha.checkParentPathsSync(e, i, t, "move"), lp(t) || ap(ao.dirname(t)), cp(e, t, n, o);
}
function lp(e) {
  const t = ao.dirname(e);
  return ao.parse(t).root === t;
}
function cp(e, t, r, n) {
  if (n) return Oi(e, t, r);
  if (r)
    return uc(t), Oi(e, t, r);
  if (cc.existsSync(t)) throw new Error("dest already exists.");
  return Oi(e, t, r);
}
function Oi(e, t, r) {
  try {
    cc.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return up(e, t, r);
  }
}
function up(e, t, r) {
  return op(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), uc(e);
}
var fp = sp;
const dp = Oe.fromCallback;
var hp = {
  move: dp(ip),
  moveSync: fp
}, wt = {
  // Export promiseified graceful-fs:
  ...kt,
  // Export extra methods:
  ...Io,
  ...Qd,
  ...bh,
  ...Kh,
  ...Je,
  ...hp,
  ...Do,
  ...Mt,
  ...Jn
}, Bt = {}, ht = {}, fe = {}, pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.CancellationError = pt.CancellationToken = void 0;
const pp = vl;
class mp extends pp.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new so());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new so());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
pt.CancellationToken = mp;
class so extends Error {
  constructor() {
    super("cancelled");
  }
}
pt.CancellationError = so;
var lr = {};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.newError = gp;
function gp(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var be = {}, lo = { exports: {} }, gn = { exports: {} }, Ii, qa;
function Ep() {
  if (qa) return Ii;
  qa = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Ii = function(c, f) {
    f = f || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return a(c);
    if (h === "number" && isFinite(c))
      return f.long ? l(c) : s(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (f) {
        var h = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function s(c) {
    var f = Math.abs(c);
    return f >= n ? Math.round(c / n) + "d" : f >= r ? Math.round(c / r) + "h" : f >= t ? Math.round(c / t) + "m" : f >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var f = Math.abs(c);
    return f >= n ? m(c, f, n, "day") : f >= r ? m(c, f, r, "hour") : f >= t ? m(c, f, t, "minute") : f >= e ? m(c, f, e, "second") : c + " ms";
  }
  function m(c, f, h, g) {
    var v = f >= h * 1.5;
    return Math.round(c / h) + " " + g + (v ? "s" : "");
  }
  return Ii;
}
var Pi, Ga;
function fc() {
  if (Ga) return Pi;
  Ga = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = m, n.disable = s, n.enable = o, n.enabled = l, n.humanize = Ep(), n.destroy = c, Object.keys(t).forEach((f) => {
      n[f] = t[f];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(f) {
      let h = 0;
      for (let g = 0; g < f.length; g++)
        h = (h << 5) - h + f.charCodeAt(g), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(f) {
      let h, g = null, v, E;
      function A(...C) {
        if (!A.enabled)
          return;
        const S = A, $ = Number(/* @__PURE__ */ new Date()), B = $ - (h || $);
        S.diff = B, S.prev = h, S.curr = $, h = $, C[0] = n.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
        let q = 0;
        C[0] = C[0].replace(/%([a-zA-Z%])/g, (Q, oe) => {
          if (Q === "%%")
            return "%";
          q++;
          const U = n.formatters[oe];
          if (typeof U == "function") {
            const y = C[q];
            Q = U.call(S, y), C.splice(q, 1), q--;
          }
          return Q;
        }), n.formatArgs.call(S, C), (S.log || n.log).apply(S, C);
      }
      return A.namespace = f, A.useColors = n.useColors(), A.color = n.selectColor(f), A.extend = i, A.destroy = n.destroy, Object.defineProperty(A, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (v !== n.namespaces && (v = n.namespaces, E = n.enabled(f)), E),
        set: (C) => {
          g = C;
        }
      }), typeof n.init == "function" && n.init(A), A;
    }
    function i(f, h) {
      const g = n(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return g.log = this.log, g;
    }
    function o(f) {
      n.save(f), n.namespaces = f, n.names = [], n.skips = [];
      const h = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const g of h)
        g[0] === "-" ? n.skips.push(g.slice(1)) : n.names.push(g);
    }
    function a(f, h) {
      let g = 0, v = 0, E = -1, A = 0;
      for (; g < f.length; )
        if (v < h.length && (h[v] === f[g] || h[v] === "*"))
          h[v] === "*" ? (E = v, A = g, v++) : (g++, v++);
        else if (E !== -1)
          v = E + 1, A++, g = A;
        else
          return !1;
      for (; v < h.length && h[v] === "*"; )
        v++;
      return v === h.length;
    }
    function s() {
      const f = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), f;
    }
    function l(f) {
      for (const h of n.skips)
        if (a(f, h))
          return !1;
      for (const h of n.names)
        if (a(f, h))
          return !0;
      return !1;
    }
    function m(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Pi = e, Pi;
}
var Wa;
function yp() {
  return Wa || (Wa = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let c = 0, f = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (c++, h === "%c" && (f = c));
      }), l.splice(f, 0, m);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = fc()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(gn, gn.exports)), gn.exports;
}
var En = { exports: {} }, Ni, Va;
function vp() {
  return Va || (Va = 1, Ni = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Ni;
}
var Di, Ya;
function wp() {
  if (Ya) return Di;
  Ya = 1;
  const e = zn, t = wl, r = vp(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, m) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !m && i === void 0)
      return 0;
    const c = i || 0;
    if (n.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in n) || n.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : c;
  }
  function s(l) {
    const m = a(l, l && l.isTTY);
    return o(m);
  }
  return Di = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, Di;
}
var za;
function _p() {
  return za || (za = 1, function(e, t) {
    const r = wl, n = To;
    t.init = c, t.log = s, t.formatArgs = o, t.save = l, t.load = m, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = wp();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, g) => {
      const v = g.substring(6).toLowerCase().replace(/_([a-z])/g, (A, C) => C.toUpperCase());
      let E = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), h[v] = E, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: g, useColors: v } = this;
      if (v) {
        const E = this.color, A = "\x1B[3" + (E < 8 ? E : "8;5;" + E), C = `  ${A};1m${g} \x1B[0m`;
        h[0] = C + h[0].split(`
`).join(`
` + C), h.push(A + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = a() + g + " " + h[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function c(h) {
      h.inspectOpts = {};
      const g = Object.keys(t.inspectOpts);
      for (let v = 0; v < g.length; v++)
        h.inspectOpts[g[v]] = t.inspectOpts[g[v]];
    }
    e.exports = fc()(t);
    const { formatters: f } = e.exports;
    f.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, f.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(En, En.exports)), En.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? lo.exports = yp() : lo.exports = _p();
var Ap = lo.exports, Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.ProgressCallbackTransform = void 0;
const Tp = Gr;
class Sp extends Tp.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Yr.ProgressCallbackTransform = Sp;
Object.defineProperty(be, "__esModule", { value: !0 });
be.DigestTransform = be.HttpExecutor = be.HttpError = void 0;
be.createHttpError = uo;
be.parseJson = Dp;
be.configureRequestOptionsFromUrl = hc;
be.configureRequestUrl = Fo;
be.safeGetHeader = rr;
be.configureRequestOptions = kn;
be.safeStringifyJson = Mn;
const Cp = Wr, bp = Ap, Rp = yt, Op = Gr, co = vt, Ip = pt, Xa = lr, Pp = Yr, Ot = (0, bp.default)("electron-builder");
function uo(e, t = null) {
  return new $o(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Mn(e.headers), t);
}
const Np = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class $o extends Error {
  constructor(t, r = `HTTP error: ${Np.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
be.HttpError = $o;
function Dp(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Kt {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Ip.CancellationToken(), n) {
    kn(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Ot(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return Ot.enabled && Ot(`Request: ${Mn(t)}`), r.createPromise((o, a, s) => {
      const l = this.createRequest(t, (m) => {
        try {
          this.handleResponse(m, t, r, o, a, i, n);
        } catch (c) {
          a(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (m) => {
        this.doApiRequest(m, r, n, i).then(o).catch(a);
      }), n(l, a), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var l;
    if (Ot.enabled && Ot(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Mn(r)}`), t.statusCode === 404) {
      o(uo(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const m = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = m >= 300 && m < 400, f = rr(t, "location");
    if (c && f != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Kt.prepareRedirectUrlOptions(f, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (g) => h += g), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const g = rr(t, "content-type"), v = g != null && (Array.isArray(g) ? g.find((E) => E.includes("json")) != null : g.includes("json"));
          o(uo(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${v ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (g) {
        o(g);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      Fo(t, s), kn(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, m) => {
          let c = 0;
          l.on("data", (f) => {
            if (c += f.length, c > 524288e3) {
              m(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(f);
          }), l.on("end", () => {
            m(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = rr(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(Kt.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Fp(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = hc(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = Kt.reconstructOriginalUrl(r), a = dc(t, r);
      Kt.isCrossOriginRedirect(o, a) && (Ot.enabled && Ot(`Given the cross-origin redirect (from ${o.host} to ${a.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return n;
  }
  static reconstructOriginalUrl(t) {
    const r = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const n = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new co.URL(`${r}//${n}${i}${o}`);
  }
  static isCrossOriginRedirect(t, r) {
    if (t.hostname.toLowerCase() !== r.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && r.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(r.port))
      return !1;
    if (t.protocol !== r.protocol)
      return !0;
    const n = t.port, i = r.port;
    return n !== i;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof $o && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
be.HttpExecutor = Kt;
function dc(e, t) {
  try {
    return new co.URL(e);
  } catch {
    const r = t.hostname, n = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${n}//${r}${i}`;
    return new co.URL(e, o);
  }
}
function hc(e, t) {
  const r = kn(t), n = dc(e, t);
  return Fo(n, r), r;
}
function Fo(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class fo extends Op.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Cp.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Xa.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Xa.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
be.DigestTransform = fo;
function $p(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function rr(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Fp(e, t) {
  if (!$p(rr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = rr(t, "content-length");
    a != null && r.push(new Pp.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new fo(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new fo(e.options.sha2, "sha256", "hex"));
  const i = (0, Rp.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function kn(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Mn(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.MemoLazy = void 0;
class xp {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && pc(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Zn.MemoLazy = xp;
function pc(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => pc(e[a], t[a]));
  }
  return e === t;
}
var zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.githubUrl = Lp;
zr.githubTagPrefix = Up;
zr.getS3LikeProviderBaseUrl = kp;
function Lp(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Up(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function kp(e) {
  const t = e.provider;
  if (t === "s3")
    return Mp(e);
  if (t === "spaces")
    return Bp(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Mp(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return mc(t, e.path);
}
function mc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Bp(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return mc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var xo = {};
Object.defineProperty(xo, "__esModule", { value: !0 });
xo.retry = gc;
const jp = pt;
async function gc(e, t) {
  var r;
  const { retries: n, interval: i, backoff: o = 0, attempt: a = 0, shouldRetry: s, cancellationToken: l = new jp.CancellationToken() } = t;
  try {
    return await e();
  } catch (m) {
    if (await Promise.resolve((r = s == null ? void 0 : s(m)) !== null && r !== void 0 ? r : !0) && n > 0 && !l.cancelled)
      return await new Promise((c) => setTimeout(c, i + o * a)), await gc(e, { ...t, retries: n - 1, attempt: a + 1 });
    throw m;
  }
}
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
Lo.parseDn = Hp;
function Hp(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.nil = or.UUID = void 0;
const Ec = Wr, yc = lr, qp = "options.name must be either a string or a Buffer", Ka = (0, Ec.randomBytes)(16);
Ka[0] = Ka[0] | 1;
const $n = {}, W = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  $n[t] = e, W[e] = t;
}
class Ut {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Ut.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Gp(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Wp(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: ($n[t[14] + t[15]] & 240) >> 4,
        variant: Ja(($n[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Ja((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, yc.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = $n[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
or.UUID = Ut;
Ut.OID = Ut.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Ja(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Rr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Rr || (Rr = {}));
function Gp(e, t, r, n, i = Rr.ASCII) {
  const o = (0, Ec.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, yc.newError)(qp, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case Rr.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case Rr.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new Ut(s);
      break;
    default:
      l = W[s[0]] + W[s[1]] + W[s[2]] + W[s[3]] + "-" + W[s[4]] + W[s[5]] + "-" + W[s[6] & 15 | r] + W[s[7]] + "-" + W[s[8] & 63 | 128] + W[s[9]] + "-" + W[s[10]] + W[s[11]] + W[s[12]] + W[s[13]] + W[s[14]] + W[s[15]];
      break;
  }
  return l;
}
function Wp(e) {
  return W[e[0]] + W[e[1]] + W[e[2]] + W[e[3]] + "-" + W[e[4]] + W[e[5]] + "-" + W[e[6]] + W[e[7]] + "-" + W[e[8]] + W[e[9]] + "-" + W[e[10]] + W[e[11]] + W[e[12]] + W[e[13]] + W[e[14]] + W[e[15]];
}
or.nil = new Ut("00000000-0000-0000-0000-000000000000");
var Xr = {}, vc = {};
(function(e) {
  (function(t) {
    t.parser = function(d, u) {
      return new n(d, u);
    }, t.SAXParser = n, t.SAXStream = f, t.createStream = m, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(d, u) {
      if (!(this instanceof n))
        return new n(d, u);
      var T = this;
      o(T), T.q = T.c = "", T.bufferCheckPosition = t.MAX_BUFFER_LENGTH, T.encoding = null, T.opt = u || {}, T.opt.lowercase = T.opt.lowercase || T.opt.lowercasetags, T.looseCase = T.opt.lowercase ? "toLowerCase" : "toUpperCase", T.opt.maxEntityCount = T.opt.maxEntityCount || 512, T.opt.maxEntityDepth = T.opt.maxEntityDepth || 4, T.entityCount = T.entityDepth = 0, T.tags = [], T.closed = T.closedRoot = T.sawRoot = !1, T.tag = T.error = null, T.strict = !!d, T.noscript = !!(d || T.opt.noscript), T.state = y.BEGIN, T.strictEntities = T.opt.strictEntities, T.ENTITIES = T.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), T.attribList = [], T.opt.xmlns && (T.ns = Object.create(A)), T.opt.unquotedAttributeValues === void 0 && (T.opt.unquotedAttributeValues = !d), T.trackPosition = T.opt.position !== !1, T.trackPosition && (T.position = T.line = T.column = 0), Y(T, "onready");
    }
    Object.create || (Object.create = function(d) {
      function u() {
      }
      u.prototype = d;
      var T = new u();
      return T;
    }), Object.keys || (Object.keys = function(d) {
      var u = [];
      for (var T in d) d.hasOwnProperty(T) && u.push(T);
      return u;
    });
    function i(d) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), T = 0, w = 0, V = r.length; w < V; w++) {
        var ee = d[r[w]].length;
        if (ee > u)
          switch (r[w]) {
            case "textNode":
              D(d);
              break;
            case "cdata":
              R(d, "oncdata", d.cdata), d.cdata = "";
              break;
            case "script":
              R(d, "onscript", d.script), d.script = "";
              break;
            default:
              k(d, "Max buffer length exceeded: " + r[w]);
          }
        T = Math.max(T, ee);
      }
      var ae = t.MAX_BUFFER_LENGTH - T;
      d.bufferCheckPosition = ae + d.position;
    }
    function o(d) {
      for (var u = 0, T = r.length; u < T; u++)
        d[r[u]] = "";
    }
    function a(d) {
      D(d), d.cdata !== "" && (R(d, "oncdata", d.cdata), d.cdata = ""), d.script !== "" && (R(d, "onscript", d.script), d.script = "");
    }
    n.prototype = {
      end: function() {
        G(this);
      },
      write: nn,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(d) {
      return d !== "error" && d !== "end";
    });
    function m(d, u) {
      return new f(d, u);
    }
    function c(d, u) {
      if (d.length >= 2) {
        if (d[0] === 255 && d[1] === 254)
          return "utf-16le";
        if (d[0] === 254 && d[1] === 255)
          return "utf-16be";
      }
      return d.length >= 3 && d[0] === 239 && d[1] === 187 && d[2] === 191 ? "utf8" : d.length >= 4 ? d[0] === 60 && d[1] === 0 && d[2] === 63 && d[3] === 0 ? "utf-16le" : d[0] === 0 && d[1] === 60 && d[2] === 0 && d[3] === 63 ? "utf-16be" : "utf8" : u ? "utf8" : null;
    }
    function f(d, u) {
      if (!(this instanceof f))
        return new f(d, u);
      s.apply(this), this._parser = new n(d, u), this.writable = !0, this.readable = !0;
      var T = this;
      this._parser.onend = function() {
        T.emit("end");
      }, this._parser.onerror = function(w) {
        T.emit("error", w), T._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, l.forEach(function(w) {
        Object.defineProperty(T, "on" + w, {
          get: function() {
            return T._parser["on" + w];
          },
          set: function(V) {
            if (!V)
              return T.removeAllListeners(w), T._parser["on" + w] = V, V;
            T.on(w, V);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    f.prototype = Object.create(s.prototype, {
      constructor: {
        value: f
      }
    }), f.prototype._decodeBuffer = function(d, u) {
      if (this._decoderBuffer && (d = Buffer.concat([this._decoderBuffer, d]), this._decoderBuffer = null), !this._decoder) {
        var T = c(d, u);
        if (!T)
          return this._decoderBuffer = d, "";
        this._parser.encoding = T, this._decoder = new TextDecoder(T);
      }
      return this._decoder.decode(d, { stream: !u });
    }, f.prototype.write = function(d) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d))
        d = this._decodeBuffer(d, !1);
      else if (this._decoderBuffer) {
        var u = this._decodeBuffer(Buffer.alloc(0), !0);
        u && (this._parser.write(u), this.emit("data", u));
      }
      return this._parser.write(d.toString()), this.emit("data", d), !0;
    }, f.prototype.end = function(d) {
      if (d && d.length && this.write(d), this._decoderBuffer) {
        var u = this._decodeBuffer(Buffer.alloc(0), !0);
        u && (this._parser.write(u), this.emit("data", u));
      } else if (this._decoder) {
        var T = this._decoder.decode();
        T && (this._parser.write(T), this.emit("data", T));
      }
      return this._parser.end(), !0;
    }, f.prototype.on = function(d, u) {
      var T = this;
      return !T._parser["on" + d] && l.indexOf(d) !== -1 && (T._parser["on" + d] = function() {
        var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        w.splice(0, 0, d), T.emit.apply(T, w);
      }), s.prototype.on.call(T, d, u);
    };
    var h = "[CDATA[", g = "DOCTYPE", v = "http://www.w3.org/XML/1998/namespace", E = "http://www.w3.org/2000/xmlns/", A = { xml: v, xmlns: E }, C = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, $ = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, B = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function q(d) {
      return d === " " || d === `
` || d === "\r" || d === "	";
    }
    function J(d) {
      return d === '"' || d === "'";
    }
    function Q(d) {
      return d === ">" || q(d);
    }
    function oe(d, u) {
      return d.test(u);
    }
    function U(d, u) {
      return !oe(d, u);
    }
    var y = 0;
    t.STATE = {
      BEGIN: y++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: y++,
      // leading whitespace
      TEXT: y++,
      // general stuff
      TEXT_ENTITY: y++,
      // &amp and such.
      OPEN_WAKA: y++,
      // <
      SGML_DECL: y++,
      // <!BLARG
      SGML_DECL_QUOTED: y++,
      // <!BLARG foo "bar
      DOCTYPE: y++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: y++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: y++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: y++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: y++,
      // <!-
      COMMENT: y++,
      // <!--
      COMMENT_ENDING: y++,
      // <!-- blah -
      COMMENT_ENDED: y++,
      // <!-- blah --
      CDATA: y++,
      // <![CDATA[ something
      CDATA_ENDING: y++,
      // ]
      CDATA_ENDING_2: y++,
      // ]]
      PROC_INST: y++,
      // <?hi
      PROC_INST_BODY: y++,
      // <?hi there
      PROC_INST_ENDING: y++,
      // <?hi "there" ?
      OPEN_TAG: y++,
      // <strong
      OPEN_TAG_SLASH: y++,
      // <strong /
      ATTRIB: y++,
      // <a
      ATTRIB_NAME: y++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: y++,
      // <a foo _
      ATTRIB_VALUE: y++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: y++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: y++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: y++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: y++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: y++,
      // <foo bar=&quot
      CLOSE_TAG: y++,
      // </a
      CLOSE_TAG_SAW_WHITE: y++,
      // </a   >
      SCRIPT: y++,
      // <script> ...
      SCRIPT_ENDING: y++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(d) {
      var u = t.ENTITIES[d], T = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[d] = T;
    });
    for (var H in t.STATE)
      t.STATE[t.STATE[H]] = H;
    y = t.STATE;
    function Y(d, u, T) {
      d[u] && d[u](T);
    }
    function Z(d) {
      var u = d && d.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return u ? u[2] : null;
    }
    function I(d) {
      return d ? d.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function O(d, u) {
      const T = I(d), w = I(u);
      return !T || !w ? !0 : w === "utf16" ? T === "utf16le" || T === "utf16be" : T === w;
    }
    function N(d, u) {
      if (!(!d.strict || !d.encoding || !u || u.name !== "xml")) {
        var T = Z(u.body);
        T && !O(d.encoding, T) && F(
          d,
          "XML declaration encoding " + T + " does not match detected stream encoding " + d.encoding.toUpperCase()
        );
      }
    }
    function R(d, u, T) {
      d.textNode && D(d), Y(d, u, T);
    }
    function D(d) {
      d.textNode = P(d.opt, d.textNode), d.textNode && Y(d, "ontext", d.textNode), d.textNode = "";
    }
    function P(d, u) {
      return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function k(d, u) {
      return D(d), d.trackPosition && (u += `
Line: ` + d.line + `
Column: ` + d.column + `
Char: ` + d.c), u = new Error(u), d.error = u, Y(d, "onerror", u), d;
    }
    function G(d) {
      return d.sawRoot && !d.closedRoot && F(d, "Unclosed root tag"), d.state !== y.BEGIN && d.state !== y.BEGIN_WHITESPACE && d.state !== y.TEXT && k(d, "Unexpected end"), D(d), d.c = "", d.closed = !0, Y(d, "onend"), n.call(d, d.strict, d.opt), d;
    }
    function F(d, u) {
      if (typeof d != "object" || !(d instanceof n))
        throw new Error("bad call to strictFail");
      d.strict && k(d, u);
    }
    function z(d) {
      d.strict || (d.tagName = d.tagName[d.looseCase]());
      var u = d.tags[d.tags.length - 1] || d, T = d.tag = { name: d.tagName, attributes: {} };
      d.opt.xmlns && (T.ns = u.ns), d.attribList.length = 0, R(d, "onopentagstart", T);
    }
    function ce(d, u) {
      var T = d.indexOf(":"), w = T < 0 ? ["", d] : d.split(":"), V = w[0], ee = w[1];
      return u && d === "xmlns" && (V = "xmlns", ee = ""), { prefix: V, local: ee };
    }
    function M(d) {
      if (d.strict || (d.attribName = d.attribName[d.looseCase]()), d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName)) {
        d.attribName = d.attribValue = "";
        return;
      }
      if (d.opt.xmlns) {
        var u = ce(d.attribName, !0), T = u.prefix, w = u.local;
        if (T === "xmlns")
          if (w === "xml" && d.attribValue !== v)
            F(
              d,
              "xml: prefix must be bound to " + v + `
Actual: ` + d.attribValue
            );
          else if (w === "xmlns" && d.attribValue !== E)
            F(
              d,
              "xmlns: prefix must be bound to " + E + `
Actual: ` + d.attribValue
            );
          else {
            var V = d.tag, ee = d.tags[d.tags.length - 1] || d;
            V.ns === ee.ns && (V.ns = Object.create(ee.ns)), V.ns[w] = d.attribValue;
          }
        d.attribList.push([d.attribName, d.attribValue]);
      } else
        d.tag.attributes[d.attribName] = d.attribValue, R(d, "onattribute", {
          name: d.attribName,
          value: d.attribValue
        });
      d.attribName = d.attribValue = "";
    }
    function Ee(d, u) {
      if (d.opt.xmlns) {
        var T = d.tag, w = ce(d.tagName);
        T.prefix = w.prefix, T.local = w.local, T.uri = T.ns[w.prefix] || "", T.prefix && !T.uri && (F(
          d,
          "Unbound namespace prefix: " + JSON.stringify(d.tagName)
        ), T.uri = w.prefix);
        var V = d.tags[d.tags.length - 1] || d;
        T.ns && V.ns !== T.ns && Object.keys(T.ns).forEach(function(At) {
          R(d, "onopennamespace", {
            prefix: At,
            uri: T.ns[At]
          });
        });
        for (var ee = 0, ae = d.attribList.length; ee < ae; ee++) {
          var ye = d.attribList[ee], ve = ye[0], ke = ye[1], ue = ce(ve, !0), Me = ue.prefix, Ei = ue.local, on = Me === "" ? "" : T.ns[Me] || "", pr = {
            name: ve,
            value: ke,
            prefix: Me,
            local: Ei,
            uri: on
          };
          Me && Me !== "xmlns" && !on && (F(
            d,
            "Unbound namespace prefix: " + JSON.stringify(Me)
          ), pr.uri = Me), d.tag.attributes[ve] = pr, R(d, "onattribute", pr);
        }
        d.attribList.length = 0;
      }
      d.tag.isSelfClosing = !!u, d.sawRoot = !0, d.tags.push(d.tag), R(d, "onopentag", d.tag), u || (!d.noscript && d.tagName.toLowerCase() === "script" ? d.state = y.SCRIPT : d.state = y.TEXT, d.tag = null, d.tagName = ""), d.attribName = d.attribValue = "", d.attribList.length = 0;
    }
    function dr(d) {
      if (!d.tagName) {
        F(d, "Weird empty close tag."), d.textNode += "</>", d.state = y.TEXT;
        return;
      }
      if (d.script) {
        if (d.tagName !== "script") {
          d.script += "</" + d.tagName + ">", d.tagName = "", d.state = y.SCRIPT;
          return;
        }
        R(d, "onscript", d.script), d.script = "";
      }
      var u = d.tags.length, T = d.tagName;
      d.strict || (T = T[d.looseCase]());
      for (var w = T; u--; ) {
        var V = d.tags[u];
        if (V.name !== w)
          F(d, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        F(d, "Unmatched closing tag: " + d.tagName), d.textNode += "</" + d.tagName + ">", d.state = y.TEXT;
        return;
      }
      d.tagName = T;
      for (var ee = d.tags.length; ee-- > u; ) {
        var ae = d.tag = d.tags.pop();
        d.tagName = d.tag.name, R(d, "onclosetag", d.tagName);
        var ye = {};
        for (var ve in ae.ns)
          ye[ve] = ae.ns[ve];
        var ke = d.tags[d.tags.length - 1] || d;
        d.opt.xmlns && ae.ns !== ke.ns && Object.keys(ae.ns).forEach(function(ue) {
          var Me = ae.ns[ue];
          R(d, "onclosenamespace", { prefix: ue, uri: Me });
        });
      }
      u === 0 && (d.closedRoot = !0), d.tagName = d.attribValue = d.attribName = "", d.attribList.length = 0, d.state = y.TEXT;
    }
    function Ue(d) {
      var u = d.entity, T = u.toLowerCase(), w, V = "";
      return d.ENTITIES[u] ? d.ENTITIES[u] : d.ENTITIES[T] ? d.ENTITIES[T] : (u = T, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), w = parseInt(u, 16), V = w.toString(16)) : (u = u.slice(1), w = parseInt(u, 10), V = w.toString(10))), u = u.replace(/^0+/, ""), isNaN(w) || V.toLowerCase() !== u || w < 0 || w > 1114111 ? (F(d, "Invalid character entity"), "&" + d.entity + ";") : String.fromCodePoint(w));
    }
    function hr(d, u) {
      u === "<" ? (d.state = y.OPEN_WAKA, d.startTagPosition = d.position) : q(u) || (F(d, "Non-whitespace before first tag."), d.textNode = u, d.state = y.TEXT);
    }
    function Ht(d, u) {
      var T = "";
      return u < d.length && (T = d.charAt(u)), T;
    }
    function nn(d) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return k(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (d === null)
        return G(u);
      typeof d == "object" && (d = d.toString());
      for (var T = 0, w = ""; w = Ht(d, T++), u.c = w, !!w; )
        switch (u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case y.BEGIN:
            if (u.state = y.BEGIN_WHITESPACE, w === "\uFEFF")
              continue;
            hr(u, w);
            continue;
          case y.BEGIN_WHITESPACE:
            hr(u, w);
            continue;
          case y.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var ee = T - 1; w && w !== "<" && w !== "&"; )
                w = Ht(d, T++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += d.substring(ee, T - 1);
            }
            w === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = y.OPEN_WAKA, u.startTagPosition = u.position) : (!q(w) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."), w === "&" ? u.state = y.TEXT_ENTITY : u.textNode += w);
            continue;
          case y.SCRIPT:
            w === "<" ? u.state = y.SCRIPT_ENDING : u.script += w;
            continue;
          case y.SCRIPT_ENDING:
            w === "/" ? u.state = y.CLOSE_TAG : (u.script += "<" + w, u.state = y.SCRIPT);
            continue;
          case y.OPEN_WAKA:
            if (w === "!")
              u.state = y.SGML_DECL, u.sgmlDecl = "";
            else if (!q(w)) if (oe(C, w))
              u.state = y.OPEN_TAG, u.tagName = w;
            else if (w === "/")
              u.state = y.CLOSE_TAG, u.tagName = "";
            else if (w === "?")
              u.state = y.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (F(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var V = u.position - u.startTagPosition;
                w = new Array(V).join(" ") + w;
              }
              u.textNode += "<" + w, u.state = y.TEXT;
            }
            continue;
          case y.SGML_DECL:
            if (u.sgmlDecl + w === "--") {
              u.state = y.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = y.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + w, u.sgmlDecl = "") : (u.sgmlDecl + w).toUpperCase() === h ? (R(u, "onopencdata"), u.state = y.CDATA, u.sgmlDecl = "", u.cdata = "") : (u.sgmlDecl + w).toUpperCase() === g ? (u.state = y.DOCTYPE, (u.doctype || u.sawRoot) && F(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : w === ">" ? (R(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = y.TEXT) : (J(w) && (u.state = y.SGML_DECL_QUOTED), u.sgmlDecl += w);
            continue;
          case y.SGML_DECL_QUOTED:
            w === u.q && (u.state = y.SGML_DECL, u.q = ""), u.sgmlDecl += w;
            continue;
          case y.DOCTYPE:
            w === ">" ? (u.state = y.TEXT, R(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += w, w === "[" ? u.state = y.DOCTYPE_DTD : J(w) && (u.state = y.DOCTYPE_QUOTED, u.q = w));
            continue;
          case y.DOCTYPE_QUOTED:
            u.doctype += w, w === u.q && (u.q = "", u.state = y.DOCTYPE);
            continue;
          case y.DOCTYPE_DTD:
            w === "]" ? (u.doctype += w, u.state = y.DOCTYPE) : w === "<" ? (u.state = y.OPEN_WAKA, u.startTagPosition = u.position) : J(w) ? (u.doctype += w, u.state = y.DOCTYPE_DTD_QUOTED, u.q = w) : u.doctype += w;
            continue;
          case y.DOCTYPE_DTD_QUOTED:
            u.doctype += w, w === u.q && (u.state = y.DOCTYPE_DTD, u.q = "");
            continue;
          case y.COMMENT:
            w === "-" ? u.state = y.COMMENT_ENDING : u.comment += w;
            continue;
          case y.COMMENT_ENDING:
            w === "-" ? (u.state = y.COMMENT_ENDED, u.comment = P(u.opt, u.comment), u.comment && R(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + w, u.state = y.COMMENT);
            continue;
          case y.COMMENT_ENDED:
            w !== ">" ? (F(u, "Malformed comment"), u.comment += "--" + w, u.state = y.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = y.DOCTYPE_DTD : u.state = y.TEXT;
            continue;
          case y.CDATA:
            for (var ee = T - 1; w && w !== "]"; )
              w = Ht(d, T++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
            u.cdata += d.substring(ee, T - 1), w === "]" && (u.state = y.CDATA_ENDING);
            continue;
          case y.CDATA_ENDING:
            w === "]" ? u.state = y.CDATA_ENDING_2 : (u.cdata += "]" + w, u.state = y.CDATA);
            continue;
          case y.CDATA_ENDING_2:
            w === ">" ? (u.cdata && R(u, "oncdata", u.cdata), R(u, "onclosecdata"), u.cdata = "", u.state = y.TEXT) : w === "]" ? u.cdata += "]" : (u.cdata += "]]" + w, u.state = y.CDATA);
            continue;
          case y.PROC_INST:
            w === "?" ? u.state = y.PROC_INST_ENDING : q(w) ? u.state = y.PROC_INST_BODY : u.procInstName += w;
            continue;
          case y.PROC_INST_BODY:
            if (!u.procInstBody && q(w))
              continue;
            w === "?" ? u.state = y.PROC_INST_ENDING : u.procInstBody += w;
            continue;
          case y.PROC_INST_ENDING:
            if (w === ">") {
              const ke = {
                name: u.procInstName,
                body: u.procInstBody
              };
              N(u, ke), R(u, "onprocessinginstruction", ke), u.procInstName = u.procInstBody = "", u.state = y.TEXT;
            } else
              u.procInstBody += "?" + w, u.state = y.PROC_INST_BODY;
            continue;
          case y.OPEN_TAG:
            oe(S, w) ? u.tagName += w : (z(u), w === ">" ? Ee(u) : w === "/" ? u.state = y.OPEN_TAG_SLASH : (q(w) || F(u, "Invalid character in tag name"), u.state = y.ATTRIB));
            continue;
          case y.OPEN_TAG_SLASH:
            w === ">" ? (Ee(u, !0), dr(u)) : (F(
              u,
              "Forward-slash in opening tag not followed by >"
            ), u.state = y.ATTRIB);
            continue;
          case y.ATTRIB:
            if (q(w))
              continue;
            w === ">" ? Ee(u) : w === "/" ? u.state = y.OPEN_TAG_SLASH : oe(C, w) ? (u.attribName = w, u.attribValue = "", u.state = y.ATTRIB_NAME) : F(u, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME:
            w === "=" ? u.state = y.ATTRIB_VALUE : w === ">" ? (F(u, "Attribute without value"), u.attribValue = u.attribName, M(u), Ee(u)) : q(w) ? u.state = y.ATTRIB_NAME_SAW_WHITE : oe(S, w) ? u.attribName += w : F(u, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME_SAW_WHITE:
            if (w === "=")
              u.state = y.ATTRIB_VALUE;
            else {
              if (q(w))
                continue;
              F(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", R(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", w === ">" ? Ee(u) : oe(C, w) ? (u.attribName = w, u.state = y.ATTRIB_NAME) : (F(u, "Invalid attribute name"), u.state = y.ATTRIB);
            }
            continue;
          case y.ATTRIB_VALUE:
            if (q(w))
              continue;
            J(w) ? (u.q = w, u.state = y.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || k(u, "Unquoted attribute value"), u.state = y.ATTRIB_VALUE_UNQUOTED, u.attribValue = w);
            continue;
          case y.ATTRIB_VALUE_QUOTED:
            if (w !== u.q) {
              w === "&" ? u.state = y.ATTRIB_VALUE_ENTITY_Q : u.attribValue += w;
              continue;
            }
            M(u), u.q = "", u.state = y.ATTRIB_VALUE_CLOSED;
            continue;
          case y.ATTRIB_VALUE_CLOSED:
            q(w) ? u.state = y.ATTRIB : w === ">" ? Ee(u) : w === "/" ? u.state = y.OPEN_TAG_SLASH : oe(C, w) ? (F(u, "No whitespace between attributes"), u.attribName = w, u.attribValue = "", u.state = y.ATTRIB_NAME) : F(u, "Invalid attribute name");
            continue;
          case y.ATTRIB_VALUE_UNQUOTED:
            if (!Q(w)) {
              w === "&" ? u.state = y.ATTRIB_VALUE_ENTITY_U : u.attribValue += w;
              continue;
            }
            M(u), w === ">" ? Ee(u) : u.state = y.ATTRIB;
            continue;
          case y.CLOSE_TAG:
            if (u.tagName)
              w === ">" ? dr(u) : oe(S, w) ? u.tagName += w : u.script ? (u.script += "</" + u.tagName + w, u.tagName = "", u.state = y.SCRIPT) : (q(w) || F(u, "Invalid tagname in closing tag"), u.state = y.CLOSE_TAG_SAW_WHITE);
            else {
              if (q(w))
                continue;
              U(C, w) ? u.script ? (u.script += "</" + w, u.state = y.SCRIPT) : F(u, "Invalid tagname in closing tag.") : u.tagName = w;
            }
            continue;
          case y.CLOSE_TAG_SAW_WHITE:
            if (q(w))
              continue;
            w === ">" ? dr(u) : F(u, "Invalid characters in closing tag");
            continue;
          case y.TEXT_ENTITY:
          case y.ATTRIB_VALUE_ENTITY_Q:
          case y.ATTRIB_VALUE_ENTITY_U:
            var ae, ye;
            switch (u.state) {
              case y.TEXT_ENTITY:
                ae = y.TEXT, ye = "textNode";
                break;
              case y.ATTRIB_VALUE_ENTITY_Q:
                ae = y.ATTRIB_VALUE_QUOTED, ye = "attribValue";
                break;
              case y.ATTRIB_VALUE_ENTITY_U:
                ae = y.ATTRIB_VALUE_UNQUOTED, ye = "attribValue";
                break;
            }
            if (w === ";") {
              var ve = Ue(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ve) ? ((u.entityCount += 1) > u.opt.maxEntityCount && k(
                u,
                "Parsed entity count exceeds max entity count"
              ), (u.entityDepth += 1) > u.opt.maxEntityDepth && k(
                u,
                "Parsed entity depth exceeds max entity depth"
              ), u.entity = "", u.state = ae, u.write(ve), u.entityDepth -= 1) : (u[ye] += ve, u.entity = "", u.state = ae);
            } else oe(u.entity.length ? B : $, w) ? u.entity += w : (F(u, "Invalid character in entity name"), u[ye] += "&" + u.entity + w, u.entity = "", u.state = ae);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var d = String.fromCharCode, u = Math.floor, T = function() {
        var w = 16384, V = [], ee, ae, ye = -1, ve = arguments.length;
        if (!ve)
          return "";
        for (var ke = ""; ++ye < ve; ) {
          var ue = Number(arguments[ye]);
          if (!isFinite(ue) || // `NaN`, `+Infinity`, or `-Infinity`
          ue < 0 || // not a valid Unicode code point
          ue > 1114111 || // not a valid Unicode code point
          u(ue) !== ue)
            throw RangeError("Invalid code point: " + ue);
          ue <= 65535 ? V.push(ue) : (ue -= 65536, ee = (ue >> 10) + 55296, ae = ue % 1024 + 56320, V.push(ee, ae)), (ye + 1 === ve || V.length > w) && (ke += d.apply(null, V), V.length = 0);
        }
        return ke;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: T,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = T;
    }();
  })(e);
})(vc);
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.XElement = void 0;
Xr.parseXml = Xp;
const Vp = vc, yn = lr;
class wc {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, yn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!zp(t))
      throw (0, yn.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, yn.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, yn.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (Qa(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => Qa(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Xr.XElement = wc;
const Yp = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function zp(e) {
  return Yp.test(e);
}
function Qa(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Xp(e) {
  let t = null;
  const r = Vp.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new wc(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = pt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = lr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = be;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Zn;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Yr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var a = zr;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return a.githubTagPrefix;
  } });
  var s = xo;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var l = Lo;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var m = or;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return m.UUID;
  } });
  var c = Xr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(fe);
var ge = {}, Uo = {}, Ge = {};
function _c(e) {
  return typeof e > "u" || e === null;
}
function Kp(e) {
  return typeof e == "object" && e !== null;
}
function Jp(e) {
  return Array.isArray(e) ? e : _c(e) ? [] : [e];
}
function Qp(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function Zp(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function em(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Ge.isNothing = _c;
Ge.isObject = Kp;
Ge.toArray = Jp;
Ge.repeat = Zp;
Ge.isNegativeZero = em;
Ge.extend = Qp;
function Ac(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Fr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Ac(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Fr.prototype = Object.create(Error.prototype);
Fr.prototype.constructor = Fr;
Fr.prototype.toString = function(t) {
  return this.name + ": " + Ac(this, t);
};
var Kr = Fr, Tr = Ge;
function $i(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function Fi(e, t) {
  return Tr.repeat(" ", t - e.length) + e;
}
function tm(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, m, c = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + c + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    m = $i(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      f
    ), s = Tr.repeat(" ", t.indent) + Fi((e.line - l + 1).toString(), c) + " | " + m.str + `
` + s;
  for (m = $i(e.buffer, n[a], i[a], e.position, f), s += Tr.repeat(" ", t.indent) + Fi((e.line + 1).toString(), c) + " | " + m.str + `
`, s += Tr.repeat("-", t.indent + c + 3 + m.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    m = $i(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      f
    ), s += Tr.repeat(" ", t.indent) + Fi((e.line + l + 1).toString(), c) + " | " + m.str + `
`;
  return s.replace(/\n$/, "");
}
var rm = tm, Za = Kr, nm = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], im = [
  "scalar",
  "sequence",
  "mapping"
];
function om(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function am(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (nm.indexOf(r) === -1)
      throw new Za('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = om(t.styleAliases || null), im.indexOf(this.kind) === -1)
    throw new Za('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Pe = am, vr = Kr, xi = Pe;
function es(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function sm() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function ho(e) {
  return this.extend(e);
}
ho.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof xi)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new vr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof xi))
      throw new vr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new vr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new vr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof xi))
      throw new vr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(ho.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = es(i, "implicit"), i.compiledExplicit = es(i, "explicit"), i.compiledTypeMap = sm(i.compiledImplicit, i.compiledExplicit), i;
};
var Tc = ho, lm = Pe, Sc = new lm("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), cm = Pe, Cc = new cm("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), um = Pe, bc = new um("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), fm = Tc, Rc = new fm({
  explicit: [
    Sc,
    Cc,
    bc
  ]
}), dm = Pe;
function hm(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function pm() {
  return null;
}
function mm(e) {
  return e === null;
}
var Oc = new dm("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: hm,
  construct: pm,
  predicate: mm,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), gm = Pe;
function Em(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function ym(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function vm(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Ic = new gm("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Em,
  construct: ym,
  predicate: vm,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), wm = Ge, _m = Pe;
function Am(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Tm(e) {
  return 48 <= e && e <= 55;
}
function Sm(e) {
  return 48 <= e && e <= 57;
}
function Cm(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Am(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Tm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!Sm(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function bm(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function Rm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !wm.isNegativeZero(e);
}
var Pc = new _m("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Cm,
  construct: bm,
  predicate: Rm,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Nc = Ge, Om = Pe, Im = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Pm(e) {
  return !(e === null || !Im.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Nm(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Dm = /^[-+]?[0-9]+e/;
function $m(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Nc.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Dm.test(r) ? r.replace("e", ".e") : r;
}
function Fm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Nc.isNegativeZero(e));
}
var Dc = new Om("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Pm,
  construct: Nm,
  predicate: Fm,
  represent: $m,
  defaultStyle: "lowercase"
}), $c = Rc.extend({
  implicit: [
    Oc,
    Ic,
    Pc,
    Dc
  ]
}), Fc = $c, xm = Pe, xc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Lc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Lm(e) {
  return e === null ? !1 : xc.exec(e) !== null || Lc.exec(e) !== null;
}
function Um(e) {
  var t, r, n, i, o, a, s, l = 0, m = null, c, f, h;
  if (t = xc.exec(e), t === null && (t = Lc.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (c = +t[10], f = +(t[11] || 0), m = (c * 60 + f) * 6e4, t[9] === "-" && (m = -m)), h = new Date(Date.UTC(r, n, i, o, a, s, l)), m && h.setTime(h.getTime() - m), h;
}
function km(e) {
  return e.toISOString();
}
var Uc = new xm("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Lm,
  construct: Um,
  instanceOf: Date,
  represent: km
}), Mm = Pe;
function Bm(e) {
  return e === "<<" || e === null;
}
var kc = new Mm("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Bm
}), jm = Pe, ko = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Hm(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = ko;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function qm(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = ko, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Gm(e) {
  var t = "", r = 0, n, i, o = e.length, a = ko;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Wm(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Mc = new jm("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Hm,
  construct: qm,
  predicate: Wm,
  represent: Gm
}), Vm = Pe, Ym = Object.prototype.hasOwnProperty, zm = Object.prototype.toString;
function Xm(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, zm.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (Ym.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function Km(e) {
  return e !== null ? e : [];
}
var Bc = new Vm("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Xm,
  construct: Km
}), Jm = Pe, Qm = Object.prototype.toString;
function Zm(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], Qm.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function eg(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var jc = new Jm("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Zm,
  construct: eg
}), tg = Pe, rg = Object.prototype.hasOwnProperty;
function ng(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (rg.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function ig(e) {
  return e !== null ? e : {};
}
var Hc = new tg("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: ng,
  construct: ig
}), Mo = Fc.extend({
  implicit: [
    Uc,
    kc
  ],
  explicit: [
    Mc,
    Bc,
    jc,
    Hc
  ]
}), Nt = Ge, qc = Kr, og = rm, ag = Mo, mt = Object.prototype.hasOwnProperty, Bn = 1, Gc = 2, Wc = 3, jn = 4, Li = 1, sg = 2, ts = 3, lg = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, cg = /[\x85\u2028\u2029]/, ug = /[,\[\]\{\}]/, Vc = /^(?:!|!!|![a-z\-]+!)$/i, Yc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function rs(e) {
  return Object.prototype.toString.call(e);
}
function Ke(e) {
  return e === 10 || e === 13;
}
function xt(e) {
  return e === 9 || e === 32;
}
function $e(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Jt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function fg(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function dg(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function hg(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function ns(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function pg(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function zc(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
}
var Xc = new Array(256), Kc = new Array(256);
for (var Wt = 0; Wt < 256; Wt++)
  Xc[Wt] = ns(Wt) ? 1 : 0, Kc[Wt] = ns(Wt);
function mg(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || ag, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Jc(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = og(r), new qc(t, r);
}
function L(e, t) {
  throw Jc(e, t);
}
function Hn(e, t) {
  e.onWarning && e.onWarning.call(null, Jc(e, t));
}
var is = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && L(t, "duplication of %YAML directive"), n.length !== 1 && L(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && L(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && L(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && Hn(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && L(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Vc.test(i) || L(t, "ill-formed tag handle (first argument) of the TAG directive"), mt.call(t.tagMap, i) && L(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Yc.test(o) || L(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function dt(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || L(e, "expected valid JSON character");
    else lg.test(s) && L(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function os(e, t, r, n) {
  var i, o, a, s;
  for (Nt.isObject(r) || L(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], mt.call(t, o) || (zc(t, o, r[o]), n[o] = !0);
}
function Qt(e, t, r, n, i, o, a, s, l) {
  var m, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), m = 0, c = i.length; m < c; m += 1)
      Array.isArray(i[m]) && L(e, "nested arrays are not supported inside keys"), typeof i == "object" && rs(i[m]) === "[object Object]" && (i[m] = "[object Object]");
  if (typeof i == "object" && rs(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (m = 0, c = o.length; m < c; m += 1)
        os(e, t, o[m], r);
    else
      os(e, t, o, r);
  else
    !e.json && !mt.call(r, i) && mt.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, L(e, "duplicated mapping key")), zc(t, i, o), delete r[i];
  return t;
}
function Bo(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function se(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; xt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Ke(i))
      for (Bo(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Hn(e, "deficient indentation"), n;
}
function ei(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || $e(r)));
}
function jo(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Nt.repeat(`
`, t - 1));
}
function gg(e, t, r) {
  var n, i, o, a, s, l, m, c, f = e.kind, h = e.result, g;
  if (g = e.input.charCodeAt(e.position), $e(g) || Jt(g) || g === 35 || g === 38 || g === 42 || g === 33 || g === 124 || g === 62 || g === 39 || g === 34 || g === 37 || g === 64 || g === 96 || (g === 63 || g === 45) && (i = e.input.charCodeAt(e.position + 1), $e(i) || r && Jt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; g !== 0; ) {
    if (g === 58) {
      if (i = e.input.charCodeAt(e.position + 1), $e(i) || r && Jt(i))
        break;
    } else if (g === 35) {
      if (n = e.input.charCodeAt(e.position - 1), $e(n))
        break;
    } else {
      if (e.position === e.lineStart && ei(e) || r && Jt(g))
        break;
      if (Ke(g))
        if (l = e.line, m = e.lineStart, c = e.lineIndent, se(e, !1, -1), e.lineIndent >= t) {
          s = !0, g = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = m, e.lineIndent = c;
          break;
        }
    }
    s && (dt(e, o, a, !1), jo(e, e.line - l), o = a = e.position, s = !1), xt(g) || (a = e.position + 1), g = e.input.charCodeAt(++e.position);
  }
  return dt(e, o, a, !1), e.result ? !0 : (e.kind = f, e.result = h, !1);
}
function Eg(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (dt(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else Ke(r) ? (dt(e, n, i, !0), jo(e, se(e, !1, t)), n = i = e.position) : e.position === e.lineStart && ei(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  L(e, "unexpected end of the stream within a single quoted scalar");
}
function yg(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return dt(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (dt(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), Ke(s))
        se(e, !1, t);
      else if (s < 256 && Xc[s])
        e.result += Kc[s], e.position++;
      else if ((a = dg(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = fg(s)) >= 0 ? o = (o << 4) + a : L(e, "expected hexadecimal character");
        e.result += pg(o), e.position++;
      } else
        L(e, "unknown escape sequence");
      r = n = e.position;
    } else Ke(s) ? (dt(e, r, n, !0), jo(e, se(e, !1, t)), r = n = e.position) : e.position === e.lineStart && ei(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  L(e, "unexpected end of the stream within a double quoted scalar");
}
function vg(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, m, c, f, h, g, v = /* @__PURE__ */ Object.create(null), E, A, C, S;
  if (S = e.input.charCodeAt(e.position), S === 91)
    c = 93, g = !1, s = [];
  else if (S === 123)
    c = 125, g = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), S = e.input.charCodeAt(++e.position); S !== 0; ) {
    if (se(e, !0, t), S = e.input.charCodeAt(e.position), S === c)
      return e.position++, e.tag = a, e.anchor = l, e.kind = g ? "mapping" : "sequence", e.result = s, !0;
    r ? S === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), A = E = C = null, f = h = !1, S === 63 && (m = e.input.charCodeAt(e.position + 1), $e(m) && (f = h = !0, e.position++, se(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, ar(e, t, Bn, !1, !0), A = e.tag, E = e.result, se(e, !0, t), S = e.input.charCodeAt(e.position), (h || e.line === n) && S === 58 && (f = !0, S = e.input.charCodeAt(++e.position), se(e, !0, t), ar(e, t, Bn, !1, !0), C = e.result), g ? Qt(e, s, v, A, E, C, n, i, o) : f ? s.push(Qt(e, null, v, A, E, C, n, i, o)) : s.push(E), se(e, !0, t), S = e.input.charCodeAt(e.position), S === 44 ? (r = !0, S = e.input.charCodeAt(++e.position)) : r = !1;
  }
  L(e, "unexpected end of the stream within a flow collection");
}
function wg(e, t) {
  var r, n, i = Li, o = !1, a = !1, s = t, l = 0, m = !1, c, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    n = !1;
  else if (f === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Li === i ? i = f === 43 ? ts : sg : L(e, "repeat of a chomping mode identifier");
    else if ((c = hg(f)) >= 0)
      c === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? L(e, "repeat of an indentation width identifier") : (s = t + c - 1, a = !0);
    else
      break;
  if (xt(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (xt(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!Ke(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Bo(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), Ke(f)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === ts ? e.result += Nt.repeat(`
`, o ? 1 + l : l) : i === Li && o && (e.result += `
`);
      break;
    }
    for (n ? xt(f) ? (m = !0, e.result += Nt.repeat(`
`, o ? 1 + l : l)) : m ? (m = !1, e.result += Nt.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += Nt.repeat(`
`, l) : e.result += Nt.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !Ke(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    dt(e, r, e.position, !1);
  }
  return !0;
}
function as(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !$e(a)))); ) {
    if (s = !0, e.position++, se(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, ar(e, t, Wc, !1, !0), o.push(e.result), se(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      L(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function _g(e, t, r) {
  var n, i, o, a, s, l, m = e.tag, c = e.anchor, f = {}, h = /* @__PURE__ */ Object.create(null), g = null, v = null, E = null, A = !1, C = !1, S;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), S = e.input.charCodeAt(e.position); S !== 0; ) {
    if (!A && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (S === 63 || S === 58) && $e(n))
      S === 63 ? (A && (Qt(e, f, h, g, v, null, a, s, l), g = v = E = null), C = !0, A = !0, i = !0) : A ? (A = !1, i = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, S = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !ar(e, r, Gc, !1, !0))
        break;
      if (e.line === o) {
        for (S = e.input.charCodeAt(e.position); xt(S); )
          S = e.input.charCodeAt(++e.position);
        if (S === 58)
          S = e.input.charCodeAt(++e.position), $e(S) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), A && (Qt(e, f, h, g, v, null, a, s, l), g = v = E = null), C = !0, A = !1, i = !1, g = e.tag, v = e.result;
        else if (C)
          L(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = m, e.anchor = c, !0;
      } else if (C)
        L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = m, e.anchor = c, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (A && (a = e.line, s = e.lineStart, l = e.position), ar(e, t, jn, !0, i) && (A ? v = e.result : E = e.result), A || (Qt(e, f, h, g, v, E, a, s, l), g = v = E = null), se(e, !0, -1), S = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && S !== 0)
      L(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return A && Qt(e, f, h, g, v, null, a, s, l), C && (e.tag = m, e.anchor = c, e.kind = "mapping", e.result = f), C;
}
function Ag(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && L(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !$e(a); )
      a === 33 && (n ? L(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Vc.test(i) || L(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), ug.test(o) && L(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Yc.test(o) && L(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : mt.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : L(e, 'undeclared tag handle "' + i + '"'), !0;
}
function Tg(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && L(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !$e(r) && !Jt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function Sg(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !$e(n) && !Jt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), mt.call(e.anchorMap, r) || L(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], se(e, !0, -1), !0;
}
function ar(e, t, r, n, i) {
  var o, a, s, l = 1, m = !1, c = !1, f, h, g, v, E, A;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = jn === r || Wc === r, n && se(e, !0, -1) && (m = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; Ag(e) || Tg(e); )
      se(e, !0, -1) ? (m = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = m || i), (l === 1 || jn === r) && (Bn === r || Gc === r ? E = t : E = t + 1, A = e.position - e.lineStart, l === 1 ? s && (as(e, A) || _g(e, A, E)) || vg(e, E) ? c = !0 : (a && wg(e, E) || Eg(e, E) || yg(e, E) ? c = !0 : Sg(e) ? (c = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : gg(e, E, Bn === r) && (c = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (c = s && as(e, A))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, h = e.implicitTypes.length; f < h; f += 1)
      if (v = e.implicitTypes[f], v.resolve(e.result)) {
        e.result = v.construct(e.result), e.tag = v.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (mt.call(e.typeMap[e.kind || "fallback"], e.tag))
      v = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (v = null, g = e.typeMap.multi[e.kind || "fallback"], f = 0, h = g.length; f < h; f += 1)
        if (e.tag.slice(0, g[f].tag.length) === g[f].tag) {
          v = g[f];
          break;
        }
    v || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && v.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + v.kind + '", not "' + e.kind + '"'), v.resolve(e.result, e.tag) ? (e.result = v.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
}
function Cg(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (se(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !$e(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && L(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; xt(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !Ke(a));
        break;
      }
      if (Ke(a)) break;
      for (r = e.position; a !== 0 && !$e(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Bo(e), mt.call(is, n) ? is[n](e, n, i) : Hn(e, 'unknown document directive "' + n + '"');
  }
  if (se(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, se(e, !0, -1)) : o && L(e, "directives end mark is expected"), ar(e, e.lineIndent - 1, jn, !1, !0), se(e, !0, -1), e.checkLineBreaks && cg.test(e.input.slice(t, e.position)) && Hn(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && ei(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, se(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    L(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Qc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new mg(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, L(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Cg(r);
  return r.documents;
}
function bg(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Qc(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function Rg(e, t) {
  var r = Qc(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new qc("expected a single document in the stream, but found more");
  }
}
Uo.loadAll = bg;
Uo.load = Rg;
var Zc = {}, ti = Ge, Jr = Kr, Og = Mo, eu = Object.prototype.toString, tu = Object.prototype.hasOwnProperty, Ho = 65279, Ig = 9, xr = 10, Pg = 13, Ng = 32, Dg = 33, $g = 34, po = 35, Fg = 37, xg = 38, Lg = 39, Ug = 42, ru = 44, kg = 45, qn = 58, Mg = 61, Bg = 62, jg = 63, Hg = 64, nu = 91, iu = 93, qg = 96, ou = 123, Gg = 124, au = 125, Ae = {};
Ae[0] = "\\0";
Ae[7] = "\\a";
Ae[8] = "\\b";
Ae[9] = "\\t";
Ae[10] = "\\n";
Ae[11] = "\\v";
Ae[12] = "\\f";
Ae[13] = "\\r";
Ae[27] = "\\e";
Ae[34] = '\\"';
Ae[92] = "\\\\";
Ae[133] = "\\N";
Ae[160] = "\\_";
Ae[8232] = "\\L";
Ae[8233] = "\\P";
var Wg = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], Vg = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Yg(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && tu.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function zg(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Jr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + ti.repeat("0", n - t.length) + t;
}
var Xg = 1, Lr = 2;
function Kg(e) {
  this.schema = e.schema || Og, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = ti.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Yg(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Lr : Xg, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function ss(e, t) {
  for (var r = ti.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function mo(e, t) {
  return `
` + ti.repeat(" ", e.indent * t);
}
function Jg(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Gn(e) {
  return e === Ng || e === Ig;
}
function Ur(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ho || 65536 <= e && e <= 1114111;
}
function ls(e) {
  return Ur(e) && e !== Ho && e !== Pg && e !== xr;
}
function cs(e, t, r) {
  var n = ls(e), i = n && !Gn(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== ru && e !== nu && e !== iu && e !== ou && e !== au) && e !== po && !(t === qn && !i) || ls(t) && !Gn(t) && e === po || t === qn && i
  );
}
function Qg(e) {
  return Ur(e) && e !== Ho && !Gn(e) && e !== kg && e !== jg && e !== qn && e !== ru && e !== nu && e !== iu && e !== ou && e !== au && e !== po && e !== xg && e !== Ug && e !== Dg && e !== Gg && e !== Mg && e !== Bg && e !== Lg && e !== $g && e !== Fg && e !== Hg && e !== qg;
}
function Zg(e) {
  return !Gn(e) && e !== qn;
}
function Sr(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function su(e) {
  var t = /^\n* /;
  return t.test(e);
}
var lu = 1, go = 2, cu = 3, uu = 4, Xt = 5;
function e0(e, t, r, n, i, o, a, s) {
  var l, m = 0, c = null, f = !1, h = !1, g = n !== -1, v = -1, E = Qg(Sr(e, 0)) && Zg(Sr(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = Sr(e, l), !Ur(m))
        return Xt;
      E = E && cs(m, c, s), c = m;
    }
  else {
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = Sr(e, l), m === xr)
        f = !0, g && (h = h || // Foldable line = too long, and not more-indented.
        l - v - 1 > n && e[v + 1] !== " ", v = l);
      else if (!Ur(m))
        return Xt;
      E = E && cs(m, c, s), c = m;
    }
    h = h || g && l - v - 1 > n && e[v + 1] !== " ";
  }
  return !f && !h ? E && !a && !i(e) ? lu : o === Lr ? Xt : go : r > 9 && su(e) ? Xt : a ? o === Lr ? Xt : go : h ? uu : cu;
}
function t0(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Lr ? '""' : "''";
    if (!e.noCompatMode && (Wg.indexOf(t) !== -1 || Vg.test(t)))
      return e.quotingType === Lr ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(m) {
      return Jg(e, m);
    }
    switch (e0(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case lu:
        return t;
      case go:
        return "'" + t.replace(/'/g, "''") + "'";
      case cu:
        return "|" + us(t, e.indent) + fs(ss(t, o));
      case uu:
        return ">" + us(t, e.indent) + fs(ss(r0(t, a), o));
      case Xt:
        return '"' + n0(t) + '"';
      default:
        throw new Jr("impossible error: invalid scalar style");
    }
  }();
}
function us(e, t) {
  var r = su(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function fs(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function r0(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var m = e.indexOf(`
`);
    return m = m !== -1 ? m : e.length, r.lastIndex = m, ds(e.slice(0, m), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + ds(l, t), i = o;
  }
  return n;
}
function ds(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function n0(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Sr(e, i), n = Ae[r], !n && Ur(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || zg(r);
  return t;
}
function i0(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (tt(e, t, s, !1, !1) || typeof s > "u" && tt(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function hs(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (tt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && tt(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += mo(e, t)), e.dump && xr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function o0(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, m, c;
  for (a = 0, s = o.length; a < s; a += 1)
    c = "", n !== "" && (c += ", "), e.condenseFlow && (c += '"'), l = o[a], m = r[l], e.replacer && (m = e.replacer.call(r, l, m)), tt(e, t, l, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), tt(e, t, m, !1, !1) && (c += e.dump, n += c));
  e.tag = i, e.dump = "{" + n + "}";
}
function a0(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, m, c, f, h;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Jr("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    h = "", (!n || i !== "") && (h += mo(e, t)), m = a[s], c = r[m], e.replacer && (c = e.replacer.call(r, m, c)), tt(e, t + 1, m, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && xr === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, f && (h += mo(e, t)), tt(e, t + 1, c, !0, f) && (e.dump && xr === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function ps(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, eu.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (tu.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Jr("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function tt(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, ps(e, r, !1) || ps(e, r, !0);
  var s = eu.call(e.dump), l = n, m;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var c = s === "[object Object]" || s === "[object Array]", f, h;
  if (c && (f = e.duplicates.indexOf(r), h = f !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (c && h && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (a0(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (o0(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? hs(e, t - 1, e.dump, i) : hs(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (i0(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && t0(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Jr("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (m = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? m = "!" + m : m.slice(0, 18) === "tag:yaml.org,2002:" ? m = "!!" + m.slice(18) : m = "!<" + m + ">", e.dump = m + " " + e.dump);
  }
  return !0;
}
function s0(e, t) {
  var r = [], n = [], i, o;
  for (Eo(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function Eo(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        Eo(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        Eo(e[n[i]], t, r);
}
function l0(e, t) {
  t = t || {};
  var r = new Kg(t);
  r.noRefs || s0(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), tt(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Zc.dump = l0;
var fu = Uo, c0 = Zc;
function qo(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
ge.Type = Pe;
ge.Schema = Tc;
ge.FAILSAFE_SCHEMA = Rc;
ge.JSON_SCHEMA = $c;
ge.CORE_SCHEMA = Fc;
ge.DEFAULT_SCHEMA = Mo;
ge.load = fu.load;
ge.loadAll = fu.loadAll;
ge.dump = c0.dump;
ge.YAMLException = Kr;
ge.types = {
  binary: Mc,
  float: Dc,
  map: bc,
  null: Oc,
  pairs: jc,
  set: Hc,
  timestamp: Uc,
  bool: Ic,
  int: Pc,
  merge: kc,
  omap: Bc,
  seq: Cc,
  str: Sc
};
ge.safeLoad = qo("safeLoad", "load");
ge.safeLoadAll = qo("safeLoadAll", "loadAll");
ge.safeDump = qo("safeDump", "dump");
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.Lazy = void 0;
class u0 {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
ri.Lazy = u0;
var yo = { exports: {} };
const f0 = "2.0.0", du = 256, d0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, h0 = 16, p0 = du - 6, m0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ni = {
  MAX_LENGTH: du,
  MAX_SAFE_COMPONENT_LENGTH: h0,
  MAX_SAFE_BUILD_LENGTH: p0,
  MAX_SAFE_INTEGER: d0,
  RELEASE_TYPES: m0,
  SEMVER_SPEC_VERSION: f0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const g0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ii = g0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = ni, o = ii;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], m = t.safeSrc = [], c = t.t = {};
  let f = 0;
  const h = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], v = (A) => {
    for (const [C, S] of g)
      A = A.split(`${C}*`).join(`${C}{0,${S}}`).split(`${C}+`).join(`${C}{1,${S}}`);
    return A;
  }, E = (A, C, S) => {
    const $ = v(C), B = f++;
    o(A, B, C), c[A] = B, l[B] = C, m[B] = $, a[B] = new RegExp(C, S ? "g" : void 0), s[B] = new RegExp($, S ? "g" : void 0);
  };
  E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), E("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${h}+`), E("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), E("FULL", `^${l[c.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), E("LOOSE", `^${l[c.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), E("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), E("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", l[c.COERCE], !0), E("COERCERTLFULL", l[c.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", E("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", E("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(yo, yo.exports);
var Qr = yo.exports;
const E0 = Object.freeze({ loose: !0 }), y0 = Object.freeze({}), v0 = (e) => e ? typeof e != "object" ? E0 : e : y0;
var Go = v0;
const ms = /^[0-9]+$/, hu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = ms.test(e), n = ms.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, w0 = (e, t) => hu(t, e);
var pu = {
  compareIdentifiers: hu,
  rcompareIdentifiers: w0
};
const vn = ii, { MAX_LENGTH: gs, MAX_SAFE_INTEGER: wn } = ni, { safeRe: _n, t: An } = Qr, _0 = Go, { compareIdentifiers: Ui } = pu;
let A0 = class Xe {
  constructor(t, r) {
    if (r = _0(r), t instanceof Xe) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > gs)
      throw new TypeError(
        `version is longer than ${gs} characters`
      );
    vn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? _n[An.LOOSE] : _n[An.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > wn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > wn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > wn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < wn)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (vn("SemVer.compare", this.version, this.options, t), !(t instanceof Xe)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Xe(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Xe || (t = new Xe(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof Xe || (t = new Xe(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (vn("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ui(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Xe || (t = new Xe(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (vn("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ui(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? _n[An.PRERELEASELOOSE] : _n[An.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), Ui(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ne = A0;
const Es = Ne, T0 = (e, t, r = !1) => {
  if (e instanceof Es)
    return e;
  try {
    return new Es(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var cr = T0;
const S0 = cr, C0 = (e, t) => {
  const r = S0(e, t);
  return r ? r.version : null;
};
var b0 = C0;
const R0 = cr, O0 = (e, t) => {
  const r = R0(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var I0 = O0;
const ys = Ne, P0 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new ys(
      e instanceof ys ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var N0 = P0;
const vs = cr, D0 = (e, t) => {
  const r = vs(e, null, !0), n = vs(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return r.major !== n.major ? c + "major" : r.minor !== n.minor ? c + "minor" : r.patch !== n.patch ? c + "patch" : "prerelease";
};
var $0 = D0;
const F0 = Ne, x0 = (e, t) => new F0(e, t).major;
var L0 = x0;
const U0 = Ne, k0 = (e, t) => new U0(e, t).minor;
var M0 = k0;
const B0 = Ne, j0 = (e, t) => new B0(e, t).patch;
var H0 = j0;
const q0 = cr, G0 = (e, t) => {
  const r = q0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var W0 = G0;
const ws = Ne, V0 = (e, t, r) => new ws(e, r).compare(new ws(t, r));
var We = V0;
const Y0 = We, z0 = (e, t, r) => Y0(t, e, r);
var X0 = z0;
const K0 = We, J0 = (e, t) => K0(e, t, !0);
var Q0 = J0;
const _s = Ne, Z0 = (e, t, r) => {
  const n = new _s(e, r), i = new _s(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Wo = Z0;
const eE = Wo, tE = (e, t) => e.sort((r, n) => eE(r, n, t));
var rE = tE;
const nE = Wo, iE = (e, t) => e.sort((r, n) => nE(n, r, t));
var oE = iE;
const aE = We, sE = (e, t, r) => aE(e, t, r) > 0;
var oi = sE;
const lE = We, cE = (e, t, r) => lE(e, t, r) < 0;
var Vo = cE;
const uE = We, fE = (e, t, r) => uE(e, t, r) === 0;
var mu = fE;
const dE = We, hE = (e, t, r) => dE(e, t, r) !== 0;
var gu = hE;
const pE = We, mE = (e, t, r) => pE(e, t, r) >= 0;
var Yo = mE;
const gE = We, EE = (e, t, r) => gE(e, t, r) <= 0;
var zo = EE;
const yE = mu, vE = gu, wE = oi, _E = Yo, AE = Vo, TE = zo, SE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return yE(e, r, n);
    case "!=":
      return vE(e, r, n);
    case ">":
      return wE(e, r, n);
    case ">=":
      return _E(e, r, n);
    case "<":
      return AE(e, r, n);
    case "<=":
      return TE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Eu = SE;
const CE = Ne, bE = cr, { safeRe: Tn, t: Sn } = Qr, RE = (e, t) => {
  if (e instanceof CE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Tn[Sn.COERCEFULL] : Tn[Sn.COERCE]);
  else {
    const l = t.includePrerelease ? Tn[Sn.COERCERTLFULL] : Tn[Sn.COERCERTL];
    let m;
    for (; (m = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || m.index + m[0].length !== r.index + r[0].length) && (r = m), l.lastIndex = m.index + m[1].length + m[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return bE(`${n}.${i}.${o}${a}${s}`, t);
};
var OE = RE;
class IE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var PE = IE, ki, As;
function Ve() {
  if (As) return ki;
  As = 1;
  const e = /\s+/g;
  class t {
    constructor(O, N) {
      if (N = i(N), O instanceof t)
        return O.loose === !!N.loose && O.includePrerelease === !!N.includePrerelease ? O : new t(O.raw, N);
      if (O instanceof o)
        return this.raw = O.value, this.set = [[O]], this.formatted = void 0, this;
      if (this.options = N, this.loose = !!N.loose, this.includePrerelease = !!N.includePrerelease, this.raw = O.trim().replace(e, " "), this.set = this.raw.split("||").map((R) => this.parseRange(R.trim())).filter((R) => R.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const R = this.set[0];
        if (this.set = this.set.filter((D) => !E(D[0])), this.set.length === 0)
          this.set = [R];
        else if (this.set.length > 1) {
          for (const D of this.set)
            if (D.length === 1 && A(D[0])) {
              this.set = [D];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let O = 0; O < this.set.length; O++) {
          O > 0 && (this.formatted += "||");
          const N = this.set[O];
          for (let R = 0; R < N.length; R++)
            R > 0 && (this.formatted += " "), this.formatted += N[R].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(O) {
      const R = ((this.options.includePrerelease && g) | (this.options.loose && v)) + ":" + O, D = n.get(R);
      if (D)
        return D;
      const P = this.options.loose, k = P ? l[m.HYPHENRANGELOOSE] : l[m.HYPHENRANGE];
      O = O.replace(k, Y(this.options.includePrerelease)), a("hyphen replace", O), O = O.replace(l[m.COMPARATORTRIM], c), a("comparator trim", O), O = O.replace(l[m.TILDETRIM], f), a("tilde trim", O), O = O.replace(l[m.CARETTRIM], h), a("caret trim", O);
      let G = O.split(" ").map((M) => S(M, this.options)).join(" ").split(/\s+/).map((M) => H(M, this.options));
      P && (G = G.filter((M) => (a("loose invalid filter", M, this.options), !!M.match(l[m.COMPARATORLOOSE])))), a("range list", G);
      const F = /* @__PURE__ */ new Map(), z = G.map((M) => new o(M, this.options));
      for (const M of z) {
        if (E(M))
          return [M];
        F.set(M.value, M);
      }
      F.size > 1 && F.has("") && F.delete("");
      const ce = [...F.values()];
      return n.set(R, ce), ce;
    }
    intersects(O, N) {
      if (!(O instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((R) => C(R, N) && O.set.some((D) => C(D, N) && R.every((P) => D.every((k) => P.intersects(k, N)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(O) {
      if (!O)
        return !1;
      if (typeof O == "string")
        try {
          O = new s(O, this.options);
        } catch {
          return !1;
        }
      for (let N = 0; N < this.set.length; N++)
        if (Z(this.set[N], O, this.options))
          return !0;
      return !1;
    }
  }
  ki = t;
  const r = PE, n = new r(), i = Go, o = ai(), a = ii, s = Ne, {
    safeRe: l,
    t: m,
    comparatorTrimReplace: c,
    tildeTrimReplace: f,
    caretTrimReplace: h
  } = Qr, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: v } = ni, E = (I) => I.value === "<0.0.0-0", A = (I) => I.value === "", C = (I, O) => {
    let N = !0;
    const R = I.slice();
    let D = R.pop();
    for (; N && R.length; )
      N = R.every((P) => D.intersects(P, O)), D = R.pop();
    return N;
  }, S = (I, O) => (I = I.replace(l[m.BUILD], ""), a("comp", I, O), I = J(I, O), a("caret", I), I = B(I, O), a("tildes", I), I = oe(I, O), a("xrange", I), I = y(I, O), a("stars", I), I), $ = (I) => !I || I.toLowerCase() === "x" || I === "*", B = (I, O) => I.trim().split(/\s+/).map((N) => q(N, O)).join(" "), q = (I, O) => {
    const N = O.loose ? l[m.TILDELOOSE] : l[m.TILDE];
    return I.replace(N, (R, D, P, k, G) => {
      a("tilde", I, R, D, P, k, G);
      let F;
      return $(D) ? F = "" : $(P) ? F = `>=${D}.0.0 <${+D + 1}.0.0-0` : $(k) ? F = `>=${D}.${P}.0 <${D}.${+P + 1}.0-0` : G ? (a("replaceTilde pr", G), F = `>=${D}.${P}.${k}-${G} <${D}.${+P + 1}.0-0`) : F = `>=${D}.${P}.${k} <${D}.${+P + 1}.0-0`, a("tilde return", F), F;
    });
  }, J = (I, O) => I.trim().split(/\s+/).map((N) => Q(N, O)).join(" "), Q = (I, O) => {
    a("caret", I, O);
    const N = O.loose ? l[m.CARETLOOSE] : l[m.CARET], R = O.includePrerelease ? "-0" : "";
    return I.replace(N, (D, P, k, G, F) => {
      a("caret", I, D, P, k, G, F);
      let z;
      return $(P) ? z = "" : $(k) ? z = `>=${P}.0.0${R} <${+P + 1}.0.0-0` : $(G) ? P === "0" ? z = `>=${P}.${k}.0${R} <${P}.${+k + 1}.0-0` : z = `>=${P}.${k}.0${R} <${+P + 1}.0.0-0` : F ? (a("replaceCaret pr", F), P === "0" ? k === "0" ? z = `>=${P}.${k}.${G}-${F} <${P}.${k}.${+G + 1}-0` : z = `>=${P}.${k}.${G}-${F} <${P}.${+k + 1}.0-0` : z = `>=${P}.${k}.${G}-${F} <${+P + 1}.0.0-0`) : (a("no pr"), P === "0" ? k === "0" ? z = `>=${P}.${k}.${G}${R} <${P}.${k}.${+G + 1}-0` : z = `>=${P}.${k}.${G}${R} <${P}.${+k + 1}.0-0` : z = `>=${P}.${k}.${G} <${+P + 1}.0.0-0`), a("caret return", z), z;
    });
  }, oe = (I, O) => (a("replaceXRanges", I, O), I.split(/\s+/).map((N) => U(N, O)).join(" ")), U = (I, O) => {
    I = I.trim();
    const N = O.loose ? l[m.XRANGELOOSE] : l[m.XRANGE];
    return I.replace(N, (R, D, P, k, G, F) => {
      a("xRange", I, R, D, P, k, G, F);
      const z = $(P), ce = z || $(k), M = ce || $(G), Ee = M;
      return D === "=" && Ee && (D = ""), F = O.includePrerelease ? "-0" : "", z ? D === ">" || D === "<" ? R = "<0.0.0-0" : R = "*" : D && Ee ? (ce && (k = 0), G = 0, D === ">" ? (D = ">=", ce ? (P = +P + 1, k = 0, G = 0) : (k = +k + 1, G = 0)) : D === "<=" && (D = "<", ce ? P = +P + 1 : k = +k + 1), D === "<" && (F = "-0"), R = `${D + P}.${k}.${G}${F}`) : ce ? R = `>=${P}.0.0${F} <${+P + 1}.0.0-0` : M && (R = `>=${P}.${k}.0${F} <${P}.${+k + 1}.0-0`), a("xRange return", R), R;
    });
  }, y = (I, O) => (a("replaceStars", I, O), I.trim().replace(l[m.STAR], "")), H = (I, O) => (a("replaceGTE0", I, O), I.trim().replace(l[O.includePrerelease ? m.GTE0PRE : m.GTE0], "")), Y = (I) => (O, N, R, D, P, k, G, F, z, ce, M, Ee) => ($(R) ? N = "" : $(D) ? N = `>=${R}.0.0${I ? "-0" : ""}` : $(P) ? N = `>=${R}.${D}.0${I ? "-0" : ""}` : k ? N = `>=${N}` : N = `>=${N}${I ? "-0" : ""}`, $(z) ? F = "" : $(ce) ? F = `<${+z + 1}.0.0-0` : $(M) ? F = `<${z}.${+ce + 1}.0-0` : Ee ? F = `<=${z}.${ce}.${M}-${Ee}` : I ? F = `<${z}.${ce}.${+M + 1}-0` : F = `<=${F}`, `${N} ${F}`.trim()), Z = (I, O, N) => {
    for (let R = 0; R < I.length; R++)
      if (!I[R].test(O))
        return !1;
    if (O.prerelease.length && !N.includePrerelease) {
      for (let R = 0; R < I.length; R++)
        if (a(I[R].semver), I[R].semver !== o.ANY && I[R].semver.prerelease.length > 0) {
          const D = I[R].semver;
          if (D.major === O.major && D.minor === O.minor && D.patch === O.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ki;
}
var Mi, Ts;
function ai() {
  if (Ts) return Mi;
  Ts = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, f) {
      if (f = r(f), c instanceof t) {
        if (c.loose === !!f.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, f), this.options = f, this.loose = !!f.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = c.match(f);
      if (!h)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new s(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new s(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, f) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, f).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, f).test(c.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, f) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, f) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Mi = t;
  const r = Go, { safeRe: n, t: i } = Qr, o = Eu, a = ii, s = Ne, l = Ve();
  return Mi;
}
const NE = Ve(), DE = (e, t, r) => {
  try {
    t = new NE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var si = DE;
const $E = Ve(), FE = (e, t) => new $E(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var xE = FE;
const LE = Ne, UE = Ve(), kE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new UE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new LE(n, r));
  }), n;
};
var ME = kE;
const BE = Ne, jE = Ve(), HE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new jE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new BE(n, r));
  }), n;
};
var qE = HE;
const Bi = Ne, GE = Ve(), Ss = oi, WE = (e, t) => {
  e = new GE(e, t);
  let r = new Bi("0.0.0");
  if (e.test(r) || (r = new Bi("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new Bi(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || Ss(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || Ss(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var VE = WE;
const YE = Ve(), zE = (e, t) => {
  try {
    return new YE(e, t).range || "*";
  } catch {
    return null;
  }
};
var XE = zE;
const KE = Ne, yu = ai(), { ANY: JE } = yu, QE = Ve(), ZE = si, Cs = oi, bs = Vo, ey = zo, ty = Yo, ry = (e, t, r, n) => {
  e = new KE(e, n), t = new QE(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = Cs, o = ey, a = bs, s = ">", l = ">=";
      break;
    case "<":
      i = bs, o = ty, a = Cs, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (ZE(e, t, n))
    return !1;
  for (let m = 0; m < t.set.length; ++m) {
    const c = t.set[m];
    let f = null, h = null;
    if (c.forEach((g) => {
      g.semver === JE && (g = new yu(">=0.0.0")), f = f || g, h = h || g, i(g.semver, f.semver, n) ? f = g : a(g.semver, h.semver, n) && (h = g);
    }), f.operator === s || f.operator === l || (!h.operator || h.operator === s) && o(e, h.semver))
      return !1;
    if (h.operator === l && a(e, h.semver))
      return !1;
  }
  return !0;
};
var Xo = ry;
const ny = Xo, iy = (e, t, r) => ny(e, t, ">", r);
var oy = iy;
const ay = Xo, sy = (e, t, r) => ay(e, t, "<", r);
var ly = sy;
const Rs = Ve(), cy = (e, t, r) => (e = new Rs(e, r), t = new Rs(t, r), e.intersects(t, r));
var uy = cy;
const fy = si, dy = We;
var hy = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((c, f) => dy(c, f, r));
  for (const c of a)
    fy(c, t, r) ? (o = c, i || (i = c)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [c, f] of n)
    c === f ? s.push(c) : !f && c === a[0] ? s.push("*") : f ? c === a[0] ? s.push(`<=${f}`) : s.push(`${c} - ${f}`) : s.push(`>=${c}`);
  const l = s.join(" || "), m = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < m.length ? l : t;
};
const Os = Ve(), Ko = ai(), { ANY: ji } = Ko, wr = si, Jo = We, py = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Os(e, r), t = new Os(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = gy(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, my = [new Ko(">=0.0.0-0")], Is = [new Ko(">=0.0.0")], gy = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ji) {
    if (t.length === 1 && t[0].semver === ji)
      return !0;
    r.includePrerelease ? e = my : e = Is;
  }
  if (t.length === 1 && t[0].semver === ji) {
    if (r.includePrerelease)
      return !0;
    t = Is;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = Ps(i, g, r) : g.operator === "<" || g.operator === "<=" ? o = Ns(o, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = Jo(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (i && !wr(g, String(i), r) || o && !wr(g, String(o), r))
      return null;
    for (const v of t)
      if (!wr(g, String(v), r))
        return !1;
    return !0;
  }
  let s, l, m, c, f = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of t) {
    if (c = c || g.operator === ">" || g.operator === ">=", m = m || g.operator === "<" || g.operator === "<=", i) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === ">" || g.operator === ">=") {
        if (s = Ps(i, g, r), s === g && s !== i)
          return !1;
      } else if (i.operator === ">=" && !wr(i.semver, String(g), r))
        return !1;
    }
    if (o) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (l = Ns(o, g, r), l === g && l !== o)
          return !1;
      } else if (o.operator === "<=" && !wr(o.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && m && !o && a !== 0 || o && c && !i && a !== 0 || h || f);
}, Ps = (e, t, r) => {
  if (!e)
    return t;
  const n = Jo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ns = (e, t, r) => {
  if (!e)
    return t;
  const n = Jo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Ey = py;
const Hi = Qr, Ds = ni, yy = Ne, $s = pu, vy = cr, wy = b0, _y = I0, Ay = N0, Ty = $0, Sy = L0, Cy = M0, by = H0, Ry = W0, Oy = We, Iy = X0, Py = Q0, Ny = Wo, Dy = rE, $y = oE, Fy = oi, xy = Vo, Ly = mu, Uy = gu, ky = Yo, My = zo, By = Eu, jy = OE, Hy = ai(), qy = Ve(), Gy = si, Wy = xE, Vy = ME, Yy = qE, zy = VE, Xy = XE, Ky = Xo, Jy = oy, Qy = ly, Zy = uy, ev = hy, tv = Ey;
var vu = {
  parse: vy,
  valid: wy,
  clean: _y,
  inc: Ay,
  diff: Ty,
  major: Sy,
  minor: Cy,
  patch: by,
  prerelease: Ry,
  compare: Oy,
  rcompare: Iy,
  compareLoose: Py,
  compareBuild: Ny,
  sort: Dy,
  rsort: $y,
  gt: Fy,
  lt: xy,
  eq: Ly,
  neq: Uy,
  gte: ky,
  lte: My,
  cmp: By,
  coerce: jy,
  Comparator: Hy,
  Range: qy,
  satisfies: Gy,
  toComparators: Wy,
  maxSatisfying: Vy,
  minSatisfying: Yy,
  minVersion: zy,
  validRange: Xy,
  outside: Ky,
  gtr: Jy,
  ltr: Qy,
  intersects: Zy,
  simplifyRange: ev,
  subset: tv,
  SemVer: yy,
  re: Hi.re,
  src: Hi.src,
  tokens: Hi.t,
  SEMVER_SPEC_VERSION: Ds.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ds.RELEASE_TYPES,
  compareIdentifiers: $s.compareIdentifiers,
  rcompareIdentifiers: $s.rcompareIdentifiers
}, Zr = {}, Wn = { exports: {} };
Wn.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", m = "[object AsyncFunction]", c = "[object Boolean]", f = "[object Date]", h = "[object Error]", g = "[object Function]", v = "[object GeneratorFunction]", E = "[object Map]", A = "[object Number]", C = "[object Null]", S = "[object Object]", $ = "[object Promise]", B = "[object Proxy]", q = "[object RegExp]", J = "[object Set]", Q = "[object String]", oe = "[object Symbol]", U = "[object Undefined]", y = "[object WeakMap]", H = "[object ArrayBuffer]", Y = "[object DataView]", Z = "[object Float32Array]", I = "[object Float64Array]", O = "[object Int8Array]", N = "[object Int16Array]", R = "[object Int32Array]", D = "[object Uint8Array]", P = "[object Uint8ClampedArray]", k = "[object Uint16Array]", G = "[object Uint32Array]", F = /[\\^$.*+?()[\]{}|]/g, z = /^\[object .+?Constructor\]$/, ce = /^(?:0|[1-9]\d*)$/, M = {};
  M[Z] = M[I] = M[O] = M[N] = M[R] = M[D] = M[P] = M[k] = M[G] = !0, M[s] = M[l] = M[H] = M[c] = M[Y] = M[f] = M[h] = M[g] = M[E] = M[A] = M[S] = M[q] = M[J] = M[Q] = M[y] = !1;
  var Ee = typeof Ce == "object" && Ce && Ce.Object === Object && Ce, dr = typeof self == "object" && self && self.Object === Object && self, Ue = Ee || dr || Function("return this")(), hr = t && !t.nodeType && t, Ht = hr && !0 && e && !e.nodeType && e, nn = Ht && Ht.exports === hr, d = nn && Ee.process, u = function() {
    try {
      return d && d.binding && d.binding("util");
    } catch {
    }
  }(), T = u && u.isTypedArray;
  function w(p, _) {
    for (var b = -1, x = p == null ? 0 : p.length, K = 0, j = []; ++b < x; ) {
      var ie = p[b];
      _(ie, b, p) && (j[K++] = ie);
    }
    return j;
  }
  function V(p, _) {
    for (var b = -1, x = _.length, K = p.length; ++b < x; )
      p[K + b] = _[b];
    return p;
  }
  function ee(p, _) {
    for (var b = -1, x = p == null ? 0 : p.length; ++b < x; )
      if (_(p[b], b, p))
        return !0;
    return !1;
  }
  function ae(p, _) {
    for (var b = -1, x = Array(p); ++b < p; )
      x[b] = _(b);
    return x;
  }
  function ye(p) {
    return function(_) {
      return p(_);
    };
  }
  function ve(p, _) {
    return p.has(_);
  }
  function ke(p, _) {
    return p == null ? void 0 : p[_];
  }
  function ue(p) {
    var _ = -1, b = Array(p.size);
    return p.forEach(function(x, K) {
      b[++_] = [K, x];
    }), b;
  }
  function Me(p, _) {
    return function(b) {
      return p(_(b));
    };
  }
  function Ei(p) {
    var _ = -1, b = Array(p.size);
    return p.forEach(function(x) {
      b[++_] = x;
    }), b;
  }
  var on = Array.prototype, pr = Function.prototype, At = Object.prototype, yi = Ue["__core-js_shared__"], ia = pr.toString, ze = At.hasOwnProperty, oa = function() {
    var p = /[^.]+$/.exec(yi && yi.keys && yi.keys.IE_PROTO || "");
    return p ? "Symbol(src)_1." + p : "";
  }(), aa = At.toString, Lu = RegExp(
    "^" + ia.call(ze).replace(F, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), sa = nn ? Ue.Buffer : void 0, an = Ue.Symbol, la = Ue.Uint8Array, ca = At.propertyIsEnumerable, Uu = on.splice, Tt = an ? an.toStringTag : void 0, ua = Object.getOwnPropertySymbols, ku = sa ? sa.isBuffer : void 0, Mu = Me(Object.keys, Object), vi = qt(Ue, "DataView"), mr = qt(Ue, "Map"), wi = qt(Ue, "Promise"), _i = qt(Ue, "Set"), Ai = qt(Ue, "WeakMap"), gr = qt(Object, "create"), Bu = bt(vi), ju = bt(mr), Hu = bt(wi), qu = bt(_i), Gu = bt(Ai), fa = an ? an.prototype : void 0, Ti = fa ? fa.valueOf : void 0;
  function St(p) {
    var _ = -1, b = p == null ? 0 : p.length;
    for (this.clear(); ++_ < b; ) {
      var x = p[_];
      this.set(x[0], x[1]);
    }
  }
  function Wu() {
    this.__data__ = gr ? gr(null) : {}, this.size = 0;
  }
  function Vu(p) {
    var _ = this.has(p) && delete this.__data__[p];
    return this.size -= _ ? 1 : 0, _;
  }
  function Yu(p) {
    var _ = this.__data__;
    if (gr) {
      var b = _[p];
      return b === n ? void 0 : b;
    }
    return ze.call(_, p) ? _[p] : void 0;
  }
  function zu(p) {
    var _ = this.__data__;
    return gr ? _[p] !== void 0 : ze.call(_, p);
  }
  function Xu(p, _) {
    var b = this.__data__;
    return this.size += this.has(p) ? 0 : 1, b[p] = gr && _ === void 0 ? n : _, this;
  }
  St.prototype.clear = Wu, St.prototype.delete = Vu, St.prototype.get = Yu, St.prototype.has = zu, St.prototype.set = Xu;
  function Qe(p) {
    var _ = -1, b = p == null ? 0 : p.length;
    for (this.clear(); ++_ < b; ) {
      var x = p[_];
      this.set(x[0], x[1]);
    }
  }
  function Ku() {
    this.__data__ = [], this.size = 0;
  }
  function Ju(p) {
    var _ = this.__data__, b = ln(_, p);
    if (b < 0)
      return !1;
    var x = _.length - 1;
    return b == x ? _.pop() : Uu.call(_, b, 1), --this.size, !0;
  }
  function Qu(p) {
    var _ = this.__data__, b = ln(_, p);
    return b < 0 ? void 0 : _[b][1];
  }
  function Zu(p) {
    return ln(this.__data__, p) > -1;
  }
  function ef(p, _) {
    var b = this.__data__, x = ln(b, p);
    return x < 0 ? (++this.size, b.push([p, _])) : b[x][1] = _, this;
  }
  Qe.prototype.clear = Ku, Qe.prototype.delete = Ju, Qe.prototype.get = Qu, Qe.prototype.has = Zu, Qe.prototype.set = ef;
  function Ct(p) {
    var _ = -1, b = p == null ? 0 : p.length;
    for (this.clear(); ++_ < b; ) {
      var x = p[_];
      this.set(x[0], x[1]);
    }
  }
  function tf() {
    this.size = 0, this.__data__ = {
      hash: new St(),
      map: new (mr || Qe)(),
      string: new St()
    };
  }
  function rf(p) {
    var _ = cn(this, p).delete(p);
    return this.size -= _ ? 1 : 0, _;
  }
  function nf(p) {
    return cn(this, p).get(p);
  }
  function of(p) {
    return cn(this, p).has(p);
  }
  function af(p, _) {
    var b = cn(this, p), x = b.size;
    return b.set(p, _), this.size += b.size == x ? 0 : 1, this;
  }
  Ct.prototype.clear = tf, Ct.prototype.delete = rf, Ct.prototype.get = nf, Ct.prototype.has = of, Ct.prototype.set = af;
  function sn(p) {
    var _ = -1, b = p == null ? 0 : p.length;
    for (this.__data__ = new Ct(); ++_ < b; )
      this.add(p[_]);
  }
  function sf(p) {
    return this.__data__.set(p, n), this;
  }
  function lf(p) {
    return this.__data__.has(p);
  }
  sn.prototype.add = sn.prototype.push = sf, sn.prototype.has = lf;
  function rt(p) {
    var _ = this.__data__ = new Qe(p);
    this.size = _.size;
  }
  function cf() {
    this.__data__ = new Qe(), this.size = 0;
  }
  function uf(p) {
    var _ = this.__data__, b = _.delete(p);
    return this.size = _.size, b;
  }
  function ff(p) {
    return this.__data__.get(p);
  }
  function df(p) {
    return this.__data__.has(p);
  }
  function hf(p, _) {
    var b = this.__data__;
    if (b instanceof Qe) {
      var x = b.__data__;
      if (!mr || x.length < r - 1)
        return x.push([p, _]), this.size = ++b.size, this;
      b = this.__data__ = new Ct(x);
    }
    return b.set(p, _), this.size = b.size, this;
  }
  rt.prototype.clear = cf, rt.prototype.delete = uf, rt.prototype.get = ff, rt.prototype.has = df, rt.prototype.set = hf;
  function pf(p, _) {
    var b = un(p), x = !b && If(p), K = !b && !x && Si(p), j = !b && !x && !K && wa(p), ie = b || x || K || j, de = ie ? ae(p.length, String) : [], pe = de.length;
    for (var te in p)
      ze.call(p, te) && !(ie && // Safari 9 has enumerable `arguments.length` in strict mode.
      (te == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      K && (te == "offset" || te == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (te == "buffer" || te == "byteLength" || te == "byteOffset") || // Skip index properties.
      Sf(te, pe))) && de.push(te);
    return de;
  }
  function ln(p, _) {
    for (var b = p.length; b--; )
      if (ga(p[b][0], _))
        return b;
    return -1;
  }
  function mf(p, _, b) {
    var x = _(p);
    return un(p) ? x : V(x, b(p));
  }
  function Er(p) {
    return p == null ? p === void 0 ? U : C : Tt && Tt in Object(p) ? Af(p) : Of(p);
  }
  function da(p) {
    return yr(p) && Er(p) == s;
  }
  function ha(p, _, b, x, K) {
    return p === _ ? !0 : p == null || _ == null || !yr(p) && !yr(_) ? p !== p && _ !== _ : gf(p, _, b, x, ha, K);
  }
  function gf(p, _, b, x, K, j) {
    var ie = un(p), de = un(_), pe = ie ? l : nt(p), te = de ? l : nt(_);
    pe = pe == s ? S : pe, te = te == s ? S : te;
    var Fe = pe == S, Be = te == S, we = pe == te;
    if (we && Si(p)) {
      if (!Si(_))
        return !1;
      ie = !0, Fe = !1;
    }
    if (we && !Fe)
      return j || (j = new rt()), ie || wa(p) ? pa(p, _, b, x, K, j) : wf(p, _, pe, b, x, K, j);
    if (!(b & i)) {
      var xe = Fe && ze.call(p, "__wrapped__"), Le = Be && ze.call(_, "__wrapped__");
      if (xe || Le) {
        var it = xe ? p.value() : p, Ze = Le ? _.value() : _;
        return j || (j = new rt()), K(it, Ze, b, x, j);
      }
    }
    return we ? (j || (j = new rt()), _f(p, _, b, x, K, j)) : !1;
  }
  function Ef(p) {
    if (!va(p) || bf(p))
      return !1;
    var _ = Ea(p) ? Lu : z;
    return _.test(bt(p));
  }
  function yf(p) {
    return yr(p) && ya(p.length) && !!M[Er(p)];
  }
  function vf(p) {
    if (!Rf(p))
      return Mu(p);
    var _ = [];
    for (var b in Object(p))
      ze.call(p, b) && b != "constructor" && _.push(b);
    return _;
  }
  function pa(p, _, b, x, K, j) {
    var ie = b & i, de = p.length, pe = _.length;
    if (de != pe && !(ie && pe > de))
      return !1;
    var te = j.get(p);
    if (te && j.get(_))
      return te == _;
    var Fe = -1, Be = !0, we = b & o ? new sn() : void 0;
    for (j.set(p, _), j.set(_, p); ++Fe < de; ) {
      var xe = p[Fe], Le = _[Fe];
      if (x)
        var it = ie ? x(Le, xe, Fe, _, p, j) : x(xe, Le, Fe, p, _, j);
      if (it !== void 0) {
        if (it)
          continue;
        Be = !1;
        break;
      }
      if (we) {
        if (!ee(_, function(Ze, Rt) {
          if (!ve(we, Rt) && (xe === Ze || K(xe, Ze, b, x, j)))
            return we.push(Rt);
        })) {
          Be = !1;
          break;
        }
      } else if (!(xe === Le || K(xe, Le, b, x, j))) {
        Be = !1;
        break;
      }
    }
    return j.delete(p), j.delete(_), Be;
  }
  function wf(p, _, b, x, K, j, ie) {
    switch (b) {
      case Y:
        if (p.byteLength != _.byteLength || p.byteOffset != _.byteOffset)
          return !1;
        p = p.buffer, _ = _.buffer;
      case H:
        return !(p.byteLength != _.byteLength || !j(new la(p), new la(_)));
      case c:
      case f:
      case A:
        return ga(+p, +_);
      case h:
        return p.name == _.name && p.message == _.message;
      case q:
      case Q:
        return p == _ + "";
      case E:
        var de = ue;
      case J:
        var pe = x & i;
        if (de || (de = Ei), p.size != _.size && !pe)
          return !1;
        var te = ie.get(p);
        if (te)
          return te == _;
        x |= o, ie.set(p, _);
        var Fe = pa(de(p), de(_), x, K, j, ie);
        return ie.delete(p), Fe;
      case oe:
        if (Ti)
          return Ti.call(p) == Ti.call(_);
    }
    return !1;
  }
  function _f(p, _, b, x, K, j) {
    var ie = b & i, de = ma(p), pe = de.length, te = ma(_), Fe = te.length;
    if (pe != Fe && !ie)
      return !1;
    for (var Be = pe; Be--; ) {
      var we = de[Be];
      if (!(ie ? we in _ : ze.call(_, we)))
        return !1;
    }
    var xe = j.get(p);
    if (xe && j.get(_))
      return xe == _;
    var Le = !0;
    j.set(p, _), j.set(_, p);
    for (var it = ie; ++Be < pe; ) {
      we = de[Be];
      var Ze = p[we], Rt = _[we];
      if (x)
        var _a = ie ? x(Rt, Ze, we, _, p, j) : x(Ze, Rt, we, p, _, j);
      if (!(_a === void 0 ? Ze === Rt || K(Ze, Rt, b, x, j) : _a)) {
        Le = !1;
        break;
      }
      it || (it = we == "constructor");
    }
    if (Le && !it) {
      var fn = p.constructor, dn = _.constructor;
      fn != dn && "constructor" in p && "constructor" in _ && !(typeof fn == "function" && fn instanceof fn && typeof dn == "function" && dn instanceof dn) && (Le = !1);
    }
    return j.delete(p), j.delete(_), Le;
  }
  function ma(p) {
    return mf(p, Df, Tf);
  }
  function cn(p, _) {
    var b = p.__data__;
    return Cf(_) ? b[typeof _ == "string" ? "string" : "hash"] : b.map;
  }
  function qt(p, _) {
    var b = ke(p, _);
    return Ef(b) ? b : void 0;
  }
  function Af(p) {
    var _ = ze.call(p, Tt), b = p[Tt];
    try {
      p[Tt] = void 0;
      var x = !0;
    } catch {
    }
    var K = aa.call(p);
    return x && (_ ? p[Tt] = b : delete p[Tt]), K;
  }
  var Tf = ua ? function(p) {
    return p == null ? [] : (p = Object(p), w(ua(p), function(_) {
      return ca.call(p, _);
    }));
  } : $f, nt = Er;
  (vi && nt(new vi(new ArrayBuffer(1))) != Y || mr && nt(new mr()) != E || wi && nt(wi.resolve()) != $ || _i && nt(new _i()) != J || Ai && nt(new Ai()) != y) && (nt = function(p) {
    var _ = Er(p), b = _ == S ? p.constructor : void 0, x = b ? bt(b) : "";
    if (x)
      switch (x) {
        case Bu:
          return Y;
        case ju:
          return E;
        case Hu:
          return $;
        case qu:
          return J;
        case Gu:
          return y;
      }
    return _;
  });
  function Sf(p, _) {
    return _ = _ ?? a, !!_ && (typeof p == "number" || ce.test(p)) && p > -1 && p % 1 == 0 && p < _;
  }
  function Cf(p) {
    var _ = typeof p;
    return _ == "string" || _ == "number" || _ == "symbol" || _ == "boolean" ? p !== "__proto__" : p === null;
  }
  function bf(p) {
    return !!oa && oa in p;
  }
  function Rf(p) {
    var _ = p && p.constructor, b = typeof _ == "function" && _.prototype || At;
    return p === b;
  }
  function Of(p) {
    return aa.call(p);
  }
  function bt(p) {
    if (p != null) {
      try {
        return ia.call(p);
      } catch {
      }
      try {
        return p + "";
      } catch {
      }
    }
    return "";
  }
  function ga(p, _) {
    return p === _ || p !== p && _ !== _;
  }
  var If = da(/* @__PURE__ */ function() {
    return arguments;
  }()) ? da : function(p) {
    return yr(p) && ze.call(p, "callee") && !ca.call(p, "callee");
  }, un = Array.isArray;
  function Pf(p) {
    return p != null && ya(p.length) && !Ea(p);
  }
  var Si = ku || Ff;
  function Nf(p, _) {
    return ha(p, _);
  }
  function Ea(p) {
    if (!va(p))
      return !1;
    var _ = Er(p);
    return _ == g || _ == v || _ == m || _ == B;
  }
  function ya(p) {
    return typeof p == "number" && p > -1 && p % 1 == 0 && p <= a;
  }
  function va(p) {
    var _ = typeof p;
    return p != null && (_ == "object" || _ == "function");
  }
  function yr(p) {
    return p != null && typeof p == "object";
  }
  var wa = T ? ye(T) : yf;
  function Df(p) {
    return Pf(p) ? pf(p) : vf(p);
  }
  function $f() {
    return [];
  }
  function Ff() {
    return !1;
  }
  e.exports = Nf;
})(Wn, Wn.exports);
var rv = Wn.exports;
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.DownloadedUpdateHelper = void 0;
Zr.createTempUpdateFile = sv;
const nv = Wr, iv = yt, Fs = rv, It = wt, Or = ne;
class ov {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Or.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Fs(this.versionInfo, r) && Fs(this.fileInfo.info, n.info) && await (0, It.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, It.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, It.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, It.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, It.readJson)(n);
    } catch (m) {
      let c = "No cached update info available";
      return m.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${m.message})`), r.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Or.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, It.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await av(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return Or.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Zr.DownloadedUpdateHelper = ov;
function av(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, nv.createHash)(t);
    a.on("error", o).setEncoding(r), (0, iv.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function sv(e, t, r) {
  let n = 0, i = Or.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, It.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = Or.join(t, `${n++}-${e}`);
    }
  return i;
}
var li = {}, Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
Qo.getAppCacheDir = cv;
const qi = ne, lv = zn;
function cv() {
  const e = (0, lv.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || qi.join(e, "AppData", "Local") : process.platform === "darwin" ? t = qi.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || qi.join(e, ".cache"), t;
}
Object.defineProperty(li, "__esModule", { value: !0 });
li.ElectronAppAdapter = void 0;
const xs = ne, uv = Qo;
class fv {
  constructor(t = Lt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? xs.join(process.resourcesPath, "app-update.yml") : xs.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, uv.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
li.ElectronAppAdapter = fv;
var wu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = fe;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Lt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, m, c) => {
        const f = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: a,
          options: s,
          onCancel: c,
          callback: (h) => {
            h == null ? l(a) : m(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Lt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, m) {
      o.on("redirect", (c, f, h) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : m(t.HttpExecutor.prepareRedirectUrlOptions(h, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(wu);
var en = {}, Ye = {};
Object.defineProperty(Ye, "__esModule", { value: !0 });
Ye.newBaseUrl = dv;
Ye.newUrlFromBase = hv;
Ye.getChannelFilename = pv;
const _u = vt;
function dv(e) {
  const t = new _u.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function hv(e, t, r = !1) {
  const n = new _u.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function pv(e) {
  return `${e}.yml`;
}
var le = {}, mv = "[object Symbol]", Au = /[\\^$.*+?()[\]{}|]/g, gv = RegExp(Au.source), Ev = typeof Ce == "object" && Ce && Ce.Object === Object && Ce, yv = typeof self == "object" && self && self.Object === Object && self, vv = Ev || yv || Function("return this")(), wv = Object.prototype, _v = wv.toString, Ls = vv.Symbol, Us = Ls ? Ls.prototype : void 0, ks = Us ? Us.toString : void 0;
function Av(e) {
  if (typeof e == "string")
    return e;
  if (Sv(e))
    return ks ? ks.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Tv(e) {
  return !!e && typeof e == "object";
}
function Sv(e) {
  return typeof e == "symbol" || Tv(e) && _v.call(e) == mv;
}
function Cv(e) {
  return e == null ? "" : Av(e);
}
function bv(e) {
  return e = Cv(e), e && gv.test(e) ? e.replace(Au, "\\$&") : e;
}
var Tu = bv;
Object.defineProperty(le, "__esModule", { value: !0 });
le.Provider = void 0;
le.findFile = Nv;
le.parseUpdateInfo = Dv;
le.getFileList = Su;
le.resolveFiles = $v;
const gt = fe, Rv = ge, Ov = vt, Vn = Ye, Iv = Tu;
class Pv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, r, n, i = null) {
    const o = (0, Vn.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Vn.newUrlFromBase)(`${t.pathname.replace(new RegExp(Iv(n), "g"), r)}.blockmap`, i ? new Ov.URL(i) : t), o];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, gt.configureRequestUrl)(t, n), n;
  }
}
le.Provider = Pv;
function Nv(e, t, r) {
  var n;
  if (e.length === 0)
    throw (0, gt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((a) => a.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (n = i.find((a) => [a.url.pathname, a.info.url].some((s) => s.includes(process.arch)))) !== null && n !== void 0 ? n : i.shift();
  return o || (r == null ? e[0] : e.find((a) => !r.some((s) => a.url.pathname.toLowerCase().endsWith(`.${s.toLowerCase()}`))));
}
function Dv(e, t, r) {
  if (e == null)
    throw (0, gt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, Rv.load)(e);
  } catch (i) {
    throw (0, gt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function Su(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, gt.newError)(`No files provided: ${(0, gt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function $v(e, t, r = (n) => n) {
  const i = Su(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, gt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, gt.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Vn.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Vn.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(en, "__esModule", { value: !0 });
en.GenericProvider = void 0;
const Ms = fe, Gi = Ye, Wi = le;
class Fv extends Wi.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Gi.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Gi.getChannelFilename)(this.channel), r = (0, Gi.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Wi.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Ms.HttpError && i.statusCode === 404)
          throw (0, Ms.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Wi.resolveFiles)(t, this.baseUrl);
  }
}
en.GenericProvider = Fv;
var ci = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.BitbucketProvider = void 0;
const Bs = fe, Vi = Ye, Yi = le;
class xv extends Yi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Vi.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Bs.CancellationToken(), r = (0, Vi.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Vi.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Yi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Bs.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Yi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ui.BitbucketProvider = xv;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.GitHubProvider = Et.BaseGitHubProvider = void 0;
Et.computeReleaseNotes = bu;
const et = fe, Dt = vu, Lv = vt, Zt = Ye, vo = le, zi = /\/tag\/([^/]+)$/;
class Cu extends vo.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Zt.newBaseUrl)((0, et.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Zt.newBaseUrl)((0, et.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Et.BaseGitHubProvider = Cu;
class Uv extends Cu {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new et.CancellationToken(), s = await this.httpRequest((0, Zt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, et.parseXml)(s);
    let m = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const A = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Dt.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (A === null)
          c = zi.exec(m.element("link").attribute("href"))[1];
        else
          for (const C of l.getElements("entry")) {
            const S = zi.exec(C.element("link").attribute("href"));
            if (S === null)
              continue;
            const $ = S[1], B = ((n = Dt.prerelease($)) === null || n === void 0 ? void 0 : n[0]) || null, q = !A || ["alpha", "beta"].includes(A), J = B !== null && !["alpha", "beta"].includes(String(B));
            if (q && !J && !(A === "beta" && B === "alpha")) {
              c = $;
              break;
            }
            if (B && B === A) {
              c = $;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(a);
        for (const A of l.getElements("entry"))
          if (zi.exec(A.element("link").attribute("href"))[1] === c) {
            m = A;
            break;
          }
      }
    } catch (A) {
      throw (0, et.newError)(`Cannot parse releases feed: ${A.stack || A.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, et.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, h = "", g = "";
    const v = async (A) => {
      h = (0, Zt.getChannelFilename)(A), g = (0, Zt.newUrlFromBase)(this.getBaseDownloadPath(String(c), h), this.baseUrl);
      const C = this.createRequestOptions(g);
      try {
        return await this.executor.request(C, a);
      } catch (S) {
        throw S instanceof et.HttpError && S.statusCode === 404 ? (0, et.newError)(`Cannot find ${h} in the latest release artifacts (${g}): ${S.stack || S.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : S;
      }
    };
    try {
      let A = this.channel;
      this.updater.allowPrerelease && (!((i = Dt.prerelease(c)) === null || i === void 0) && i[0]) && (A = this.getCustomChannelName(String((o = Dt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), f = await v(A);
    } catch (A) {
      if (this.updater.allowPrerelease)
        f = await v(this.getDefaultChannelName());
      else
        throw A;
    }
    const E = (0, vo.parseUpdateInfo)(f, h, g);
    return E.releaseName == null && (E.releaseName = m.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = bu(this.updater.currentVersion, this.updater.fullChangelog, l, m)), {
      tag: c,
      ...E
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Zt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Lv.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, et.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, vo.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Et.GitHubProvider = Uv;
function js(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function bu(e, t, r, n) {
  if (!t)
    return js(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Dt.valid(a) && Dt.lt(e, a) && i.push({
      version: a,
      note: js(o)
    });
  }
  return i.sort((o, a) => Dt.rcompare(o.version, a.version));
}
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.GitLabProvider = void 0;
const Te = fe, Xi = vt, kv = Tu, Cn = Ye, Ki = le;
class Mv extends Ki.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, r, n) {
    super({
      ...n,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = r, this.cachedLatestVersion = null;
    const o = t.host || "gitlab.com";
    this.baseApiUrl = (0, Cn.newBaseUrl)(`https://${o}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new Te.CancellationToken(), r = (0, Cn.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let n;
    try {
      const h = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, g = await this.httpRequest(r, h, t);
      if (!g)
        throw (0, Te.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      n = JSON.parse(g);
    } catch (h) {
      throw (0, Te.newError)(`Unable to find latest release on GitLab (${r}): ${h.stack || h.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = n.tag_name;
    let o = null, a = "", s = null;
    const l = async (h) => {
      a = (0, Cn.getChannelFilename)(h);
      const g = n.assets.links.find((E) => E.name === a);
      if (!g)
        throw (0, Te.newError)(`Cannot find ${a} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      s = new Xi.URL(g.direct_asset_url);
      const v = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const E = await this.httpRequest(s, v, t);
        if (!E)
          throw (0, Te.newError)(`Empty response from ${s}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return E;
      } catch (E) {
        throw E instanceof Te.HttpError && E.statusCode === 404 ? (0, Te.newError)(`Cannot find ${a} in the latest release artifacts (${s}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
    };
    try {
      o = await l(this.channel);
    } catch (h) {
      if (this.channel !== this.getDefaultChannelName())
        o = await l(this.getDefaultChannelName());
      else
        throw h;
    }
    if (!o)
      throw (0, Te.newError)(`Unable to parse channel data from ${a}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const m = (0, Ki.parseUpdateInfo)(o, a, s);
    m.releaseName == null && (m.releaseName = n.name), m.releaseNotes == null && (m.releaseNotes = n.description || null);
    const c = /* @__PURE__ */ new Map();
    for (const h of n.assets.links)
      c.set(this.normalizeFilename(h.name), h.direct_asset_url);
    const f = {
      tag: i,
      assets: c,
      ...m
    };
    return this.cachedLatestVersion = f, f;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of t.links)
      r.set(this.normalizeFilename(n.name), n.direct_asset_url);
    return r;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, r) {
    const n = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
    for (const i of n) {
      const o = t.get(i);
      if (o)
        return new Xi.URL(o);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const r = new Te.CancellationToken(), n = [`v${t}`, t];
    for (const i of n) {
      const o = (0, Cn.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const a = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, s = await this.httpRequest(o, a, r);
        if (s)
          return JSON.parse(s);
      } catch (a) {
        if (a instanceof Te.HttpError && a.statusCode === 404)
          continue;
        throw (0, Te.newError)(`Unable to find release ${i} on GitLab (${o}): ${a.stack || a.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Te.newError)(`Unable to find release with version ${t} (tried: ${n.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const r = {};
    return t != null && (t.startsWith("Bearer") ? r.authorization = t : r["PRIVATE-TOKEN"] = t), r;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const r = await this.fetchReleaseInfoByVersion(t);
    return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, r, n) {
    let i = null, o = null;
    const a = await this.getVersionInfoForBlockMap(r);
    a && (i = this.findBlockMapInAssets(a, n));
    const s = await this.getVersionInfoForBlockMap(t);
    if (s) {
      const l = n.replace(new RegExp(kv(r), "g"), t);
      o = this.findBlockMapInAssets(s, l);
    }
    return [o, i];
  }
  async getBlockMapFiles(t, r, n, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const o = t.pathname.split("/").pop() || "", [a, s] = await this.findBlockMapUrlsFromAssets(r, n, o);
      if (!s)
        throw (0, Te.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!a)
        throw (0, Te.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [a, s];
    } else
      return super.getBlockMapFiles(t, r, n, i);
  }
  resolveFiles(t) {
    return (0, Ki.getFileList)(t).map((r) => {
      const i = [
        r.url,
        // Original filename
        this.normalizeFilename(r.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((a) => t.assets.has(a)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, Te.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Xi.URL(o),
        info: r
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
fi.GitLabProvider = Mv;
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.KeygenProvider = void 0;
const Hs = fe, Ji = Ye, Qi = le;
class Bv extends Qi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Ji.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Hs.CancellationToken(), r = (0, Ji.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Ji.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Qi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Hs.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Qi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
di.KeygenProvider = Bv;
var hi = {};
Object.defineProperty(hi, "__esModule", { value: !0 });
hi.PrivateGitHubProvider = void 0;
const Vt = fe, jv = ge, Hv = ne, qs = vt, Gs = Ye, qv = Et, Gv = le;
class Wv extends qv.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Vt.CancellationToken(), r = (0, Gs.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Vt.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new qs.URL(i.url);
    let a;
    try {
      a = (0, jv.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Vt.HttpError && s.statusCode === 404 ? (0, Vt.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, Gs.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Vt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Gv.getFileList)(t).map((r) => {
      const n = Hv.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Vt.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new qs.URL(i.url),
        info: r
      };
    });
  }
}
hi.PrivateGitHubProvider = Wv;
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.isUrlProbablySupportMultiRangeRequests = Ru;
ci.createClient = Jv;
const bn = fe, Vv = ui, Ws = en, Yv = Et, zv = fi, Xv = di, Kv = hi;
function Ru(e) {
  return !e.includes("s3.amazonaws.com");
}
function Jv(e, t, r) {
  if (typeof e == "string")
    throw (0, bn.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Yv.GitHubProvider(i, t, r) : new Kv.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Vv.BitbucketProvider(e, t, r);
    case "gitlab":
      return new zv.GitLabProvider(e, t, r);
    case "keygen":
      return new Xv.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Ws.GenericProvider({
        provider: "generic",
        url: (0, bn.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Ws.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Ru(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, bn.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, bn.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var pi = {}, tn = {}, ur = {}, jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.OperationKind = void 0;
jt.computeOperations = Qv;
var $t;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})($t || (jt.OperationKind = $t = {}));
function Qv(e, t, r) {
  const n = Ys(e.files), i = Ys(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, m = n.get(l);
  if (m == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let f = 0;
  const { checksumToOffset: h, checksumToOldSize: g } = ew(n.get(l), m.offset, r);
  let v = a.offset;
  for (let E = 0; E < c.checksums.length; v += c.sizes[E], E++) {
    const A = c.sizes[E], C = c.checksums[E];
    let S = h.get(C);
    S != null && g.get(C) !== A && (r.warn(`Checksum ("${C}") matches, but size differs (old: ${g.get(C)}, new: ${A})`), S = void 0), S === void 0 ? (f++, o != null && o.kind === $t.DOWNLOAD && o.end === v ? o.end += A : (o = {
      kind: $t.DOWNLOAD,
      start: v,
      end: v + A
      // oldBlocks: null,
    }, Vs(o, s, C, E))) : o != null && o.kind === $t.COPY && o.end === S ? o.end += A : (o = {
      kind: $t.COPY,
      start: S,
      end: S + A
      // oldBlocks: [checksum]
    }, Vs(o, s, C, E));
  }
  return f > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${f} changed blocks`), s;
}
const Zv = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Vs(e, t, r, n) {
  if (Zv && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${$t[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function ew(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], m = i.get(s);
    if (m === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const c = m === l ? "(same size)" : `(size: ${m}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Ys(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.DataSplitter = void 0;
ur.copyData = Ou;
const Rn = fe, tw = yt, rw = Gr, nw = jt, zs = Buffer.from(`\r
\r
`);
var st;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(st || (st = {}));
function Ou(e, t, r, n, i) {
  const o = (0, tw.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class iw extends rw.Writable {
  constructor(t, r, n, i, o, a, s, l) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.grandTotalBytes = s, this.onProgress = l, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = st.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(() => {
      if (this.onProgress) {
        const i = Date.now();
        (i >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (i - this.start) / 1e3 && (this.nextUpdate = i + 1e3, this.onProgress({
          total: this.grandTotalBytes,
          delta: this.delta,
          transferred: this.transferred,
          percent: this.transferred / this.grandTotalBytes * 100,
          bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
        }), this.delta = 0);
      }
      n();
    }).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Rn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === st.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = st.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === st.BODY)
          this.readState = st.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Rn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, Rn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = st.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== nw.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Ou(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(zs, r);
    if (n !== -1)
      return n + zs.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Rn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r, this.transferred += n - r, this.delta += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
ur.DataSplitter = iw;
var mi = {};
Object.defineProperty(mi, "__esModule", { value: !0 });
mi.executeTasksUsingMultipleRangeRequests = ow;
mi.checkIsRangesSupported = _o;
const wo = fe, Xs = ur, Ks = jt;
function ow(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    aw(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function aw(e, t, r, n, i) {
  let o = "bytes=", a = 0, s = 0;
  const l = /* @__PURE__ */ new Map(), m = [];
  for (let h = t.start; h < t.end; h++) {
    const g = t.tasks[h];
    g.kind === Ks.OperationKind.DOWNLOAD && (o += `${g.start}-${g.end - 1}, `, l.set(a, h), a++, m.push(g.end - g.start), s += g.end - g.start);
  }
  if (a <= 1) {
    const h = (g) => {
      if (g >= t.end) {
        n();
        return;
      }
      const v = t.tasks[g++];
      if (v.kind === Ks.OperationKind.COPY)
        (0, Xs.copyData)(v, r, t.oldFileFd, i, () => h(g));
      else {
        const E = e.createRequestOptions();
        E.headers.Range = `bytes=${v.start}-${v.end - 1}`;
        const A = e.httpExecutor.createRequest(E, (C) => {
          C.on("error", i), _o(C, i) && (C.pipe(r, {
            end: !1
          }), C.once("end", () => h(g)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(A, i), A.end();
      }
    };
    h(t.start);
    return;
  }
  const c = e.createRequestOptions();
  c.headers.Range = o.substring(0, o.length - 2);
  const f = e.httpExecutor.createRequest(c, (h) => {
    if (!_o(h, i))
      return;
    const g = (0, wo.safeGetHeader)(h, "content-type"), v = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(g);
    if (v == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${g}"`));
      return;
    }
    const E = new Xs.DataSplitter(r, t, l, v[1] || v[2], m, n, s, e.options.onProgress);
    E.on("error", i), h.pipe(E), h.on("end", () => {
      setTimeout(() => {
        f.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(f, i), f.end();
}
function _o(e, t) {
  if (e.statusCode >= 400)
    return t((0, wo.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, wo.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var gi = {};
Object.defineProperty(gi, "__esModule", { value: !0 });
gi.ProgressDifferentialDownloadCallbackTransform = void 0;
const sw = Gr;
var er;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(er || (er = {}));
class lw extends sw.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = er.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == er.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = er.COPY;
  }
  beginRangeDownload() {
    this.operationType = er.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
gi.ProgressDifferentialDownloadCallbackTransform = lw;
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.DifferentialDownloader = void 0;
const _r = fe, Zi = wt, cw = yt, uw = ur, fw = vt, On = jt, Js = mi, dw = gi;
class hw {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, _r.configureRequestUrl)(this.options.newUrl, t), (0, _r.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, On.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const m = l.end - l.start;
      l.kind === On.OperationKind.DOWNLOAD ? o += m : a += m;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${Qs(s)}, To download: ${Qs(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, Zi.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, Zi.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, Zi.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, cw.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let m;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const C = [];
        let S = 0;
        for (const B of t)
          B.kind === On.OperationKind.DOWNLOAD && (C.push(B.end - B.start), S += B.end - B.start);
        const $ = {
          expectedByteCounts: C,
          grandTotal: S
        };
        m = new dw.ProgressDifferentialDownloadCallbackTransform($, this.options.cancellationToken, this.options.onProgress), l.push(m);
      }
      const c = new _r.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            c.validate();
          } catch (C) {
            s(C);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let f = null;
      for (const C of l)
        C.on("error", s), f == null ? f = C : f = f.pipe(C);
      const h = l[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, Js.executeTasksUsingMultipleRangeRequests)(this, t, h, n, s), g(0);
        return;
      }
      let v = 0, E = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const A = this.createRequestOptions();
      A.redirect = "manual", g = (C) => {
        var S, $;
        if (C >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const B = t[C++];
        if (B.kind === On.OperationKind.COPY) {
          m && m.beginFileCopy(), (0, uw.copyData)(B, h, n, s, () => g(C));
          return;
        }
        const q = `bytes=${B.start}-${B.end - 1}`;
        A.headers.range = q, ($ = (S = this.logger) === null || S === void 0 ? void 0 : S.debug) === null || $ === void 0 || $.call(S, `download range: ${q}`), m && m.beginRangeDownload();
        const J = this.httpExecutor.createRequest(A, (Q) => {
          Q.on("error", s), Q.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), Q.statusCode >= 400 && s((0, _r.createHttpError)(Q)), Q.pipe(h, {
            end: !1
          }), Q.once("end", () => {
            m && m.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => g(C), 1e3)) : g(C);
          });
        });
        J.on("redirect", (Q, oe, U) => {
          this.logger.info(`Redirect to ${pw(U)}`), E = U, (0, _r.configureRequestUrl)(new fw.URL(E), A), J.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(J, s), J.end();
      }, g(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, Js.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
tn.DifferentialDownloader = hw;
function Qs(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function pw(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(pi, "__esModule", { value: !0 });
pi.GenericDifferentialDownloader = void 0;
const mw = tn;
class gw extends mw.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
pi.GenericDifferentialDownloader = gw;
var _t = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = fe;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      n(this.emitter, "login", o);
    }
    progress(o) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      n(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      n(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = r;
  function n(i, o, a) {
    i.on(o, a);
  }
})(_t);
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.NoOpLogger = ht.AppUpdater = void 0;
const Se = fe, Ew = Wr, yw = zn, vw = vl, je = wt, ww = ge, eo = ri, He = ne, Pt = vu, Zs = Zr, _w = li, el = wu, Aw = en, to = ci, ro = _l, Tw = pi, Yt = _t;
class Zo extends vw.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, Se.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Se.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, el.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Iu();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new eo.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Yt.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new eo.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new eo.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), r == null ? (this.app = new _w.ElectronAppAdapter(), this.httpExecutor = new el.ElectronHttpExecutor((o, a) => this.emit("login", o, a))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Pt.parse)(n);
    if (i == null)
      throw (0, Se.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = Sw(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new Aw.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, to.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, to.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = Zo.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Lt.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, a = Se.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${a}, user id: ${i}`), a < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Pt.parse)(t.version);
    if (r == null)
      throw (0, Se.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Pt.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, Pt.gt)(r, n), a = (0, Pt.lt)(r, n);
    return o ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, yw.release)();
    if (r)
      try {
        if ((0, Pt.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, to.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new Se.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Se.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Se.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Se.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof Se.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Yt.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, ww.load)(await (0, je.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = He.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, je.readFile)(t, "utf-8");
      if (Se.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = Se.UUID.v5((0, Ew.randomBytes)(4096), Se.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, je.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = He.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Zs.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(Yt.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (S) => this.emit(Yt.DOWNLOAD_PROGRESS, S));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, a = r.packageInfo;
    function s() {
      const S = decodeURIComponent(t.fileInfo.url.pathname);
      return S.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? He.basename(S) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), m = l.cacheDirForPendingUpdate;
    await (0, je.mkdir)(m, { recursive: !0 });
    const c = s();
    let f = He.join(m, c);
    const h = a == null ? null : He.join(m, `package-${o}${He.extname(a.path) || ".7z"}`), g = async (S) => {
      await l.setDownloadedFile(f, h, i, r, c, S), await t.done({
        ...i,
        downloadedFile: f
      });
      const $ = He.join(m, "current.blockmap");
      return await (0, je.pathExists)($) && await (0, je.copyFile)($, He.join(l.cacheDir, "current.blockmap")), h == null ? [f] : [f, h];
    }, v = this._logger, E = await l.validateDownloadedPath(f, i, r, v);
    if (E != null)
      return f = E, await g(!1);
    const A = async () => (await l.clear().catch(() => {
    }), await (0, je.unlink)(f).catch(() => {
    })), C = await (0, Zs.createTempUpdateFile)(`temp-${c}`, m, v);
    try {
      await t.task(C, n, h, A), await (0, Se.retry)(() => (0, je.rename)(C, f), {
        retries: 60,
        interval: 500,
        shouldRetry: (S) => S instanceof Error && /^EBUSY:/.test(S.message) ? !0 : (v.warn(`Cannot rename temp file to final file: ${S.message || S.stack}`), !1)
      });
    } catch (S) {
      throw await A(), S instanceof Se.CancellationError && (v.info("cancelled"), this.emit("update-cancelled", i)), S;
    }
    return v.info(`New version ${o} has been downloaded to ${f}`), await g(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = r.updateInfoAndProvider.provider, s = await a.getBlockMapFiles(t.url, this.app.version, r.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const l = async (v) => {
        const E = await this.httpExecutor.downloadToBuffer(v, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (E == null || E.length === 0)
          throw new Error(`Blockmap "${v.href}" is empty`);
        try {
          return JSON.parse((0, ro.gunzipSync)(E).toString());
        } catch (A) {
          throw new Error(`Cannot parse blockmap "${v.href}", error: ${A}`);
        }
      }, m = {
        newUrl: t.url,
        oldFile: He.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Yt.DOWNLOAD_PROGRESS) > 0 && (m.onProgress = (v) => this.emit(Yt.DOWNLOAD_PROGRESS, v));
      const c = async (v, E) => {
        const A = He.join(E, "current.blockmap");
        await (0, je.outputFile)(A, (0, ro.gzipSync)(JSON.stringify(v)));
      }, f = async (v) => {
        const E = He.join(v, "current.blockmap");
        try {
          if (await (0, je.pathExists)(E))
            return JSON.parse((0, ro.gunzipSync)(await (0, je.readFile)(E)).toString());
        } catch (A) {
          this._logger.warn(`Cannot parse blockmap "${E}", error: ${A}`);
        }
        return null;
      }, h = await l(s[1]);
      await c(h, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let g = await f(this.downloadedUpdateHelper.cacheDir);
      return g == null && (g = await l(s[0])), await new Tw.GenericDifferentialDownloader(t.info, this.httpExecutor, m).download(g, h), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
ht.AppUpdater = Zo;
function Sw(e) {
  const t = (0, Pt.prerelease)(e);
  return t != null && t.length > 0;
}
class Iu {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
ht.NoOpLogger = Iu;
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.BaseUpdater = void 0;
const tl = Yn, Cw = ht;
class bw extends Cw.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Lt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, o = n == null ? null : n.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (a) {
      return this.dispatchError(a), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, tl.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: o, status: a, stdout: s, stderr: l } = i;
    if (o != null)
      throw this._logger.error(l), o;
    if (a != null && a !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${a}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((o, a) => {
      try {
        const s = { stdio: i, env: n, detached: !0 }, l = (0, tl.spawn)(t, r, s);
        l.on("error", (m) => {
          a(m);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (s) {
        a(s);
      }
    });
  }
}
Bt.BaseUpdater = bw;
var kr = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const zt = wt, Rw = tn, Ow = _l;
class Iw extends Rw.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = Pu(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await Pw(this.options.oldFile), i);
  }
}
rn.FileWithEmbeddedBlockMapDifferentialDownloader = Iw;
function Pu(e) {
  return JSON.parse((0, Ow.inflateRawSync)(e).toString());
}
async function Pw(e) {
  const t = await (0, zt.open)(e, "r");
  try {
    const r = (await (0, zt.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, zt.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, zt.read)(t, i, 0, i.length, r - n.length - i.length), await (0, zt.close)(t), Pu(i);
  } catch (r) {
    throw await (0, zt.close)(t), r;
  }
}
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.AppImageUpdater = void 0;
const rl = fe, nl = Yn, Nw = wt, Dw = yt, Ar = ne, $w = Bt, Fw = rn, xw = le, il = _t;
class Lw extends $w.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, xw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, rl.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, a, i, r, t)) && await this.httpExecutor.download(n.url, i, o), await (0, Nw.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, o) {
    try {
      const a = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(il.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(il.DOWNLOAD_PROGRESS, s)), await new Fw.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, rl.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, Dw.unlinkSync)(r);
    let n;
    const i = Ar.basename(r), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Ar.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = Ar.join(Ar.dirname(r), Ar.basename(o)), (0, nl.execFileSync)("mv", ["-f", o, n]), n !== r && this.emit("appimage-filename-updated", n);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, nl.execFileSync)(n, [], { env: a })), !0;
  }
}
kr.AppImageUpdater = Lw;
var Mr = {}, fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.LinuxUpdater = void 0;
const Uw = Bt;
class kw extends Uw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizies the installer path for using with command line tools.
   */
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: r } = this.app, n = `"${r} would like to update"`, i = this.sudoWithArgs(n);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let o = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (o = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${o}/bin/bash`, "-c", `'${t.join(" ")}'${o}`]);
  }
  sudoWithArgs(t) {
    const r = this.determineSudoCommand(), n = [r];
    return /kdesudo/i.test(r) ? (n.push("--comment", t), n.push("-c")) : /gksudo/i.test(r) ? n.push("--message", t) : /pkexec/i.test(r) && n.push("--disable-internal-agent"), n;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const r of t)
      if (this.hasCommand(r))
        return r;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var r;
    const n = (r = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || r === void 0 ? void 0 : r.trim();
    if (n)
      return n;
    for (const i of t)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${t.join(", ")}. Defaulting to the first one: ${t[0]}`), t[0];
  }
}
fr.LinuxUpdater = kw;
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.DebUpdater = void 0;
const Mw = le, ol = _t, Bw = fr;
class ea extends Bw.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Mw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(ol.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(ol.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const n = ["dpkg", "apt"], i = this.detectPackageManager(n);
    try {
      ea.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (o) {
      return this.dispatchError(o), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    var o;
    if (t === "dpkg")
      try {
        n(["dpkg", "-i", r]);
      } catch (a) {
        i.warn((o = a.message) !== null && o !== void 0 ? o : a), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), n(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), n([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        r
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
Mr.DebUpdater = ea;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.PacmanUpdater = void 0;
const al = _t, jw = le, Hw = fr;
class ta extends Hw.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, jw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(al.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(al.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      ta.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (n) {
      return this.dispatchError(n), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n) {
    var i;
    try {
      r(["pacman", "-U", "--noconfirm", t]);
    } catch (o) {
      n.warn((i = o.message) !== null && i !== void 0 ? i : o), n.warn("pacman installation failed, attempting to update package database and retry");
      try {
        r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", t]);
      } catch (a) {
        throw n.error("Retry after pacman -Sy failed"), a;
      }
    }
  }
}
Br.PacmanUpdater = ta;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.RpmUpdater = void 0;
const sl = _t, qw = le, Gw = fr;
class ra extends Gw.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, qw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(sl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(sl.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(n);
    try {
      ra.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (o) {
      return this.dispatchError(o), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    if (t === "zypper")
      return n(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
    if (t === "dnf")
      return n(["dnf", "install", "--nogpgcheck", "-y", r]);
    if (t === "yum")
      return n(["yum", "install", "--nogpgcheck", "-y", r]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), n(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
jr.RpmUpdater = ra;
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.MacUpdater = void 0;
const ll = fe, no = wt, Ww = yt, cl = ne, Vw = Uf, Yw = ht, zw = le, ul = Yn, fl = Wr;
class Xw extends Yw.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Lt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, ul.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (f) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, ul.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), a = a || h;
    } catch (f) {
      n.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    a = a || process.arch === "arm64" || o;
    const s = (f) => {
      var h;
      return f.url.pathname.includes("arm64") || ((h = f.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    a && r.some(s) ? r = r.filter((f) => a === s(f)) : r = r.filter((f) => !s(f));
    const l = (0, zw.findFile)(r, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, ll.newError)(`ZIP file not provided: ${(0, ll.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const m = t.updateInfoAndProvider.provider, c = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (f, h) => {
        const g = cl.join(this.downloadedUpdateHelper.cacheDir, c), v = () => (0, no.pathExistsSync)(g) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let E = !0;
        v() && (E = await this.differentialDownloadInstaller(l, t, f, m, c)), E && await this.httpExecutor.download(l.url, f, h);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = cl.join(this.downloadedUpdateHelper.cacheDir, c);
            await (0, no.copyFile)(f.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(l, f);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, no.stat)(i)).size, a = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, Vw.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const l = (m) => {
      const c = m.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((m, c) => {
      const f = (0, fl.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${f}`, "ascii"), g = `/${(0, fl.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (v, E) => {
        const A = v.url;
        if (a.info(`${A} requested`), A === "/") {
          if (!v.headers.authorization || v.headers.authorization.indexOf("Basic ") === -1) {
            E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), a.warn("No authenthication info");
            return;
          }
          const $ = v.headers.authorization.split(" ")[1], B = Buffer.from($, "base64").toString("ascii"), [q, J] = B.split(":");
          if (q !== "autoupdater" || J !== f) {
            E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const Q = Buffer.from(`{ "url": "${l(this.server)}${g}" }`);
          E.writeHead(200, { "Content-Type": "application/json", "Content-Length": Q.length }), E.end(Q);
          return;
        }
        if (!A.startsWith(g)) {
          a.warn(`${A} requested, but not supported`), E.writeHead(404), E.end();
          return;
        }
        a.info(`${g} requested by Squirrel.Mac, pipe ${i}`);
        let C = !1;
        E.on("finish", () => {
          C || (this.nativeUpdater.removeListener("error", c), m([]));
        });
        const S = (0, Ww.createReadStream)(i);
        S.on("error", ($) => {
          try {
            E.end();
          } catch (B) {
            a.warn(`cannot end response: ${B}`);
          }
          C = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${$}`));
        }), E.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), S.pipe(E);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : m([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Hr.MacUpdater = Xw;
var qr = {}, na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
na.verifySignature = Jw;
const dl = fe, Nu = Yn, Kw = zn, hl = ne;
function Du(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function Jw(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, Nu.execFile)(...Du(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (a, s, l) => {
      var m;
      try {
        if (a != null || l) {
          io(r, a, l, i), n(null);
          return;
        }
        const c = Qw(s);
        if (c.Status === 0) {
          try {
            const v = hl.normalize(c.Path), E = hl.normalize(t);
            if (r.info(`LiteralPath: ${v}. Update Path: ${E}`), v !== E) {
              io(r, new Error(`LiteralPath of ${v} is different than ${E}`), l, i), n(null);
              return;
            }
          } catch (v) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(m = v.message) !== null && m !== void 0 ? m : v.stack}`);
          }
          const h = (0, dl.parseDn)(c.SignerCertificate.Subject);
          let g = !1;
          for (const v of e) {
            const E = (0, dl.parseDn)(v);
            if (E.size ? g = Array.from(E.keys()).every((C) => E.get(C) === h.get(C)) : v === h.get("CN") && (r.warn(`Signature validated using only CN ${v}. Please add your full Distinguished Name (DN) to publisherNames configuration`), g = !0), g) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (h, g) => h === "RawData" ? void 0 : g, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (c) {
        io(r, c, null, i), n(null);
        return;
      }
    });
  });
}
function Qw(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function io(e, t, r, n) {
  if (Zw()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Nu.execFileSync)(...Du("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function Zw() {
  const e = Kw.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.NsisUpdater = void 0;
const In = fe, pl = ne, e_ = Bt, t_ = rn, ml = _t, r_ = le, n_ = wt, i_ = na, gl = vt;
class o_ extends e_.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, i_.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, r_.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, o, a, s) => {
        const l = n.packageInfo, m = l != null && a != null;
        if (m && t.disableWebInstaller)
          throw (0, In.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !m && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (m || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, In.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await s(), (0, In.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (m && await this.differentialDownloadWebPackage(t, l, a, r))
          try {
            await this.httpExecutor.download(new gl.URL(l.path), a, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (f) {
            try {
              await (0, n_.unlink)(a);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(pl.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((a) => this.dispatchError(a));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(r, n).catch((a) => {
      const s = a.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? o() : s === "ENOENT" ? Lt.shell.openPath(r).catch((l) => this.dispatchError(l)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new gl.URL(r.path),
        oldFile: pl.join(this.downloadedUpdateHelper.cacheDir, In.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(ml.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(ml.DOWNLOAD_PROGRESS, a)), await new t_.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
qr.NsisUpdater = o_;
(function(e) {
  var t = Ce && Ce.__createBinding || (Object.create ? function(A, C, S, $) {
    $ === void 0 && ($ = S);
    var B = Object.getOwnPropertyDescriptor(C, S);
    (!B || ("get" in B ? !C.__esModule : B.writable || B.configurable)) && (B = { enumerable: !0, get: function() {
      return C[S];
    } }), Object.defineProperty(A, $, B);
  } : function(A, C, S, $) {
    $ === void 0 && ($ = S), A[$] = C[S];
  }), r = Ce && Ce.__exportStar || function(A, C) {
    for (var S in A) S !== "default" && !Object.prototype.hasOwnProperty.call(C, S) && t(C, A, S);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = wt, i = ne;
  var o = Bt;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var a = ht;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var s = le;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var l = kr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var m = Mr;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return m.DebUpdater;
  } });
  var c = Br;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var f = jr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var h = Hr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var g = qr;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return g.NsisUpdater;
  } }), r(_t, e);
  let v;
  function E() {
    if (process.platform === "win32")
      v = new qr.NsisUpdater();
    else if (process.platform === "darwin")
      v = new Hr.MacUpdater();
    else {
      v = new kr.AppImageUpdater();
      try {
        const A = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(A))
          return v;
        switch ((0, n.readFileSync)(A).toString().trim()) {
          case "deb":
            v = new Mr.DebUpdater();
            break;
          case "rpm":
            v = new jr.RpmUpdater();
            break;
          case "pacman":
            v = new Br.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (A) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", A.message);
      }
    }
    return v;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => v || E()
  });
})(Al);
const $u = ft.dirname(xf(import.meta.url));
process.env.APP_ROOT = ft.join($u, "..");
const Ao = process.env.VITE_DEV_SERVER_URL, T_ = ft.join(process.env.APP_ROOT, "dist-electron"), Fu = ft.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ao ? ft.join(process.env.APP_ROOT, "public") : Fu;
let at;
function xu() {
  at = new El({
    icon: ft.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: ft.join($u, "preload.mjs")
    }
  }), at.webContents.on("did-finish-load", () => {
    at == null || at.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ao ? at.loadURL(Ao) : at.loadFile(ft.join(Fu, "index.html"));
}
Fn.on("window-all-closed", () => {
  process.platform !== "darwin" && (Fn.quit(), at = null);
});
Fn.on("activate", () => {
  El.getAllWindows().length === 0 && xu();
});
Fn.whenReady().then(xu).then(async () => {
  await Al.autoUpdater.checkForUpdatesAndNotify();
});
export {
  T_ as MAIN_DIST,
  Fu as RENDERER_DIST,
  Ao as VITE_DEV_SERVER_URL
};
