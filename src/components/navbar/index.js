// import React from 'react';
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink
// } from './NavbarElements';
// import "./navbar.css"


// document.addEventListener('DOMContentLoaded', function() {
//     // When the event DOMContentLoaded occurs, it is safe to access the DOM
  
//     // When the user scrolls the page, execute myFunction 
//     window.addEventListener('scroll', myFunctionForSticky);
  
//     // Get the navbar
//     var navbar = document.getElementById("nav-id");
  
//     // Get the offset position of the navbar
//     var sticky = navbar.offsetTop;
  
//     // Add the sticky class to the navbar when you reach its scroll position. 
//     // Remove "sticky" when you leave the scroll position
  
//     function myFunctionForSticky() {

//       if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky");
//       } else {
//         navbar.classList.remove("sticky");
//       }
//     }
  
//     /*Toggle between adding and removing the "responsive" class to topnav
//     when the user clicks on the icon*/
  
//     function myFunctionForResponsive() {
//       navbar.classList.toggle('responsive');
//     }
//   })
// const Navbar = () => {
//   return (
//     <>
//       <Nav id="nav-id"> 
//         <NavLink to='/'>
         
//         </NavLink>
//         <Bars />
//         <NavMenu>
//         <NavLink to='/' activestyle = 'true'>
//             Home
//           </NavLink>
//           <NavLink to='/about' activestyle = 'true'>
//             About
//           </NavLink>
//           <NavLink to='/services' activestyle  = 'true'>
//             Services
//           </NavLink>
//           <NavLink to='/contact' activestyle = 'true'>
//             Contact Us
//           </NavLink>

//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           <NavBtnLink to=''>Sign In</NavBtnLink>
//         </NavBtn>
//       </Nav>
//     </>
//   );
// };

// export default Navbar;