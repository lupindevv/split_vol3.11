import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import CustomerPaymentPage from './pages/CustomerPaymentPage';
import TablePaymentPage from './pages/TablePaymentPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public payment routes */}
                    <Route path="/pay/:billNumber" element={<CustomerPaymentPage />} />
                    <Route path="/table/:tableNumber" element={<TablePaymentPage />} />
                    
                    {/* Dashboard route (ProtectedRoute is now just a pass-through) */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* Redirect everything else to the Dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;