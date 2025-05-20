
const PaginationControls = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (typeof onPageChange !== "function") {
    throw new Error("onPageChange must be a function");
  }

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className = "flex justify-center items-center mt-4">
      <button
        onClick = {handlePrevious}
        disabled = {currentPage === 1}
        className = "px-4 py-2 bg-gray-300 rounded mr-2"
      >
        Previous
      </button>
      <span className = "mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick = {handleNext}
        disabled = {currentPage === totalPages}
        className = "px-4 py-2 bg-gray-300 rounded ml-2"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;