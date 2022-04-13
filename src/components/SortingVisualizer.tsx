const SortingVisualizer = ({ array, max }: { array: number[]; max: number }) => {
  return (
    <main className="my-1 sm:my-2 h-full relative">
      <div className="flex flex-row justify-center items-end h-full">
        {array.map((e, idx) => (
          <div
            key={idx}
            style={{ width: `${100 / array.length}%`, height: `${(90 / max) * e}%` }}
            className="border border-gray-900 bg-gray-400"
          ></div>
        ))}
      </div>
    </main>
  );
};

export default SortingVisualizer;
