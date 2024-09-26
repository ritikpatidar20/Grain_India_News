// import React from "react";
 import { Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes } from "react-router-dom";
// import { Home } from "./pages/Home";
// import { About } from "./pages/About";
// import { Blog } from "./pages/Blog";
// import { Contact } from "./pages/Contact";
// import { MarketRate } from "./pages/MarketRate";
// import Admin from "./pages/Admin";
// import Login from "./pages/Login1";
// import AppLayout from "./components/layout/AppLayout";

// import AddImage from "../src/Admin/AddImage"
// import ShowAllBlogs from "../src/Admin/ShowAllBlogs";
// import ShowAllEditBlog from "../src/Admin/ShowAllEditBlog";
// import EditBlog from "../src/Admin/EditBlog";
// import RemoveCarouselImage from "../src/Admin/RemoveCarouselImage";
// import ShowAllCarousel from "../src/Admin/ShowAllCarousel";
// import CreateBlog from "../src/Admin/CreateBlog";
// import AdminHome from "./Admin/AdminHome";
// import ChangePassword from "./Admin/AdminChangePassword";
// //import LoginForm from "./pages/login";

// function App() {
//   // 2nd Way
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AppLayout />}>
//           <Route index element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/marketrates" element={<MarketRate />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/login" element={<Login/>}/>
//         </Route>
//         <Route path="/admin" element={<Admin />}>
//         <Route index element={ <AdminHome/>} />
//         <Route path="/admin/add-image" element={<AddImage />} />
//         <Route path="/admin/all-blog" element={<ShowAllBlogs />} /> 
//         <Route path="/admin/edit-blog" element={<ShowAllEditBlog />} />
//         <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
//         <Route path="/admin/remove-image" element={<RemoveCarouselImage />} />
//         <Route path="/admin/all-image" element={<ShowAllCarousel />} />
//         <Route path="/admin/create-blog" element={<CreateBlog />} />
//         <Route path="/admin/changePassword" element={<ChangePassword />} />
        
        
//         </Route>
        
//         {/*
//         <Route path="/remove-blog" element={<RemoveBlog />} />
//        <Route path="/logout" element={<Logout />} />
//         <Route path="/all-blog" element={<BlogList />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import  {AuthProvider}  from './AuthContext'
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { MarketRate } from './pages/MarketRate';
import Admin from './pages/Admin';
import Login from './pages/Login1';
import AppLayout from './components/layout/AppLayout';

import AddImage from '../src/Admin/AddImage';
import ShowAllBlogs from '../src/Admin/ShowAllBlogs';
import ShowAllEditBlog from '../src/Admin/ShowAllEditBlog';
import EditBlog from '../src/Admin/EditBlog';
import RemoveCarouselImage from '../src/Admin/RemoveCarouselImage';
import ShowAllCarousel from '../src/Admin/ShowAllCarousel';
import CreateBlog from '../src/Admin/CreateBlog';
import AdminHome from './Admin/AdminHome';
import ChangePassword from './Admin/AdminChangePassword';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/marketrates" element={<MarketRate />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            </Route>
         </Routes>
         <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminHome />} />
              <Route path="/admin/add-image" element={<AddImage />} />
              <Route path="/admin/all-blog" element={<ShowAllBlogs />} />
              <Route path="/admin/edit-blog" element={<ShowAllEditBlog />} />
              <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
              <Route path="/admin/remove-image" element={<RemoveCarouselImage />} />
              <Route path="/admin/all-image" element={<ShowAllCarousel />} />
              <Route path="/admin/create-blog" element={<CreateBlog />} />
              <Route path="/admin/changePassword" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
