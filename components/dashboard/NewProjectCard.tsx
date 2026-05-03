interface NewProjectCardProps {
  onClick: () => void;
}

export default function NewProjectCard({ onClick }: NewProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-gray-50 hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
        <span className="material-symbols-outlined text-gray-400 group-hover:text-blue-500 transition-colors">
          add_circle
        </span>
      </div>
      <p className="text-h3 text-gray-500 group-hover:text-blue-600 transition-colors">
        New Project
      </p>
      <p className="text-body-md text-gray-400 mt-1">
        Upload script or assets to begin
      </p>
    </div>
  );
}
