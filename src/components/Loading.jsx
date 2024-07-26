export const Loading = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat flex items-center justify-center h-screen">
      <div className="flex space-x-2 items-center flex-col gap-5">
        <div className="flex gap-5">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-cyan-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-cyan-500 rounded-full animate-bounce"></div>
        </div>
        <div className="text-5xl sm:text-7xl font-light text-slate-400">
          Getting Data
        </div>
      </div>
    </div>
  );
};
