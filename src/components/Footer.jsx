import React from 'react';

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <span className="text-muted">© 2024 <i>GoYum</i>, Inc</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><a className="text-muted" href="/">Home</a></li>
        <li className="ms-3"><a className="text-muted" href="/about">About</a></li>
        <li className="ms-3 mr-3"><a className="text-muted" href="/contact">Contact</a></li>
        <li className='ms-3'></li>
      </ul>
    </footer>
  );
}
