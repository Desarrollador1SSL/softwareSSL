import React from 'react';

const GenericPage = ({ title, code }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '50px',
      color: '#555' 
    }}>
      {/* Título Grande */}
      <h1 style={{ fontSize: '2rem', color: '#6c5ce7', marginBottom: '10px' }}>
        {title}
      </h1>
      
      {/* Código o Subtítulo para identificar */}
      <span style={{ 
        background: '#eee', 
        padding: '5px 10px', 
        borderRadius: '5px', 
        fontFamily: 'monospace',
        fontSize: '1rem'
      }}>
        Página ID: {code}
      </span>

      <p style={{ marginTop: '30px', maxWidth: '600px', marginInline: 'auto' }}>
        Esta es una página "Dummy" (maqueta) para demostrar la navegación.
        Aquí iría el desarrollo del módulo de <strong>{title}</strong>.
      </p>
    </div>
  );
};

export default GenericPage;