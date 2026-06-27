export async function fetchCountries() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/countries`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid response from countries API');
    }

    return data;
  } catch (error) {
    console.error('Error in fetchCountries:', error);
    throw error;
  }
}
