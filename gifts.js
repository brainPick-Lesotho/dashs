import { db } from './firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const giftForm = document.getElementById('gift-form');
const giftsBody = document.getElementById('gifts-body');

const giftsRef = collection(db, 'gifts');

// Load gifts from Firestore
async function loadGifts() {
  const snapshot = await getDocs(giftsRef);
  giftsBody.innerHTML = '';

  snapshot.forEach(doc => {
    const data = doc.data();
    const row = `
      <tr>
        <td>${data.position}</td>
        <td>${data.value}</td>
        <td>${data.reward}</td>
      </tr>
    `;
    giftsBody.innerHTML += row;
  });
}

// Add new gift to Firestore
giftForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const position = document.getElementById('position').value;
  const value = document.getElementById('value').value;
  const reward = document.getElementById('reward').value;

  await addDoc(giftsRef, { position, value, reward });

  giftForm.reset();
  loadGifts(); // Refresh the table
});

loadGifts();
