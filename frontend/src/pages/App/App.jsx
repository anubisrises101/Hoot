import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import HootListPage from "../HootListPage/HootListPage";
import HootDetailsPage from "../HootDetailsPage/HootDetailsPage";
import NewHootPage from "../NewHootPage/NewHootPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import * as hootService from "../../services/hootService";

function App() {
  const [user, setUser] = useState(getUser());
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  const handleDeleteHoot = async (hootId) => {
    // Call upon the service function:
    const deletedHoot = await hootService.deleteHoot(hootId);
    // Filter state using deletedHoot._id:
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    // Redirect the user:
    navigate('/hoots');
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);

    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));

    navigate(`/hoots/${hootId}`);
  };

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots} />} />
            <Route
              path="/hoots/new"
              element={<NewHootPage handleAddHoot={handleAddHoot} />}
            />
            <Route
              path="/hoots/:hootId/edit"
              element={<NewHootPage handleUpdateHoot={handleUpdateHoot} />}
            />
            <Route
              path="/hoots/:hootId"
              element={
                <HootDetailsPage
                  user={user}
                  handleDeleteHoot={handleDeleteHoot}
                />
              }
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
