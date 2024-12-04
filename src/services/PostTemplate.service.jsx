import Cookies from 'js-cookie';

const PostTemplate = async (plantilla) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get('accessToken');

  // Verificando valores iniciales
  console.log('BASE_URL:', BASE_URL);
  console.log('Token:', token);
  console.log('Plantilla enviada:', plantilla);

  try {
    const response = await fetch(`${BASE_URL}8091/api/generar_template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plantilla),
    });

    // Imprimir la respuesta completa del fetch
    console.log('Fetch Response:', response);
    console.log('Response Status:', response.status);

    // Leer y loguear el contenido de la respuesta
    const responseBody = await response.text();  // Usamos text() para leer el body
    console.log('Response Body:', responseBody);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return { success: true };
  } catch (error) {
    console.error('Error generating new template:', error);

    return { success: false, error: error.message };
  }
};

export default PostTemplate;
