import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        tasksData.push({
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
          dueDate: data.dueDate?.toDate?.() || undefined,
        });
      });
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (taskData) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        completed: false,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        dueDate: taskData.dueDate || null,
      });
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const toggleTask = async (taskId, completed) => {
    await updateTask(taskId, { completed: !completed });
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};
