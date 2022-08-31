import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import logo_footer from "../public/icons/logo_footer.svg";

export default function Footer() {
  return (
    <div className="flex bg-[#0f172a4d] justify-between rounded-t-3xl py-14 px-20 mt-28 rounded-r-3xl relative">
      <Link href="https://www.getmetag.io/">
        <Image src={logo_footer} alt="metag_logo" />
      </Link>
      <div className="flex space-x-5">
        <h6>Help</h6>
        <h6>Contact</h6>
        <h6>Privacy and Legal</h6>
      </div>
    </div>
  );
}
