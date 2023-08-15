import { ErrorInfo, Fragment, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropertyListing from './components/PropertyListing';
import AddProperty from './components/AddProperty';
import ErrorFallback from './components/errorFallback';
import { Property } from './types/types';
import apiService from './API/apiServices';
import './App.css';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const idRef = useRef<HTMLDivElement>(null);
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
        <nav>
          <ul>
            <li>
              <img src='favicon.ico' alt='logo' />
              PROPERTIES APP
            </li>
            <li
              onClick={() =>
                idRef?.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Add property
              <span>+</span>
            </li>
          </ul>
          <ul className='responsiveNav'>
            <li>
              <img src='favicon.ico' alt='logo' />
              PROPERTIES APP
            </li>
            <li
              onClick={() =>
                idRef?.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span>+</span>
            </li>
          </ul>
        </nav>
        <PropertyListing properties={properties} />
        <div ref={idRef}>
          <AddProperty updateProperties={updateProperties} />
        </div>
      </div>
      <footer>© 2023 Properties App</footer>
    </ErrorBoundary>
  );
}

export default App;
