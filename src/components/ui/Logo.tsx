import { Store } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center ml-2 sm:ml-4">
      <Store size={32} className="text-violet-600" />
      <h1 className="ml-2 text-xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
        ThingStore
      </h1>
    </div>
  );
}
