import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="container">
          <img src="./img/white-logo.png" alt="" className="logo" />
          <ul className="nav-list">
            <li className="nav-link nav-link-active">
              <a className="App-link" href="/login">
                Acceder
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="section-hero">
        <div className="hero">
          <div className="hero-imgbox">
            <img src="./img/header-img.png" alt="" />
          </div>
          <div className="hero-text-box">
            <h4>Jordi Vañó Enrique</h4>
            <h1>Estudiante</h1>
            <p>
              Este es mi proyecto final del ciclo formativo de grado superior en Desarrollo de Aplicaciones Web (DAW)
            </p>
          </div>
        </div>
      </section>

      <section className="section-services">
        <div className="container">
          <div className="services">
            <div className="service-box service-box-active">
              <img src="./img/tarjeta.svg" style={{ width: '50px' }} alt="" />
              <h3>Tarjetas</h3>
              <p>
                Prueba nuestras tarjetas para tus ferias y visitas a clientes
              </p>
            </div>

            <div className="service-box service-box-active">
              <img src="./img/chapa.svg" style={{ width: '40px' }} alt="" />
              <h3>Chapas</h3>
              <p>
                Prueba nuestras chapas para pegarlas donde quieras y que la gente te descubra
              </p>
            </div>

            <div className="service-box service-box-active">
              <img src="./img/llavero.svg" style={{ width: '50px' }} alt="" />
              <h3>Llaveros</h3>
              <p>
                Prueba nuestros llaveros para compartir todo siempre vayas donde vayas
              </p>
            </div>
          </div>

          <div className="numbers-div container">
            <div className="experience">
              <h2>1</h2>
              <p>Año Experiencia</p>
            </div>

            <div className="numbers">
              <div className="number-box">
                <h2>2+</h2>
                <p>Clientes</p>
              </div>

              <div className="number-box">
                <h2>4+</h2>
                <p>Asignaturas aprobadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cta">
        <div className="container">
          <div className="cta">
            <div className="cta-textbox">
              <h2>
                ¿Quieres pedir un presupuesto?
              </h2>
              <p>
                Contacta con nosotros
              </p>
            </div>
            <div className="cta-btnbox">
              <button className="btn btn-cta">Contacta</button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer">
            <img src="./img/white-logo.png" alt="" className="footer-logo" />
            <div className="social-media">
              <img src="./img/social-media/meta.svg" alt="" />
              <img src="./img/social-media/insta.svg" alt="" />
              <img src="./img/social-media/twitter.svg" alt="" />
              <img src="./img/social-media/youtube.svg" alt="" />
            </div>
          </div>
          <p style={{ textAlign: 'center', paddingBottom: '20px' }}>&copy; Jordi Vañó Enrique - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
