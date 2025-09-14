import { Search } from "lucide-react";
export default function SearchBar() {
  return (
    <div className="mt-4 relative">
      <input
        type="text"
        placeholder="Pesquisar eventos, festas ou experiências..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
        <Search size={24} className="text-amber-600 cursor-pointer" />
      </button>
    </div>
  );
}
