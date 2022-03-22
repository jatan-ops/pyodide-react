removed state mgmt between interactions, pyodide instance maintains state.  
Only convert to JS list when need to save.  

In next iteration, run pyodide.current on a worker thread.