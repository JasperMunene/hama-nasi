import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faBox, faWarehouse, faTools } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./page.css";

function Page() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HAMA NASI</div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#why-choose-us">Why Choose Us</a></li>
        </ul>
        <div className="auth-buttons">
          <Link href="/signup"><button className="signup">Sign Up</button></Link>
          <Link href="/login"><button className="login">Login</button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Your Local Moving Experts</h1>
          <p>We provide high-quality moving services.</p>
        </div>
        <div className="hero-image">
          <img src="https://media.istockphoto.com/id/1332288869/photo/packaging-the-box-two-young-movers-in-blue-uniform-working-indoors-in-the-room.jpg?s=612x612&w=0&k=20&c=13On1LO-7EoAF0x3wwmcG6wsADn2rIN45O0S3aklaxo=" alt="Moving Services" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h2>Comprehensive Solutions for Every Move</h2>
        <p className="services-text">Explore Our Range Of Expert Services To Customize Your Moving Experience. From Local to Long-distance We’ve Got You Covered.</p>
        <div className="services-container">
          <div className="service-card">
            <FontAwesomeIcon icon={faTruck} className="icon" />
            <h3>Long-Distance Moving</h3>
            <p>Moving to a different city? We've got you covered.</p>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faBox} className="icon" />
            <h3>Packing & Unpacking</h3>
            <p>Take the stress out of moving with our expert packing services.</p>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faWarehouse} className="icon" />
            <h3>Secure Storage Services</h3>
            <p>Our storage facilities are safe and secure for your belongings.</p>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faTools} className="icon" />
            <h3>Furniture Assembly</h3>
            <p>We help with disassembling and reassembling your furniture.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="why-content">
          <div className="why-item">
            <h3>Your Trusted Moving Partner</h3>
            <p>We value the trust you place in us to handle your move.</p>
          </div>
          <div className="why-image">
            <img src="https://quickmover.ca/wp-content/uploads/2024/07/why-us-6.webp" alt="Moving Services" />
          </div>
        </div>
        <div className="why-content why-reverse">
          <div className="why-image">
            <img src="https://thumbs.dreamstime.com/b/movers-carrying-sofa-outside-truck-street-full-length-young-male-77511013.jpg" alt="Moving Services" />
          </div>
          <div className="why-item">
            <h3>Personalized Moving Solutions</h3>
            <p>We offer customized moving services for your needs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HAMA NASI</h3>
            <p>Your trusted moving partner</p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Residential Moving</li>
              <li>Long-distance Moving</li>
              <li>Packing & Unpacking</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:hamdi.yusuf@student.moringaschool.com">hamdi.yusuf@student.moringaschool.com</a></p>
            <p>Email: <a href="mailto:jose.barasa@student.moringaschool.com">jose.barasa@student.moringaschool.com</a></p>
            <p>Email: <a href="mailto:jasper.munene@student.moringaschool.com">jasper.munene@student.moringaschool.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
