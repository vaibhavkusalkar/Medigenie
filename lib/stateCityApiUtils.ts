const baseUrl = process.env.NEXT_PUBLIC_STATE_CITY_API_BASE_URL;
const baseEndpoint = process.env.NEXT_PUBLIC_STATE_CITY_API_BASE_ENDPOINT;

export async function fetchStates(): Promise<{ name: string; iso: string }[]> {

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow' as RequestRedirect,
    body: JSON.stringify({
      "country": "India"
    })
  };

  try {
    const response = await fetch(`${baseUrl}${baseEndpoint}/states`, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch states from API: ${response.statusText}`);
    }


    const data = await response.json();

    console.log(data);

    return data.data.states.map((state: {name: string, iso: string}) => ({
      name: state.name,
      iso: state.iso
    }));
    
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
}

export async function fetchCities(state: string) {

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      redirect: 'follow' as RequestRedirect,
      body: JSON.stringify({
        "country": "India",
        "state": state
      })
    };
  
    try {
      const response = await fetch(`${baseUrl}${baseEndpoint}/state/cities`, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch cities from API: ${response.statusText}`);
      }
  
      //const data = await response.json();
      const data = await response.json();

      console.log(data);
  
      // Format the cities data as per your requirements
      return data.data.map((city: string) => ({
        name: city,
      }));
  
    } catch (error) {
      console.error('Error fetching cities:', error);
      return []; // Return an empty array in case of error
    }
  }