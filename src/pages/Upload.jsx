import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar.jsx';
import { useToast } from '../context/ToastContext.jsx';
import './Pages.css';

const TAMANHO_MAXIMO = 20 * 1024 * 1024; // 20 MB
const ESPACO_TOTAL = 100 * 1024 * 1024; // 100 MB de armazenamento fictício

const formatarTamanho = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

let nextUploadId = 1;

function Upload() {
  const [uploads, setUploads] = useState([]);
  const inputRef = useRef(null);
  const { showToast } = useToast();

  const emAndamento = uploads.some((u) => u.status === 'enviando');

  // Simula o envio: a cada 300 ms aumenta o progresso dos arquivos em andamento
  useEffect(() => {
    if (!emAndamento) return undefined;
    const intervalo = setInterval(() => {
      setUploads((atual) =>
        atual.map((u) =>
          u.status === 'enviando'
            ? { ...u, progress: Math.min(100, u.progress + Math.random() * 12 + 3) }
            : u
        )
      );
    }, 300);
    return () => clearInterval(intervalo);
  }, [emAndamento]);

  // Quando um arquivo chega a 100%, marca como concluído e avisa o usuário
  useEffect(() => {
    const finalizados = uploads.filter((u) => u.status === 'enviando' && u.progress >= 100);
    if (finalizados.length === 0) return;
    finalizados.forEach((u) => showToast(`"${u.name}" enviado com sucesso!`, 'success'));
    setUploads((atual) =>
      atual.map((u) => (u.status === 'enviando' && u.progress >= 100 ? { ...u, status: 'concluido' } : u))
    );
  }, [uploads, showToast]);

  const adicionarArquivos = (arquivos) => {
    const validos = [];
    arquivos.forEach((arquivo) => {
      if (arquivo.size > TAMANHO_MAXIMO) {
        showToast(`"${arquivo.name}" excede o limite de 20 MB.`, 'error', 5000);
      } else {
        validos.push({
          id: nextUploadId++,
          name: arquivo.name,
          size: arquivo.size,
          progress: 0,
          status: 'enviando',
        });
      }
    });
    if (validos.length > 0) {
      setUploads((atual) => [...validos, ...atual]);
      showToast(`Enviando ${validos.length} arquivo(s)...`, 'info', 2500);
    }
  };

  const handleFileChange = (event) => {
    adicionarArquivos(Array.from(event.target.files));
    event.target.value = ''; // permite escolher o mesmo arquivo novamente
  };

  const enviarExemplo = () => {
    const tamanho = Math.round((Math.random() * 8 + 1) * 1024 * 1024);
    adicionarArquivos([{ name: `relatorio-${nextUploadId}.pdf`, size: tamanho }]);
  };

  const cancelar = (upload) => {
    setUploads((atual) => atual.map((u) => (u.id === upload.id ? { ...u, status: 'cancelado' } : u)));
    showToast(`Envio de "${upload.name}" cancelado.`, 'warning');
  };

  const remover = (id) => setUploads((atual) => atual.filter((u) => u.id !== id));

  const espacoUsado = uploads
    .filter((u) => u.status === 'concluido')
    .reduce((soma, u) => soma + u.size, 0);
  const percentualUsado = (espacoUsado / ESPACO_TOTAL) * 100;
  const variantEspaco = percentualUsado > 85 ? 'danger' : percentualUsado > 60 ? 'warning' : 'success';

  const variantPorStatus = { enviando: 'primary', concluido: 'success', cancelado: 'danger' };
  const textoStatus = { enviando: 'Enviando', concluido: 'Concluído', cancelado: 'Cancelado' };

  return (
    <>
      <header className="page-header">
        <h1>Upload de arquivos</h1>
        <p>Selecione arquivos (até 20 MB cada) para acompanhar o envio simulado pela barra de progresso.</p>
      </header>

      <div className="upload-layout">
        <section className="card" aria-labelledby="titulo-envio">
          <h2 id="titulo-envio">Enviar</h2>
          <label className="dropzone">
            <input ref={inputRef} type="file" multiple onChange={handleFileChange} className="visually-hidden" />
            <span className="dropzone__icon" aria-hidden="true">📁</span>
            <span>
              <strong>Clique para escolher arquivos</strong>
              <br />
              <span className="muted">ou use um arquivo de exemplo</span>
            </span>
          </label>
          <button type="button" className="btn btn--outline full-width" onClick={enviarExemplo}>
            Enviar arquivo de exemplo
          </button>

          <h3 className="storage-title">Armazenamento</h3>
          <ProgressBar
            label={`${formatarTamanho(espacoUsado)} de ${formatarTamanho(ESPACO_TOTAL)}`}
            value={percentualUsado}
            variant={variantEspaco}
          />
        </section>

        <section className="card" aria-labelledby="titulo-fila">
          <h2 id="titulo-fila">Fila de envio</h2>
          {uploads.length === 0 ? (
            <p className="muted">Nenhum arquivo enviado ainda.</p>
          ) : (
            <ul className="upload-list">
              {uploads.map((upload) => (
                <li key={upload.id} className="upload-item">
                  <div className="upload-item__info">
                    <span className="upload-item__name" title={upload.name}>{upload.name}</span>
                    <span className="muted upload-item__meta">
                      {formatarTamanho(upload.size)} · {textoStatus[upload.status]}
                    </span>
                  </div>
                  <ProgressBar
                    label={`Progresso de ${upload.name}`}
                    value={upload.progress}
                    variant={variantPorStatus[upload.status]}
                  />
                  {upload.status === 'enviando' ? (
                    <button type="button" className="btn btn--outline btn--small" onClick={() => cancelar(upload)}>
                      Cancelar
                    </button>
                  ) : (
                    <button type="button" className="btn btn--outline btn--small" onClick={() => remover(upload.id)}>
                      Remover
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default Upload;
