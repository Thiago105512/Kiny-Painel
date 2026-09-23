/* Regras de segurança do Firestore, verificadas contra o emulador.

   Como rodar (precisa de Java e de acesso à internet, uma vez):
     npm i --no-save firebase-tools @firebase/rules-unit-testing firebase
     npx firebase emulators:exec --only firestore --project demo-mucurinha "node testes/regras-firestore.test.mjs"

   O emulador lê as regras de app/firestore.rules, as mesmas que vão para o projeto. */
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import fs from 'node:fs';

const env = await initializeTestEnvironment({
  projectId: 'demo-mucurinha',
  firestore: { host: '127.0.0.1', port: 8181, rules: fs.readFileSync(new URL('../app/firestore.rules', import.meta.url), 'utf8') },
});

let ok = 0, falhou = 0;
async function t(nome, fn) { try { await fn(); ok++; console.log('  ✓', nome); } catch (e) { falhou++; console.log('  ✗', nome, '\n     ', e.message.split('\n')[0]); } }

const CAT = { sub: 'uid-catarina', email: 'catarina@gmail.com' };
const COL = { sub: 'uid-colega', email: 'Colega@Gmail.com' };   // maiúsculas de propósito
const EST = { sub: 'uid-estranha', email: 'estranha@gmail.com' };
const como = (u) => env.authenticatedContext(u.sub, { email: u.email, email_verified: true }).firestore();
const anon = () => env.unauthenticatedContext().firestore();

// estado inicial: espaço da Catarina, com convite para a colega
await env.withSecurityRulesDisabled(async (c) => {
  const d = c.firestore();
  await setDoc(doc(d, 'equipes/mucu-teste'), { dono: CAT.sub, nome: 'Mucurinha', membros: { [CAT.sub]: { nome: 'Catarina', email: CAT.email } } });
  await setDoc(doc(d, 'equipes/mucu-teste/convites/colega@gmail.com'), { email: 'colega@gmail.com', por: CAT.email });
  await setDoc(doc(d, 'equipes/mucu-teste/dados/mucurinha'), { json: '{}' });
  await setDoc(doc(d, 'usuarios/uid-catarina/dados/mucurinha'), { json: '{}' });
});

console.log('\nRegras do Firestore');
await t('a dona lê e grava os dados do espaço', async () => {
  await assertSucceeds(getDoc(doc(como(CAT), 'equipes/mucu-teste/dados/mucurinha')));
  await assertSucceeds(setDoc(doc(como(CAT), 'equipes/mucu-teste/dados/mucurinha'), { json: '{"a":1}' }));
});
await t('quem não entrou não lê os dados do espaço', async () => {
  await assertFails(getDoc(doc(como(EST), 'equipes/mucu-teste/dados/mucurinha')));
});
await t('sem conta, nada', async () => {
  await assertFails(getDoc(doc(anon(), 'equipes/mucu-teste/dados/mucurinha')));
  await assertFails(getDoc(doc(anon(), 'equipes/mucu-teste')));
});
await t('a convidada entra sozinha, com o código', async () => {
  await assertSucceeds(getDoc(doc(como(COL), 'equipes/mucu-teste')));
  await assertSucceeds(updateDoc(doc(como(COL), 'equipes/mucu-teste'), { ['membros.' + COL.sub]: { nome: 'Colega', email: COL.email } }));
});
await t('depois de entrar, a colega lê e grava os dados', async () => {
  await assertSucceeds(getDoc(doc(como(COL), 'equipes/mucu-teste/dados/mucurinha')));
  await assertSucceeds(setDoc(doc(como(COL), 'equipes/mucu-teste/dados/mucurinha'), { json: '{"b":2}' }));
});
await t('quem não foi convidada não entra, mesmo sabendo o código', async () => {
  await assertFails(updateDoc(doc(como(EST), 'equipes/mucu-teste'), { ['membros.' + EST.sub]: { nome: 'Estranha' } }));
  await assertFails(getDoc(doc(como(EST), 'equipes/mucu-teste')));
});
await t('a convidada não pode se aproveitar para mexer em outra coisa', async () => {
  await env.withSecurityRulesDisabled(async (c) => {
    await setDoc(doc(c.firestore(), 'equipes/mucu-outro'), { dono: CAT.sub, nome: 'Outro', membros: { [CAT.sub]: {} } });
    await setDoc(doc(c.firestore(), 'equipes/mucu-outro/convites/colega@gmail.com'), { email: 'colega@gmail.com' });
  });
  const d = como(COL);
  await assertFails(updateDoc(doc(d, 'equipes/mucu-outro'), { nome: 'Sequestrado', ['membros.' + COL.sub]: {} }));
  await assertFails(updateDoc(doc(d, 'equipes/mucu-outro'), { ['membros.' + EST.sub]: {} }));
  await assertFails(updateDoc(doc(d, 'equipes/mucu-outro'), { dono: COL.sub, ['membros.' + COL.sub]: {} }));
});
await t('só quem está no espaço convida', async () => {
  await assertSucceeds(setDoc(doc(como(CAT), 'equipes/mucu-teste/convites/terceira@gmail.com'), { email: 'terceira@gmail.com' }));
  await assertFails(setDoc(doc(como(EST), 'equipes/mucu-teste/convites/estranha@gmail.com'), { email: 'estranha@gmail.com' }));
  await assertSucceeds(getDocs(collection(como(CAT), 'equipes/mucu-teste/convites')));
  await assertFails(getDocs(collection(como(EST), 'equipes/mucu-teste/convites')));
});
await t('criar espaço só para si, já como membro', async () => {
  await assertSucceeds(setDoc(doc(como(CAT), 'equipes/mucu-novo'), { dono: CAT.sub, membros: { [CAT.sub]: {} } }));
  await assertFails(setDoc(doc(como(CAT), 'equipes/mucu-alheio'), { dono: EST.sub, membros: { [EST.sub]: {} } }));
  await assertFails(setDoc(doc(como(CAT), 'equipes/mucu-cheio'), { dono: CAT.sub, membros: { [CAT.sub]: {}, [EST.sub]: {} } }));
});
await t('os dados individuais continuam privados', async () => {
  await assertSucceeds(getDoc(doc(como(CAT), 'usuarios/uid-catarina/dados/mucurinha')));
  await assertFails(getDoc(doc(como(EST), 'usuarios/uid-catarina/dados/mucurinha')));
});
await t('nada mais no banco é acessível', async () => {
  await assertFails(getDoc(doc(como(CAT), 'qualquer/coisa')));
  await assertFails(setDoc(doc(como(CAT), 'qualquer/coisa'), { x: 1 }));
});
await t('só a dona apaga o espaço', async () => {
  await assertFails(deleteDoc(doc(como(COL), 'equipes/mucu-teste')));
  await assertSucceeds(deleteDoc(doc(como(CAT), 'equipes/mucu-novo')));
});

await env.cleanup();
console.log(`\n  ${ok} passaram, ${falhou} falharam`);
process.exit(falhou ? 1 : 0);
