// LEXICAL SCOPE:

// Lexical scope is the ability for a function scope to access variables from the parent scope.
// Example of Lexical scope is Closure


// ARROW FUNCTIONS VS NORMAL FUNCTIONS

// * Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
// * Arrow functions cannot be used as constructors. Calling them with new throws a TypeError. They also don't have access to the new.target keyword.
// * Arrow functions cannot use yield within their body and cannot be created as generator functions.



// DEBOUNCING
// It is a technique in JavaScript used to limit function execution untill a specific period of delay.


// CLOSURE
// A closure is formed when an inner function remembers and continues to access variables from its lexical scope,


// TEMPORAL DEAD ZONE
// The temporal dead zone is the time period between the start of a block scope and the moment a let or const variable is initialized


// GARBAGE COLLECTION
// Garbage collection is the automatic process by which JavaScript removes objects from memory when they are no longer reachable.


// HOISTING
// Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during compilation.

function polyfilldebounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

function polyfillthrottle(func, limit) {
    let lastCallTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCallTime >= limit) {
            lastCallTime = now;
            func.apply(this, args);
        }
    };
}

function jsonstringifypolyfill(value) {

    // null or undefined
    if (value === null || value === undefined) {
        return String(value); // "null" or "undefined"
    }

    // number, boolean
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    // string
    if (typeof value === 'string') {
        return `"${value}"`; // must wrap in quotes
    }

    // array
    if (Array.isArray(value)) {
        const result = value.map(item => jsonstringifypolyfill(item));
        return `[${result.join(",")}]`;
    }

    // object
    if (typeof value === 'object') {
        const keys = Object.keys(value);
        const jsonvalues = keys.map(key => {
            return `"${key}":${jsonstringifypolyfill(value[key])}`;
        });
        return `{${jsonvalues.join(",")}}`;
    }

    // fallback
    return String(value);
}

function groupbykey(data) {
    return data.reduce((acc, curr) => {
        const key = curr["role"];

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(curr);

        return acc;
    }, {});
}

function countnoofwordsinstring(str) {
    const words = str
        .trim()
        .toLowerCase()
        .split(/\s+/); // handles multiple spaces

    const res = {};

    for (let i = 0; i < words.length; i++) {
        res[words[i]] = (res[words[i]] || 0) + 1;
    }

    return res;
}


function polyfillForArrayMap() {
    Array.prototype.mymap = function (cb) {
        let res = [];
        for (let i = 0; i < this.length; i++) {
            res.push(cb[this[i], i, this]);
        }
        return res;
    }
}

function polyfillForArrayFilter() {
    Array.prototype.myFilter = function (cb) {
        let res = [];
        for (let i = 0; i < this.length; i++) {
            const cbValue = cb(this[i], i, this);
            if (cbValue) {
                res.push(this[i])
            }
        }
        return res;
    }
}

function polyfillForArrayReduce() {
    Array.prototype.myreduce = function (cb, iv) {
        if (typeof cb !== "function") throw new TypeError(cb + " is not a function");

        let acc;
        let si;

        if (arguments.length > 1) {
            acc = iv;
            si = 0;
        } else {
            acc = this[0];
            si = 1;
        }

        for (let i = si; i < this.length; i++) {
            acc = cb(acc, this[i], i, this);
        }
        return acc;
    }
}

function arrayflatpolyfill(arr) {
    return arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? arrayflatpolyfill(val) : val);
    }, []);
}

function polyfillForArrayFlat(arr, depth = 1) {
    return arr.reduce((acc, curr) => {
        if (Array.isArray(curr) && depth > 0) {
            return acc.concat(Array.isArray(curr) ? polyfillForArrayFlat(curr, depth - 1) : curr)
        }
        return acc.concat(curr)
    }, [])
}

function MyPromise(executor) {
    let status = 'pending';
    let value = undefined;
    let handlers = [];
    let catchers = [];

    function resolve(res) {
        if (status !== 'pending') return;
        status = 'fulfilled';
        value = res;
        handlers.forEach(cb => cb(value))
    }

    function reject(err) {
        if (status !== 'pending') return;
        status = 'rejected';
        value = err;
        catchers.forEach(cb => cb(value))
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }

    this.then = function (cb) {
        return new MyPromise((resolve, reject) => {

            function wrap(value) {
                try {
                    const result = cb(value)
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(value)
                    }
                } catch (error) {
                    reject(error)
                }
            }

            if (status === 'pending') {
                handlers.push(wrap)
            } else if (status === 'fulfilled') {
                wrap(value)
            }
        })
    }

    this.catch = function (cb) {
        return new MyPromise((resolve, reject) => {

            function wrap(value) {
                try {
                    const result = callback(value);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            }

            if (status === 'pending') {
                catchers.push(wrap)
            } else if (status === 'rejected') {
                wrap(value)
            }
        })
    }
}


function polyfillForObjectFlat(obj, parentkey, result = {}) {
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const newkey = parentkey ? `${parentkey}.${key}` : key;
        const value = obj[key];

        if (typeof value === 'object' && value !== null) {
            polyfillForObjectFlat(value, newkey, result)
        } else {
            result[newkey] = value;
        }
    }

    return result;
}


function curryingWithlimit(value) {
    return function curried(value2) {
        return value * value2
    }
}

function curryingwithinfiniteargs(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func(...args)
        } else {
            return function (...nextArgs) {
                return curried(...args, ...nextArgs)
            }
        }
    }
}


function* abc() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}
const it = abc();
abc().next()


function isAnagram(a, b) {
    if (a.length !== b.length) return false;

    const count = {};

    for (let char of a) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of b) {
        if (!count[char]) return false;
        count[char]--;
    }

    return true;
}

function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }

    return true;
}


function isPangram(str) {
    const letters = new Set();

    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            letters.add(char);
        }
    }

    return letters.size === 26;
}



// SOLID
// S - Single Responsibility
// function useUser(id) { ... }      // fetch only
// function formatUser(user) { ... } // formatting only
// function UserCardUI({ name }) {}  // UI only


// O - open / closed (open for extension closed for modification)

// function Button({ label, onClick, variant = "primary" }) {
//     return <button className={variant} onClick={onClick}>{label}</button>;
//   }
//   <Button label="Save" variant="primary" />
// <Button label="Delete" variant="danger" />
// <Button label="Cancel" variant="secondary" />


// L - Liskov substitution principle

// Subclasses should be replaceable by their base class without breaking the app.
// function BaseInput({ value, onChange }) {
//     return <input value={value} onChange={onChange} />;
//   }
//   function PasswordInput(props) {
//     return <BaseInput {...props} type="password" />;
//   }


// I - Interface segragation principle
// Don’t force components to accept props they don’t need.

// function UserCard({ name }) {
//     return <div>{name}</div>;
//   }

//   function UserActions({ onEdit, onDelete }) {
//     return (
//       <div>
//         <button onClick={onEdit}>Edit</button>
//         <button onClick={onDelete}>Delete</button>
//       </div>
//     );
//   }
// D - Dependency inversion

// High-level modules should depend on abstractions, not concrete implementations.
// export const UserService = {
//     getUser: () => fetch("/api/user").then(r => r.json())
//   };
//   import { UserService } from "./UserService";

// export function useUser() {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     UserService.getUser().then(setData);
//   }, []);
//   return data;
// }
