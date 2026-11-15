import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const user = sessionStorage.getItem('loggedInUserId');

    if (!user) {
        return <Navigate to='/' replace /> // המילה רפלייס אומרת מחיקה (מהיסטוריית הדפדפן) של העמוד שהמשתמש ניסה להתחבר כדי לא להגיע אליו אם לוחצים על הכפתור חזור אחורה
    }
    return children; // אם הכל עבר חלק - הרכיב, שבין התג הפותח והסוגר של הרכיב הזה (פרוטקטדראוט), ירוץ
}