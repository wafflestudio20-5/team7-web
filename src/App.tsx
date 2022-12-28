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
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/search" element={<Search />} />
      <Route path="/write" element={<Write />} />
      <Route path="/saves" element={<Saves />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/follows" element={<Follows />} />
      <Route path="/lists">
        <Route path="liked" element={<ListsLiked />} />
        <Route path="read" element={<ListsRead />} />
        <Route path="following" element={<ListsFollowing />} />
        <Route path="" element={<NotFound />} />
      </Route>
      <Route path="/tags">
        <Route path="" element={<Tags />} />
        <Route path=":tag" element={<TagsTag />} />
      </Route>
      <Route path="/:id">
        <Route path="" element={<Personal />} />
        <Route path="series">
          <Route path="" element={<PersonalSeries />} />
          <Route path=":seriesName" element={<PersonalSeriesName />} />
        </Route>
        <Route path="about" element={<PersonalAbout />} />
        <Route path=":postTitle" element={<PersonalPost />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
