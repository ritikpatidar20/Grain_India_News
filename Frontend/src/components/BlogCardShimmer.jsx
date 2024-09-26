
export const BlogCardShimmer = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="animate-pulse">
          <div className="h-44 w-72 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="flex space-x-2">
            <div className="h-4 w-1/3 bg-gray-200"></div>
            {/* <div className="h-4 w-1/3 bg-gray-200"></div>
            <div className="h-4 w-1/3 bg-gray-200"></div> */}
          </div>
        </div>
      </div>
    );
  };
  