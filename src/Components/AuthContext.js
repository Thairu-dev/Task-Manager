// // src/contexts/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         fetch('https://task-app-server-07x5.onrender.com/check_session')
//             .then(response => response.json())
//             .then(data => {
//                 if (data.id) {
//                     setUser(data);
//                 }
//             });
//     }, []);

//     const login = (userData) => {
//         setUser(userData);
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
