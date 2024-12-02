// src/componentes/Presentacion.tsx
import { useState, useEffect } from 'react';

const slides = [
  {
    title: "¿Qué es Express.js?",
    body: "Express.js es un framework web rápido, minimalista y flexible para Node.js. Es considerado el framework estándar de facto para el desarrollo de aplicaciones web en Node.js.",
    image: "https://miro.medium.com/max/1400/1*XP-mZOrIqX7OsFInN2ngRQ.png"
  },
  {
    title: "Características Principales",
    body: "• Enrutamiento robusto\n• Middleware integrado\n• Alto rendimiento\n• Soporte para API REST\n• Gran ecosistema de paquetes",
    image: "https://miro.medium.com/max/1400/1*XP-mZOrIqX7OsFInN2ngRQ.png"
  },
  {
    title: "Middleware",
    body: "El middleware en Express son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función middleware. Pueden ejecutar código, modificar req/res y terminar el ciclo.",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20211007175759/MiddlewareChaining.png"
  },
  {
    title: "Enrutamiento",
    body: "Express proporciona un sistema de enrutamiento completo que permite manejar solicitudes HTTP (GET, POST, PUT, DELETE) y definir rutas de manera organizada y modular.",
    image: "https://cdn.alvarofontela.com/wp-content/uploads/servertiming.jpg"
  },
  {
    title: "Manejo de Estática",
    body: "Express facilita el servir archivos estáticos como imágenes, CSS y JavaScript mediante el middleware express.static, simplificando la creación de aplicaciones web completas.",
    image: "https://teno-hira.com/media/wp-content/uploads/2022/07/undraw_static_assets_rpm6.png"
  },
  {
    title: "Motor de Plantillas",
    body: "Soporta múltiples motores de plantillas como EJS, Pug, Handlebars, permitiendo generar HTML dinámicamente del lado del servidor.",
    image : "https://miro.medium.com/max/1400/1*XP-mZOrIqX7OsFInN2ngRQ.png"
  },
  {
    title: "Gestión de Errores",
    body: "Express incluye un manejador de errores integrado y permite crear middleware personalizado para el manejo de errores, facilitando el debug y la gestión de excepciones.",
    image: "https://miro.medium.com/v2/resize:fit:1358/1*4nJJgPOnlJwD6s-7ygqgTg.jpeg"
  },
  {
    title: "Bases de Datos",
    body: "Se integra fácilmente con cualquier base de datos: MongoDB, PostgreSQL, MySQL, Redis, etc. No está atado a ninguna base de datos específica.",
    image: "https://concepto.de/wp-content/uploads/2018/04/base-de-datos-min-e1523470727712-800x414.jpg"
  },
  {
    title: "Seguridad",
    body: "Proporciona varias capas de seguridad mediante middleware como helmet, cors, y express-validator para proteger aplicaciones contra vulnerabilidades comunes.",
    image: "https://repository-images.githubusercontent.com/2518028/adb2df00-9431-11e9-9ccd-26f012b80f29"
  },
  {
    title: "Escalabilidad",
    body: "Express permite construir aplicaciones escalables mediante el uso de middleware, separación de rutas, y arquitecturas modernas como MVC o microservicios.",
    image: "https://repository-images.githubusercontent.com/2518028/adb2df00-9431-11e9-9ccd-26f012b80f29"
  }
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutos en segundos
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // Opcional: Acciones cuando el tiempo termine
      alert('¡Tiempo terminado!');
    }
  }, [timeLeft, isPaused]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const nextSlide = () => {
    setCurrentSlide(current => 
      current === slides.length - 1 ? current : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(current => 
      current === 0 ? current : current - 1
    );
  };

  // Agregar navegación por teclado
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') nextSlide();
    if (event.key === 'ArrowLeft') prevSlide();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="presentation">
      <div className="timer">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={`timer-button ${isPaused ? 'paused' : ''}`}
        >
          {formatTime(timeLeft)}
        </button>
      </div>

      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${
              index === currentSlide
                ? 'active'
                : index < currentSlide
                ? 'previous'
                : ''
            }`}
          >
            <h2>{slide.title}</h2>
            <p>{slide.body}</p>
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
      </div>
      
      <div className="controls">
        <button onClick={prevSlide} disabled={currentSlide === 0}>
          ← Anterior
        </button>
        <span>{currentSlide + 1} / {slides.length}</span>
        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Presentation;