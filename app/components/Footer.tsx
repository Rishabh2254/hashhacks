import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/download.png" alt="Logo" width={40} height={40} className="dark:invert" />
              <span className="ml-2 text-xl font-bold">HealthConnect</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connecting patients and healthcare providers for better healthcare outcomes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase mb-4">
              Links
            </h3>
            <div className="space-y-3">
              <div>
                <Link href="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Home
                </Link>
              </div>
              <div>
                <Link href="/contacts" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} HealthConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
