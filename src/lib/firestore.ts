/**
 * Firestore helper functions — Google Service #3
 * CRUD operations for quiz scores, chat history, bookmarks, and user progress.
 */
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore';
import { getFirebaseFirestore } from './firebase';

const db = () => getFirebaseFirestore();

/** Save a quiz score */
export async function saveQuizScore(userId: string, score: number, total: number, difficulty: string) {
  const ref = collection(db(), 'quizScores');
  return addDoc(ref, {
    userId,
    score,
    total,
    difficulty,
    percentage: Math.round((score / total) * 100),
    createdAt: serverTimestamp(),
  });
}

/** Get user's quiz history */
export async function getQuizHistory(userId: string, maxResults = 10) {
  const ref = collection(db(), 'quizScores');
  const q = query(ref, where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(maxResults));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Save chat message */
export async function saveChatMessage(userId: string, role: 'user' | 'assistant', content: string) {
  const ref = collection(db(), 'chatHistory');
  return addDoc(ref, { userId, role, content, createdAt: serverTimestamp() });
}

/** Get chat history */
export async function getChatHistory(userId: string, maxMessages = 50) {
  const ref = collection(db(), 'chatHistory');
  const q = query(ref, where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(maxMessages));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() as DocumentData })).reverse();
}

/** Save a bookmark */
export async function saveBookmark(userId: string, phaseId: string, stepId: string) {
  const ref = doc(db(), 'bookmarks', `${userId}_${phaseId}_${stepId}`);
  return setDoc(ref, { userId, phaseId, stepId, createdAt: serverTimestamp() });
}

/** Get user bookmarks */
export async function getUserBookmarks(userId: string) {
  const ref = collection(db(), 'bookmarks');
  const q = query(ref, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data());
}

/** Save/update user progress */
export async function saveUserProgress(userId: string, completedPhases: string[]) {
  const ref = doc(db(), 'userProgress', userId);
  return setDoc(ref, { userId, completedPhases, updatedAt: serverTimestamp() }, { merge: true });
}

/** Get user progress */
export async function getUserProgress(userId: string) {
  const ref = doc(db(), 'userProgress', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : { completedPhases: [] };
}

/** Get leaderboard (top quiz scores) */
export async function getLeaderboard(maxResults = 20) {
  const ref = collection(db(), 'quizScores');
  const q = query(ref, orderBy('percentage', 'desc'), limit(maxResults));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
