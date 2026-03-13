interface ProgressDotsProps {
  total: number;
  currentIndex: number;
  isDone: (index: number) => boolean;
}

const ProgressDots = ({ total, currentIndex, isDone }: ProgressDotsProps) => {
  return (
    <div className="progress-dots">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentIndex ? 'active' : ''} ${isDone(index) ? 'done' : ''}`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
