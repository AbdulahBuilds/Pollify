import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DahboardPage from './pages/DahboardPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyOtpPage from './pages/VerifyOtpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { useAuth } from './context/AuthContext'
import { appStyles as s } from './assets/dummyStyles'
import { Loader2, PenLine, CheckCircle2, Bookmark, Settings } from 'lucide-react'
import CreatePollPage from './pages/CeatePollPage'
import PollListPage from './pages/PollListPage'
import SettingsPage from './pages/SettingsPage'
import SinglePollPage from './pages/SinglePollPage'
import UserProfilePage from './pages/UserProfilePage'
import Analytics from './pages/Analytics'

// Protect route
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading)
    return (
      <div className={s.loadingContainer}>
        <Loader2 className={s.loadingSpinner} size={32} />
      </div>
    )

  return user ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <div className={s.root}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DahboardPage />} />

          <Route path="/create-poll" element={<CreatePollPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/poll/:id" element={<SinglePollPage/>}/>
          <Route path="/user/:username" element={<UserProfilePage/>}/>
          <Route path="/poll/:id/analytics" element={<Analytics/>}/>
          <Route
            path="/my-polls"
            element={
              <PollListPage
                title="My Polls"
                path="/polls/mine"
                owner
                Icon={PenLine}
                emptyTitle="No polls yet"
                emptyText="You haven't created any polls yet."
              />
            }
          />

          <Route
            path="/voted-polls"
            element={
              <PollListPage
                title="Voted Polls"
                path="/polls/voted"
                Icon={CheckCircle2}
                emptyTitle="No votes yet"
                emptyText="You haven't voted on any polls yet."
              />
            }
          />

          <Route
            path="/bookmarked-polls"
            element={
              <PollListPage
                title="Saved"
                path="/polls/bookmarks"
                Icon={Bookmark}
                emptyTitle="No saved polls yet"
                emptyText="Save polls you want to revisit later."
                action= {
                  <Link to="/dashboard" >
                    <button className="mt-4">Explore</button>
                  </Link>
                }
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to='/dashboard' replace/>}/>
      </Routes>
    </div>
  )
}

export default App