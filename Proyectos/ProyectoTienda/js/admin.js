/* ===========================================
   CONFIG
=========================================== */
const DB_NAME = 'catalogo-db';
const STORE   = 'productos';
const VERSION = 1;
const LISTA_SELECTOR = '#tablaAdmin tbody';

let db;
let editId = null;
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
   2. CRUD
=========================================== */
async function crearRegistro(datos) {
  const tx = db.transaction(STORE, 'readwrite');
  const id = await tx.store.add(datos);
  await tx.done;
  return id;
}
async function leerTodos() {
  const tx = db.transaction(STORE, 'readonly');
  return await tx.store.getAll();
}
async function actualizarRegistro(datos) {
  const tx = db.transaction(STORE, 'readwrite');
  await tx.store.put(datos);
  await tx.done;
}
async function borrarRegistro(id) {
  const tx = db.transaction(STORE, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
}

/* ===========================================
   3. PINTAR
=========================================== */
async function pintarLista() {
  const regs = await leerTodos();
  listaEl.innerHTML = '';
  regs.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.imagen}" alt="${p.nombre}" width="80"></td>
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td>$${p.precio}</td>
      <td><button onclick="eliminar(${p.id})">🗑️</button></td>`;
    listaEl.appendChild(tr);
  });
}

/* ===========================================
   4. FORMULARIO
=========================================== */
const form = document.querySelector('#formularioProducto');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const datos = {
    nombre: document.querySelector('#nombre').value.trim(),
    descripcion: document.querySelector('#descripcion').value.trim(),
    precio: Number(document.querySelector('#precio').value),
    imagen: document.querySelector('#imagen').value.trim()
  };
  if (editId) datos.id = editId;

  editId ? await actualizarRegistro(datos) : await crearRegistro(datos);

  editId = null;
  form.reset();
  await pintarLista();
});

/* ===========================================
   5. ELIMINAR
=========================================== */
window.eliminar = async id => {
  await borrarRegistro(id);
  await pintarLista();
};

/* ===========================================
   6. ARRANCAR
=========================================== */
window.addEventListener('DOMContentLoaded', async () => {
  await abrirDB();
  await pintarLista();
});