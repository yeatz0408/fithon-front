import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SearchBook } from "../SearchBooksPage/components/SearchBook";
import { TopBook } from "./components/TopBook";

export const TopBooks = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [ranking, setRanking] = useState(1);

    useEffect(() => {

        // using FETCH
        const fetchTopBooks = async () => {
            const url: string = "https://fithon.herokuapp.com/api/books/topbooks";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('エラーが発生しました。');
            }

            const responseJson = await response.json();

            setTotalAmountOfBooks(responseJson.length);

            const loadedBooks: BookModel[] = [];

            for (const key in responseJson) {
                loadedBooks.push({
                    id: responseJson[key].id,
                    title: responseJson[key].title,
                    author: responseJson[key].author,
                    description: responseJson[key].description,
                    copies: responseJson[key].copies,
                    copiesAvailable: responseJson[key].copiesAvailable,
                    category: responseJson[key].category,
                    img: responseJson[key].img
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);

        };
        fetchTopBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    return (
        <div>
            <h1 className='display-5 fw-bold m-5'>一番人気の本</h1>
            {totalAmountOfBooks > 0 ?
                        <>

                            {books.map((book, index) => (
                                <TopBook book={book} key={book.id} ranking={index + 1}/>
                            ))}
                        </>
                        :
                        <div>
                            <h3>
                                まだどんな本が人気か分かりません。
                            </h3>
                        </div>
                    }
        </div>
    )
}