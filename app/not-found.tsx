import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <div className="mb-8">
        <img 
          src="/next.svg" 
          alt="Logo" 
          width={80}
          height={80}
          className="dark:invert mx-auto"
        />
      </div>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Return Home
      </Link>
    </div>
  );
}
