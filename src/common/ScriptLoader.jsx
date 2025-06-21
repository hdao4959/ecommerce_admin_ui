import React, { useEffect } from 'react'

const ScriptLoader = ({ arrayCss = [], arrayScripts = [], onLoadAll }) => {

  useEffect(() => {
    let loadedCount = 0;

    const handleScriptLoaded = () => {
      loadedCount++
      if (loadedCount == arrayScripts.length && typeof onLoadAll == 'function') {
        onLoadAll();
      }
      console.log(loadedCount);

    }
    const addedScript = arrayScripts.map((src) => {
      const script = document.createElement('script');
      script.onload = handleScriptLoaded
      script.src = src;
      script.async = false
      script.onerror = () => {
        console.log('Không load được script');

      }
      document.body.appendChild(script)
      return script
    })

    const addedCss = arrayCss.map((url) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link)
      return link
    })


    return () => {
      if (addedCss && addedCss.length > 0) {
        addedCss.forEach((link) => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        })
      }

      if (addedScript && addedScript.length > 0) {
        addedScript.forEach((script) => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        })
      }
    }


  }, [])


  return null
}

export default ScriptLoader
