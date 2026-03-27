export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
        {children}
      </div>
    </div>
  );
}