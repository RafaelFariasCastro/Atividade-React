// Dados fictícios da listagem de produtos
const nomes = {
  notebooks: ['Notebook Ultra 14', 'Notebook Pro 16', 'Notebook Gamer X', 'Notebook Slim 13', 'Chromebook Edu'],
  celulares: ['Smartphone Nova', 'Smartphone Lite', 'Smartphone Max', 'Smartphone Fold', 'Smartphone Mini'],
  acessorios: ['Mouse sem fio', 'Teclado mecânico', 'Headset USB', 'Webcam Full HD', 'Hub USB-C', 'Mousepad XL'],
  monitores: ['Monitor 24 pol. IPS', 'Monitor 27 pol. 4K', 'Monitor Ultrawide 34 pol.', 'Monitor Portátil 15 pol.'],
};

const precosBase = { notebooks: 3500, celulares: 1800, acessorios: 150, monitores: 1200 };

export const icones = { notebooks: '💻', celulares: '📱', acessorios: '🎧', monitores: '🖥️' };

export const categorias = [
  { value: 'todas', label: 'Todas as categorias' },
  { value: 'notebooks', label: 'Notebooks' },
  { value: 'celulares', label: 'Celulares' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'monitores', label: 'Monitores' },
];

export const ordenacoes = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'nome', label: 'Nome (A-Z)' },
];

let id = 1;
export const produtos = Object.entries(nomes).flatMap(([categoria, lista]) =>
  lista.map((nome, index) => ({
    id: id++,
    nome,
    categoria,
    price: Math.round(precosBase[categoria] * (1 + index * 0.18)),
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }))
);

export const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
