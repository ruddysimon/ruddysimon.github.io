import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background text-cream">
      <div className="text-center">
        <p className="font-pixel text-[10rem] leading-none text-cream">404</p>
        <h1 className="text-2xl mb-3">File not found.</h1>
        <p className="text-sm opacity-80 mb-6">This file doesn't exist on the disk.</p>
        <Link to="/" className="btn-os">Back to desktop</Link>
      </div>
    </div>
  );
}
