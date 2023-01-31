import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Recent from './pages/Recent';
import Search from './pages/Search';
import Write from './pages/Write';
import Saves from './pages/Saves';
import Setting from './pages/Setting';
import Follows from './pages/Follows';
import ListsLiked from './pages/ListsLiked';
import ListsRead from './pages/ListsRead';
import ListsFollowing from './pages/ListsFollowing';
import Tags from './pages/Tags';
import TagsTag from './pages/TagsTag';
import Personal from './pages/Personal';
import PersonalSeries from './pages/PersonalSeries';
import PersonalSeriesName from './pages/PersonalSeriesName';
import PersonalAbout from './pages/PersonalAbout';
import PersonalPost from './pages/PersonalPost';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ModalProvider from './contexts/ModalProvider';
import LoginProvider from './contexts/LoginProvider';
import Toast from './components/Toast';
import Modal from './components/Modal';
import HeaderLayout from './pages/HeaderLayout';
import PersonalLayout from './pages/PersonalLayout';

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <LoginProvider>
      <ModalProvider>{children}</ModalProvider>
    </LoginProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/write" element={<Write />} />
        <Route path="/saves" element={<Saves />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/follows" element={<Follows />} />
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/lists">
            <Route path="liked" element={<ListsLiked />} />
            <Route path="read" element={<ListsRead />} />
            <Route path="following" element={<ListsFollowing />} />
            <Route path="" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/tags">
          <Route path="" element={<Tags />} />
          <Route path=":tag" element={<TagsTag />} />
        </Route>
        <Route path="/:id" element={<PersonalLayout />}>
          <Route path="" element={<Personal />} />
          <Route path="series" element={<PersonalSeries />} />
          <Route path="about" element={<PersonalAbout />} />
        </Route>
        <Route path="/:id">
          <Route path="series/:seriesName" element={<PersonalSeriesName />} />
          <Route path=":postTitle" element={<PersonalPost />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toast />
      <Modal />
    </AppProvider>
  );
}

export default App;
