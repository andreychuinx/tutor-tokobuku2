import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  FormControl,
  Form,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';

const Book = ({ book, doUpdate, doDelete }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const bookStatus = book.bookStatus === 'FOR_SELL' ? 'info' : 'warning';

  useEffect(() => {
    setData({
      ...book,
      bookCategory: { ...book.bookCategory },
      id: book.id,
      title: book.title,
      synopsis: book.synopsis,
      price: book.price,
      bookStatus: book.bookStatus,
      authorName: book.authorName,
      publicationDate: new Date(),
    });
  }, []);

  const handleUpdate = () => {
    doUpdate(data);
    setEdit(false);
  }

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  }

  return (
    <div className="col-md-3">
      <Card>
        <Card.Img
          variant="top"
          src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
        />
        <Card.Body>
          <LinkContainer to={`/book/${book.id}`} style={{ cursor: 'pointer' }}>
            <Card.Title className="text-primary">{book.title}</Card.Title>
          </LinkContainer>
          {edit ? (
            <>
              <Form.Control
                as="select"
                value={data.bookStatus}
                onChange={(e) => handleForm(e, "bookStatus")}
              >
                <option>--Choose--</option>
                <option value="FOR_SELL">FOR_SELL</option>
                <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              </Form.Control>
              <FormControl
                className="mt-2"
                type="number"
                as="input"
                value={data.price}
                onChange={(e) => handleForm(e, "price")}
              />
              <FormControl
                className="mt-2"
                as="input"
                value={data.authorName}
                onChange={(e) => handleForm(e, "authorName")}
              />
            </>
          ) : (
              <>
                <Button
                  variant={bookStatus}
                  className="btn-sm font-weight-bold m-2"
                >
                  {book.bookStatus}
                </Button>
                <h4 className="font-weight-bold" style={{ color: "#8052ff" }}>
                  {`Rp ${numeral(book.price).format("0,0")}`}
                </h4>
                <h6 className="text-dark">Author: {book.authorName}</h6>
              </>
            )}
          <Card.Text className="text-secondary text-justify">
            {edit ? (
              <FormControl
                className="mt-2"
                as="textarea"
                aria-label="With textarea"
                value={data.synopsis}
                style={{ height: "300px" }}
                onChange={(e) => handleForm(e, "synopsis")}
              />
            ) : (
                book.synopsis.substr(0, 150)
              )}
          </Card.Text>

          {edit ? (
            <>
              <Button variant="primary" onClick={() => handleUpdate()}>
                Save
                </Button>{" "}
              <Button
                variant="secondary"
                onClick={() => {
                  setEdit(false);
                  setData({
                    title: book.title,
                    synopsis: book.synopsis,
                    price: book.price,
                    bookStatus: book.bookStatus,
                    authorName: book.authorName,
                  })
                }}
              >
                Cancel
                </Button>
            </>
          ) : (
              <>
                <Button variant="success" onClick={() => setEdit(true)}>
                  Edit
                </Button>{" "}
                <Button variant="danger">Delete</Button>
              </>
            )}
        </Card.Body>
      </Card>
    </div>
  )
};

export default withRouter(Book);
