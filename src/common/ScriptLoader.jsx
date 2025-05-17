import React, { useEffect } from 'react'

const ScriptLoader = ({arrayCss = [], arrayScripts = []}) => {
  console.log(arrayScripts);
  
  useEffect(() => {
    const addedScript = arrayScripts.map((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false
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
    if(addedCss && addedCss.length > 0){
      addedCss.forEach((link) => {
        if(document.head.contains(link)){
          document.head.removeChild(link);
        }
      })
    }

    if(addedScript && addedScript.length > 0){
      addedScript.forEach((script) => {
        if(document.head.contains(script)){
          document.head.removeChild(script);
        }
      })
    }
  }    
   
  }, [])
  return null
}

export default ScriptLoader
