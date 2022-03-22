import { useEffect, useRef, useState } from 'react';

function App() {

  const pyodide = useRef(null)
  
  // const [list, setList] = useState([])
  const [pyodideInitialized, setPyodideInitialized] = useState(false)

  function loadLibrary() {
    //separated this as import takes a while to execute
      pyodide.current.runPython(`
        import pandas as pd
        import json
      `)    
      console.log('Ready to feed data!')
  }

  function feedData() {
    pyodide.current.runPython(`

      df = pd.DataFrame({
        'Product' : ['Carrots', 'Broccoli', 'Banana', 'Banana','Beans', 'Orange', 'Broccoli', 'Banana'],
        'Category' : ['Vegetable', 'Vegetable', 'Fruit', 'Fruit','Vegetable', 'Fruit', 'Vegetable', 'Fruit'],
        'Quantity' : [8, 5, 3, 4, 5, 9, 11, 8],
        'Amount' : [270, 239, 617, 384, 626, 610, 62, 90]
      })

      print(df)
    `)    
  }

  function createPivotTable() {
    const pivotList = pyodide.current.runPython(`  

      pivot = df.pivot_table(index =['Product'], values =['Amount'], aggfunc ='sum')
      
      newPivot=pivot.reset_index() # convert pivot to daraframe
      print(newPivot)
      list = newPivot.values.tolist() # convert dataframe to list in Python
      jsList = json.dumps(list) # convert Python list to JS list
      
      def returnPivot():
        return jsList
      
      returnPivot()
    `)
    console.log('-------')
    console.log('JS pivotList: ', pivotList)
  }

  useEffect(async () => {
    if(!pyodideInitialized) {
      pyodide.current = await window.loadPyodide({ indexURL : "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/" });
      await pyodide.current.loadPackage("pandas");
      setPyodideInitialized(true)
      loadLibrary()
    }
  },[])

  return (
    <div className="App">
      Hello Jatan
      <button onClick={createPivotTable} >Create Pivot table</button>
      <button onClick={feedData} >Feed data</button>
    </div>
  );
}

export default App;
// used https://www.geeksforgeeks.org/how-to-create-a-pivot-table-in-python-using-pandas/ to create pivot table