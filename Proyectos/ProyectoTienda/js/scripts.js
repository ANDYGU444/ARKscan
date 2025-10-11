/* ===========================================
   CONFIG (igual al esqueleto)
=========================================== */
const DB_NAME = 'catalogo-db';
const STORE   = 'productos';
const VERSION = 1;
const LISTA_SELECTOR = '#tablaCatalogo';

let db;
const listaEl = document.querySelector(LISTA_SELECTOR);

/* ===========================================
   1. ABrir BD
=========================================== */
async function abrirDB() {
  db = await idb.openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, {keyPath: 'id', autoIncrement: true});
      }
    }
  });
}

/* ===========================================
   2. READ + PINTAR
=========================================== */
async function leerTodos() {
  const tx = db.transaction(STORE, 'readonly');
  return await tx.store.getAll();
}

async function pintarLista() {
  const regs = await leerTodos();
  listaEl.innerHTML = '';
  regs.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.imagen}" alt="${p.nombre}" width="80"></td>
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td>$${p.precio}</td>`;
    listaEl.appendChild(tr);
  });
}

/* ===========================================
   3. FILTRAR (reutiliza función anterior)
=========================================== */
function filtrarProductos() {
  const filtro = document.getElementById('buscador').value.trim().toLowerCase();
  const filas = listaEl.querySelectorAll('tr');
  filas.forEach(tr => {
    const txt = tr.cells[1]?.textContent.toLowerCase() || '';
    tr.style.display = txt.includes(filtro) ? '' : 'none';
  });
}

/* ===========================================
   4. ARRANCAR
=========================================== */
window.addEventListener('DOMContentLoaded', async () => {
  await abrirDB();
  await pintarLista();
  document.getElementById('buscador').addEventListener('input', filtrarProductos);
});