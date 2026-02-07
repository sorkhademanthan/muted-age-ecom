export default function TestTailwindPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Test 1: Colors */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-black mb-4">
            ✅ Tailwind Test Page
          </h1>
          <p className="text-gray-600 text-lg">
            If you see colors and styles, Tailwind is working!
          </p>
        </div>

        {/* Test 2: Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-500 h-32 rounded-lg"></div>
          <div className="bg-green-500 h-32 rounded-lg"></div>
          <div className="bg-blue-500 h-32 rounded-lg"></div>
        </div>

        {/* Test 3: Animation */}
        <div className="bg-white p-8 rounded-lg animate-pulse">
          <p className="text-xl font-semibold">
            This box should pulse (animate)
          </p>
        </div>

        {/* Test 4: Hover Effect */}
        <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105">
          Hover over me!
        </button>
      </div>
    </div>
  );
}
