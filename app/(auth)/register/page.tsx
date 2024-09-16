"use client";
import AuthForm from '@/components/forms/AuthForm';
import React, { useState, useEffect } from 'react';
import { fetchStates, fetchCities } from '@/lib/stateCityApiUtils';
import { State, City } from '@/lib/types';

const Register: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const loadStates = async () => {
      const statesData = await fetchStates();
      setStates(statesData);
    };
    loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const loadCities = async () => {
        setLoadingCities(true);
        const citiesData = await fetchCities(selectedState);
        setCities(citiesData);
        setLoadingCities(false);
      };
      loadCities();
    }
  }, [selectedState]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  /* const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    // Fetch cities based on selected state
    if (selectedState) {
      setLoadingCities(true);
      fetchCities(selectedState)
        .then((fetchedCities) => {
          setCities(fetchedCities);
          setLoadingCities(false);
        })
        .catch(() => {
          setLoadingCities(false);
        });
    }
  }; */

/*     if (state) {
      setLoadingCities(true);
      try {
        const resCities = await fetch(`/api/cities?state=${state}`);
        const data = await resCities.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoadingCities(false);
      }
    } else {
      setCities([]);
    }
  }; */

  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm 
        type='register' 
        states={states} 
        cities={cities} 
        selectedState={selectedState} 
        handleStateChange={handleStateChange} 
        loadingCities={loadingCities}
      />
    </section>
  );
}

export default Register;

/* export async function getStaticProps() {
  const headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow' as RequestRedirect,
  };

  try {
    const response = await fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch states: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Format data to match the required structure
    const states = data.map((state: any) => ({
      id: state.id,
      name: state.name
    }));
    
    return {
      props: {
        states
      }
    };
  } catch (error) {
    console.error('Error fetching states:', error);
    
    // Return an empty array in case of error
    return {
      props: {
        states: []
      }
    };
  }
} */


/* export async function getStaticProps() {
  const res = await fetch('https://your-api.com/states');
  const states = await res.json();

  return {
    props: {
      states,
    },
  };
} */