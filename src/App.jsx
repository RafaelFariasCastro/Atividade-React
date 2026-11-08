import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import ToastContainer from './components/Toast/ToastContainer.jsx';
import Home from './pages/Home.jsx';
import Produtos from './pages/Produtos.jsx';
import Upload from './pages/Upload.jsx';
import Perfil from './pages/Perfil.jsx';
import Faq from './pages/Faq.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="container main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
