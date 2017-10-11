const utils = (function() {

  function debounce (fn, wait) {
    let timeout=null;
    const c=()=>{ clearTimeout(timeout); timeout=null; };
    const t=fn=>{ timeout=setTimeout(fn,wait); };
    return ()=>{
      const context=this;
      const args=arguments;
      let f=()=>{ fn.apply(context,args); };
      timeout
        ? c()||t(f)
        : t(c)||f();
    };
  }

  function throttle (callback, wait, context = this) {
    let timeout = null;
    let callbackArgs = null;

    const later = () => {
      callback.apply(context, callbackArgs);
      timeout = null;
    };

    return function() {
      if (!timeout) {
        callbackArgs = arguments;
        timeout = setTimeout(later, wait);
      }
    };
  }

  return {
    debounce,
    throttle
  };
}());
