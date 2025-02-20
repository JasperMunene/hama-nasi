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
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#why-choose-us">Why Choose Us</Link></li>
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
        <div className="services-text">
          <p>Explore Our Range Of Expert Services To Customize Your Moving Experience. From Local to Long-distance We’ve Got You Covered.</p>
        </div>
        <div className="services-container">
          <div className="service-card">
            <FontAwesomeIcon icon={faTruck} className="icon" />
            <div>
              <h3>Long-Distance Moving</h3>
              <p>Moving to a different city? We've got you covered.</p>
            </div>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faBox} className="icon" />
            <div>
              <h3>Packing & Unpacking</h3>
              <p>Take the stress out of moving with our expert packing services.</p>
            </div>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faWarehouse} className="icon" />
            <div>
              <h3>Secure Storage Services</h3>
              <p>Our storage facilities are safe and secure for your belongings.</p>
            </div>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faTools} className="icon" />
            <div>
              <h3>Furniture Assembly</h3>
              <p>We help with disassembling and reassembling your furniture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>// Why Choose Us</h2>
        <div className="why-content">
          <div className="why-item">
            <h3>Your Trusted Moving Partner</h3>
            <p>We value the trust you place in us to handle your move.</p>
          </div>
          <div className="why-image">
            <img src="https://quickmover.ca/wp-content/uploads/2024/07/why-us-6.webp" alt="Moving Services" />
          </div>
        </div>

        <h2>// Why Choose Us</h2>
        <div className="why-content">
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
        <div>HAMA NASI</div>
        <div className="footer-links">
          <a href="#">Services</a>
          <p>Residential Moving</p>
          <p>Long-distance Moving</p>
          <p>Packing and Unpacking services</p>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default Page;
