import Link from "next/link";

export default function CTA() {
  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to take control of your healthcare?
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-foreground">
            Join thousands of users who are already managing their healthcare journey with ease.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 shadow"
            >
              Sign up for free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-foreground/20 hover:bg-primary-foreground/30"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
