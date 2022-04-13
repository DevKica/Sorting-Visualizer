const SortingVisualizer = ({ array, max, showNumbers }: { array: number[]; max: number; showNumbers: boolean }) => {
  return (
    <main className="my-1 sm:my-2 h-full relative">
      <div className="flex flex-row justify-center items-end h-full">
        {array.map((e, idx) => (
          <div
            key={idx}
            className="single-bar"
            style={{ width: `${100 / array.length}%`, height: `${(90 / max) * e}%` }}
          >
            {showNumbers && e}
          </div>
        ))}
      </div>
    </main>
  );
};

export default SortingVisualizer;
