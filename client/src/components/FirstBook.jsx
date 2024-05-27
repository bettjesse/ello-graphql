
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const GET_BOOK = gql`
  query getBook {
    book {
      title
      author
      pages {
        pageIndex
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;

const FirstBook = () => {
  const { loading, error, data } = useQuery(GET_BOOK);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1); // Start at -1 for the cover page
  const [selectedToken, setSelectedToken] = useState(null);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4">Something went wrong</p>;

  const { title, author, pages } = data.book;

  const handleNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 2);
  };

  const handlePrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 2);
  };

  const handleTokenClick = (tokenValue) => {
    setSelectedToken(tokenValue);
  };

  const renderContentWithTokens = (content, tokens) => {
    let contentArray = [];
    let lastIndex = 0;

    tokens.forEach((token, index) => {
      const [start, end] = token.position;
      contentArray.push(content.slice(lastIndex, start));
      contentArray.push(
        <span
          key={index}
          onClick={() => handleTokenClick(token.value)}
          className="cursor-pointer text-blue-500"
        >
          {content.slice(start, end)}
        </span>
      );
      lastIndex = end;
    });

    contentArray.push(content.slice(lastIndex));
    return contentArray;
  };

  const renderPage = (page) => (
    <div className="relative bg-white rounded shadow-md p-4 md:my-4 lg:my-8 xl:my-16 my-72 mx-2 flex-1 flex flex-col">
      <div className='flex justify-between items-center'>
        <h3 className="text-sm font-semibold mb-2"></h3>
        <h3 className="absolute top-0 right-0 mr-2 mt-2">{page.pageIndex}</h3>
      </div>
      <p className="text-[#28B8B8] text-center text-sm m-3">{renderContentWithTokens(page.content, page.tokens)}</p>
    </div>
  );

  const renderCoverPage = () => (
    <div className="flex justify-center items-center h-full    md:p-4 lg:p-12 xl:p-2 p-6 md:my-4 lg:my-8 xl:my-4 my-8 ">
      <div className="w-full md:max-w-xl lg:max-w-2xl">
        <img
          src="images/cover.png"
          className="w-full max-h-[500px] object-contain md:max-h-[600px]" // Adjusted max height for tablets
        />
      </div>
    </div>
  );
  

  return (
    <div className="flex bg-[#464848] h-screen">
      {selectedToken ? (
        <TokenView token={selectedToken} onBack={() => setSelectedToken(null)} />
      ) : (
        <div className='w-full'>
          <div className="flex space-x-4">
            {currentPageIndex === -1 ? (
              <div className="w-full">{renderCoverPage()}</div>
            ) : (
              <div className='w-full flex justify-center items-center'>
                <div className="flex mx-auto w-full">
                  <div className="w-1/2 flex justify-center">{pages[currentPageIndex] ? renderPage(pages[currentPageIndex]) : <p>Blank Page</p>}</div>
                  <div className="w-1/2 flex justify-center">{pages[currentPageIndex + 1] ? renderPage(pages[currentPageIndex + 1]) : <p>Blank Page</p>}</div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-4 my-6 md:my-8 lg:my-8 xl:my-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex <= -1}
              className="px-4 py-1 bg-[#28B8B8] hover:bg-[#57e8db] text-white rounded disabled:bg-gray-300"
            >
              <FaArrowLeft/>
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex >= pages.length - 2}
              className="px-4 py-1 bg-[#28B8B8] hover:bg-[#57e8db] text-white rounded disabled:bg-gray-300"
            >
              <FaArrowRight/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TokenView = ({ token, onBack }) => (
  <div className="container mx-auto my-8">
    <button onClick={onBack} className="px-4 py-2 bg-blue-500 text-white rounded mb-4">Back</button>
    <h2 className="text-2xl font-bold mb-2">Token Value</h2>
    <p className="text-white">{token}</p>
  </div>
);

export default FirstBook;

