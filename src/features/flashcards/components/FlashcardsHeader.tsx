interface FlashcardsHeaderProps {
  currentIndex: number;
  total: number;
}

const FlashcardsHeader = ({ currentIndex, total }: FlashcardsHeaderProps) => {
  return (
    <div className="flashcards-header">
      <h1>Flashcards</h1>
      <p>
        {currentIndex + 1} / {total}
      </p>
    </div>
  );
};

export default FlashcardsHeader;
