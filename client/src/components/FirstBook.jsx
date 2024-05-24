

import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";

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
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const { title, author, pages } = data.book;

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 2) {
      setCurrentPageIndex(currentPageIndex + 2);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 2);
    }
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
        <span key={index} onClick={() => handleTokenClick(token.value)} style={{ cursor: 'pointer', color: 'blue' }}>
          {content.slice(start, end)}
        </span>
      );
      lastIndex = end;
    });

    contentArray.push(content.slice(lastIndex));
    return contentArray;
  };
  const bookName = "parrots are green";
const lastIndex = 17; // End index of the word "green" from the JSON

const lastWord = bookName.substring(12, lastIndex + 1);
console.log(lastWord); // Output: green

  const renderPage = (page) => (
    <div>
      <h3>Page {page.pageIndex}</h3>
      <p>{renderContentWithTokens(page.content, page.tokens)}</p>
    </div>
  );

  return (
    <div>
      {selectedToken ? (
        <TokenView token={selectedToken} onBack={() => setSelectedToken(null)} />
      ) : (
        <div>
          <h1>{title}</h1>
          <h2>by {author}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '45%' }}>
              {pages[currentPageIndex] ? renderPage(pages[currentPageIndex]) : <p>Blank Page</p>}
            </div>
            <div style={{ width: '45%' }}>
              {pages[currentPageIndex + 1] ? renderPage(pages[currentPageIndex + 1]) : <p>Blank Page</p>}
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button onClick={handlePrevPage} disabled={currentPageIndex === 0}>Previous</button>
            <button onClick={handleNextPage} disabled={currentPageIndex >= pages.length - 2}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

const TokenView = ({ token, onBack }) => (
  <div>
    <button onClick={onBack}>Back</button>
    <h2>Token Value</h2>
    <p>{token}</p>
  </div>
);

export default FirstBook;
