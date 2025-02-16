'use strict';

const encode = (s, symbol) => {
    const iter = s[Symbol.iterator]()
    let res = ""
    let next = iter.next()
    while (!next.done) {
      const c = next.value

      if (c === "\\") {
        res += c
        next = iter.next()
        if (!next.done) {
          res += next.value
        }
      } else {
        if (c === symbol) {
          res += "\\"
        }
        res += c
      }

      next = iter.next()
    }

    return res
  }

const maybeEncode = (value, {encodeDoubleQuote, encodeSingleQuote}) => {
    if (encodeSingleQuote) return encode(value, "'")
    if (encodeDoubleQuote) return encode(value, '"')
};

module.exports.StringLiteral = (path, {write}, semantics) => {
    const {raw, value} = path.node;
    
    if (raw && path.parentPath.isJSXAttribute()) {
        write(raw);
        return;
    }
    
    if (raw) {
        const value = raw.slice(1, -1);
        write.quote();
        write(maybeEncode(value, semantics));
        write.quote();
        
        return;
    }
    
    write.quote();
    write(value);
    write.quote();
};
