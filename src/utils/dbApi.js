// ✅ In-memory database with localStorage persistence
// Loads initial data from public/db.json on first load
// All changes persist in localStorage automatically

let db = {
  users: [],
  vocapsCollection: [],
};

// Initialize database on app load
let dbInitialized = false;

export const initializeDatabase = async () => {
  if (dbInitialized) return db;
  
  try {
    // Try to load from localStorage first
    const cached = localStorage.getItem('appDatabase');
    if (cached) {
      db = JSON.parse(cached);
      dbInitialized = true;
      console.log('✅ Database loaded from localStorage');
      return db;
    }

    // If no cache, load from public/db.json
    const response = await fetch('/db.json');
    if (!response.ok) throw new Error('Failed to load db.json');
    
    db = await response.json();
    localStorage.setItem('appDatabase', JSON.stringify(db));
    dbInitialized = true;
    console.log('✅ Database loaded from public/db.json');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    // Use default data if loading fails
    db = {
      users: [
        { id: 1, email: 'admin@example.com', name: 'Admin User', role: 'admin', password: '123456' },
        { id: 2, email: 'user@example.com', name: 'Test User', role: 'user', password: '123456' },
      ],
      vocapsCollection: [],
    };
    localStorage.setItem('appDatabase', JSON.stringify(db));
  }
  return db;
};

// Helper function to save to localStorage
const saveDatabase = () => {
  localStorage.setItem('appDatabase', JSON.stringify(db));
};

// Helper function to generate new ID
const generateId = (array) => {
  return array.length > 0 ? Math.max(...array.map(item => item.id || 0)) + 1 : 1;
};

// Simulate Promise-based API responses
const createResponse = (data) => Promise.resolve({ data });

// ✅ User operations
export const userApi = {
  getAll: async () => {
    await initializeDatabase();
    return createResponse(db.users);
  },

  getById: async (id) => {
    await initializeDatabase();
    const user = db.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return createResponse(user);
  },

  getByEmail: async (email) => {
    await initializeDatabase();
    const users = db.users.filter(u => u.email === email);
    return createResponse(users);
  },

  create: async (userData) => {
    await initializeDatabase();
    
    // Check if email already exists
    if (db.users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: generateId(db.users),
      ...userData,
      created_at: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveDatabase();
    return createResponse(newUser);
  },

  update: async (id, userData) => {
    await initializeDatabase();
    const index = db.users.findIndex(u => u.id === id);
    
    if (index === -1) throw new Error('User not found');

    const updated = { ...db.users[index], ...userData };
    db.users[index] = updated;
    saveDatabase();
    return createResponse(updated);
  },

  delete: async (id) => {
    await initializeDatabase();
    const index = db.users.findIndex(u => u.id === id);
    
    if (index === -1) throw new Error('User not found');

    db.users.splice(index, 1);
    saveDatabase();
    return createResponse({ success: true });
  },
};

// ✅ Vocabulary operations
export const vocabApi = {
  getAll: async () => {
    await initializeDatabase();
    return createResponse(db.vocapsCollection);
  },

  getById: async (id) => {
    await initializeDatabase();
    const vocab = db.vocapsCollection.find(v => v.id === id);
    if (!vocab) throw new Error('Vocabulary not found');
    return createResponse(vocab);
  },

  create: async (vocabData) => {
    await initializeDatabase();
    
    const newVocab = {
      id: generateId(db.vocapsCollection),
      ...vocabData,
      createdAt: new Date().toISOString(),
    };

    db.vocapsCollection.push(newVocab);
    saveDatabase();
    return createResponse(newVocab);
  },

  update: async (id, vocabData) => {
    await initializeDatabase();
    const index = db.vocapsCollection.findIndex(v => v.id === id);
    
    if (index === -1) throw new Error('Vocabulary not found');

    const updated = { ...db.vocapsCollection[index], ...vocabData };
    db.vocapsCollection[index] = updated;
    saveDatabase();
    return createResponse(updated);
  },

  delete: async (id) => {
    await initializeDatabase();
    const index = db.vocapsCollection.findIndex(v => v.id === id);
    
    if (index === -1) throw new Error('Vocabulary not found');

    db.vocapsCollection.splice(index, 1);
    saveDatabase();
    return createResponse({ success: true });
  },

  createBulk: async (items) => {
    await initializeDatabase();
    
    const created = items.map(item => ({
      id: generateId(db.vocapsCollection),
      ...item,
      createdAt: new Date().toISOString(),
    }));

    db.vocapsCollection.push(...created);
    saveDatabase();
    return createResponse(created);
  },
};

// ✅ Reset database to initial state (useful for testing)
export const resetDatabase = async () => {
  localStorage.removeItem('appDatabase');
  dbInitialized = false;
  await initializeDatabase();
};

export default { userApi, vocabApi, initializeDatabase, resetDatabase };

