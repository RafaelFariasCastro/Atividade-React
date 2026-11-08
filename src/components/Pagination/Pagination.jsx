import './Pagination.css';

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  if (start > 2) pages.push('inicio-ellipsis');
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push('fim-ellipsis');
  pages.push(totalPages);
  return pages;
}

function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination" aria-label="Paginação">
      <button
        type="button"
        className="pagination__btn"
        onClick={() => goTo(currentPage - 1)}
        disabled={isFirst}
        aria-label="Página anterior"
      >
        ‹ <span className="pagination__text">Anterior</span>
      </button>

      <ul className="pagination__list">
        {getPageItems(currentPage, totalPages).map((item) =>
          typeof item === 'string' ? (
            <li key={item} className="pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`pagination__btn pagination__page ${item === currentPage ? 'is-active' : ''}`}
                onClick={() => goTo(item)}
                aria-label={`Página ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pagination__btn"
        onClick={() => goTo(currentPage + 1)}
        disabled={isLast}
        aria-label="Próxima página"
      >
        <span className="pagination__text">Próxima</span> ›
      </button>
    </nav>
  );
}

export default Pagination;
