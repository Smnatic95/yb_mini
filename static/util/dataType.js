// JS判断函数，解决80%类型判断问题

export default{
  getType:(x)=>{
      return typeof x
  },
  isNumber:(x)=>{
      return type(x) === 'number'
  },
  isBoolean:(x)=>{
      return type(x) === 'boolean'
  },
  
  isString:(x)=>{
      return type(x) === 'string'
  },
  isNull:(x)=>{
      return x === null && type(x) === 'object'
  },
  isUndefined:(x)=>{
      return type(x) === 'undefined'
  },
  isObject:(x)=>{
      return type(x) === 'object'
  },
  isFunction:(x)=>{
      return type(x) === 'function'
  }
}