export const checkWebln = () => {
    if (window.webln) {
       (async () => {
      await window.webln.enable();
      return true
    })();
    } else {
      return false;
    }
  };