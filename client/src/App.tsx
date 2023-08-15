import { ErrorInfo, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropertyListing from './components/PropertyListing';
import AddProperty from './components/AddProperty';
import ErrorFallback from './components/errorFallback';
import { Property } from './types/types';
import apiService from './API/apiServices';
import './App.css';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  function captureError(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  function updateProperties(newProperty: Property) {
    setProperties((prev) => [...prev, newProperty]);
  }

  async function fetchProperties() {
    const data = await apiService.getProperties();
    if (data) {
      setProperties(data);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <ErrorBoundary fallbackRender={ErrorFallback} onError={captureError}>
      <div className='app'>
        <PropertyListing properties={properties} />
        <AddProperty updateProperties={updateProperties} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
