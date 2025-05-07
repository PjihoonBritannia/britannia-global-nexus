
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const BritanniaText = () => (
    <svg width="180" height="30" viewBox="0 0 1800 150">
      <path id="text" d="M58.295-167.836h116c70.289,0,111.686-37.947,111.686-96.162,0-35.791-19.836-63.389-54.334-74.6,26.736-11.212,42.259-34.929,42.259-66.839,0-52.178-38.81-85.813-101.336-85.813H58.295Zm55.627-189.305V-445.11h54.334c31.048,0,48.728,19.4,48.728,43.984,0,26.736-18.542,43.984-50.884,43.984Zm0,143.165v-98.749h58.215c38.378,0,56.49,19.4,56.49,47.865,0,27.6-19.836,50.884-56.921,50.884Zm209.141,46.14h52.178V-291.6c0-30.617,13.368-53.471,41.4-53.471,30.185,0,33.635,24.148,34.066,24.148H488.22v-29.323c-3.881-21.992-21.561-39.241-53.9-39.241-29.754,0-49.59,14.661-60.371,33.635l-3.019-28.46H323.063Zm186.287,0h52.178V-384.308H509.35Zm-1.725-261.319h55.627v-53.04H507.625ZM702.536-162.661c37.947,0,56.058-18.111,64.252-34.066v-28.892H730.565c0,2.156-2.587,18.974-25.873,18.974-22.423,0-30.617-14.23-30.617-39.241v-94.868h85.381v-43.553H674.076v-54.334H626.21l-3.019,54.334h-35.36v43.553H621.9v98.318C621.9-191.553,649.927-162.661,702.536-162.661Zm144.889,0c34.929,0,55.2-18.542,65.977-34.929l4.743,29.754h44.847V-300.651c0-58.646-31.91-88.831-93.143-88.831-62.527,0-82.363,38.81-82.363,38.81v28.46h37.085S835.783-345.5,868.555-345.5c29.323,0,41.828,14.661,41.828,43.553V-290.3a203.752,203.752,0,0,0-45.278-5.175c-62.958,0-90.125,27.167-90.125,65.545C774.981-192.846,799.129-162.661,847.425-162.661Zm12.937-41.4c-21.561,0-33.635-8.624-33.635-28.46,0-14.661,9.056-28.46,40.1-28.46,25.442,0,43.553,5.175,43.553,5.175v10.349C910.384-227.344,892.7-204.058,860.362-204.058Zm147.908,36.222h52.178V-292.889c0-24.579,12.074-51.315,49.159-51.315,31.048,0,43.122,21.13,43.122,51.315v125.053h52.609V-299.358c0-49.159-21.561-90.125-80.207-90.125-34.929,0-55.627,18.542-65.977,34.066l-3.018-28.892H1008.27Zm242.345,0h52.177V-292.889c0-24.579,12.074-51.315,49.159-51.315,31.048,0,43.122,21.13,43.122,51.315v125.053h52.609V-299.358c0-49.159-21.561-90.125-80.207-90.125-34.929,0-55.627,18.542-65.976,34.066l-3.019-28.892h-47.865Zm242.345,0h52.177V-384.308H1492.96Zm-1.725-261.319h55.627v-53.04h-55.627Zm158.689,266.493c34.929,0,55.2-18.542,65.976-34.929l4.744,29.754h44.847V-300.651c0-58.646-31.91-88.831-93.143-88.831-62.526,0-82.363,38.81-82.363,38.81v28.46h37.085s11.212-23.286,43.984-23.286c29.323,0,41.828,14.661,41.828,43.553V-290.3a203.747,203.747,0,0,0-45.278-5.175c-62.958,0-90.125,27.167-90.125,65.545C1577.479-192.846,1601.628-162.661,1649.924-162.661Zm12.937-41.4c-21.561,0-33.635-8.624-33.635-28.46,0-14.661,9.056-28.46,40.1-28.46,25.442,0,43.553,5.175,43.553,5.175v10.349C1712.882-227.344,1695.2-204.058,1662.861-204.058Z" transform="translate(0, 300)" fill="#fff" stroke="#fff" stroke-width="0.2"/>
    </svg>
  );

  return (
    <footer className="bg-base-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-5">
              <BritanniaText />
            </div>
            <p className="mb-6 text-sm text-gray-300 font-light">
              Connecting EMEA-Korea markets with Korean capital expertise
            </p>
            <div className="flex space-x-5 mt-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">About Us</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm font-light">About Us</Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-300 hover:text-white text-sm font-light">Media</Link>
              </li>
              <li>
                <Link to="/esg" className="text-gray-300 hover:text-white text-sm font-light">ESG</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white text-sm font-light">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6">Contact</h3>
            <address className="not-italic text-sm text-gray-300 font-light">
              <p className="mb-3">43F, Three IFC, 10 Gukjegeumyung-ro, Yeongdeungpo-gu, Seoul, Republic of Korea</p>
              <p className="mb-3">
                <span className="block">Tel: +82 2-419-8244</span>
                <span className="block">Email: kremi@britannia.co.kr</span>
              </p>
            </address>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm font-light">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm font-light">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
          <p className="text-center font-light">© {currentYear} Britannia Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
