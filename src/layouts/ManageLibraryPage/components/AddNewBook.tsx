import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import AddBookRequest from "../../../models/AddBookRequest";

export const AddNewBook = () => {

    const { authState } = useOktaAuth();

    // New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('カテゴリー');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    //Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            setSelectedImage(reader.result);
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewBook() {
        console.log("Entering method -----------------")
        const url = 'https://fithon.herokuapp.com/api/admin/secure/add/book';

        if (authState?.isAuthenticated && title !== '' && author !== ''
                 && category !== 'カテゴリー' && description !== '' && copies >= 0) {

            const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category);
            book.img = selectedImage;

            console.log(book.img);

            const requestOptions = {
                method:'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            };

            console.log(requestOptions.body);

            const submitNewBookResponse = await fetch(url, requestOptions);

            // if (!submitNewBookResponse.ok) {
            //     throw new Error('エラーが発生しました。')
            // }


            console.log(submitNewBookResponse);


            setTitle('');
            setAuthor('');
            setDescription('');
            setCopies(0);
            setCategory('カテゴリー');
            setSelectedImage(null);

            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {

            console.log("last else -----------------")

            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (

        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    新しい本が登録されました。
                </div>    
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    全部記入してください。
                </div>    
            }
            <div className='card'>
                <div className='card-header'>
                    新しい本の登録
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>タイトル</label>
                                <input type="text" className='form-control' name='title' required
                                    onChange={e => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>著者</label>
                                <input type="text" className='form-control' name='author' required
                                    onChange={e => setAuthor(e.target.value)} value={author}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                            <label className='form-label'>カテゴリー</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button'
                                    id='dropDownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewABookId' className='dropdown-menu' aria-labelledby='dropdown'>
                                    <li><a onClick={() => categoryField('栄養')}>栄養</a></li>
                                    <li><a onClick={() => categoryField('運動法')}>運動法</a></li>
                                    <li><a onClick={() => categoryField('自己啓発')}>自己啓発</a></li>
                                    <li><a onClick={() => categoryField('その他に')}>その他に</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>内容</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3}
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-6 mb-3'>
                                <label className='form-label'>数量</label>
                                <input type="number" className='form-control' name='Copies' required
                                    onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)} />
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewBook}>
                                登録
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

}