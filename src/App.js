import { useEffect, useRef, useState } from 'react';

function App() {

  const pyodide = useRef(null)
  
  const [pyodideInitialized, setPyodideInitialized] = useState(false)

  useEffect(async () => {
    if(!pyodideInitialized) {
      pyodide.current = await window.loadPyodide({ indexURL : "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/" });
      await pyodide.current.loadPackage("pandas");
      setPyodideInitialized(true)
      pyodide.current.runPython(`
        import pandas as pd

        df = pd.DataFrame({'Product' : ['Carrots', 'Broccoli', 'Banana', 'Banana','Beans', 'Orange', 'Broccoli', 'Banana'],
          'Category' : ['Vegetable', 'Vegetable', 'Fruit', 'Fruit',
                        'Vegetable', 'Fruit', 'Vegetable', 'Fruit'],
          'Quantity' : [8, 5, 3, 4, 5, 9, 11, 8],
          'Amount' : [270, 239, 617, 384, 626, 610, 62, 90]})

        print(df)
            
        pivot = df.pivot_table(index =['Product'],
                       values =['Amount'],
                       aggfunc ='sum')
        
        print(pivot)
      `); 
    }
  },[])

  return (
    <div className="App">
      Hello Jatan
    </div>
  );
}

export default App;
// used https://www.geeksforgeeks.org/how-to-create-a-pivot-table-in-python-using-pandas/ to create pivot table