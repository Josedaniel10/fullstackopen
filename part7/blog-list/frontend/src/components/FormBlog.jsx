import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('http://');

  const submitHandler = (ev) => {
    ev.preventDefault();
    const blog = {
      title,
      author,
      url,
      likes: 0,
    };

    createBlog(blog);
    setTitle('');
    setAuthor('');
    setUrl('http://');
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '560px' }}>
        <h4 className="mb-3 text-center">Create new blog</h4>
        <div className="card p-3">
          <Form onSubmit={submitHandler} className="d-flex flex-column gap-2">
            <Form.Group controlId="input-title">
              <Form.Label className="mb-1">Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                placeholder="Enter title"
                size="sm"
              />
            </Form.Group>

            <Form.Group controlId="input-author">
              <Form.Label className="mb-1">Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="Enter author"
                size="sm"
              />
            </Form.Group>

            <Form.Group controlId="input-url">
              <Form.Label className="mb-1">Url</Form.Label>
              <Form.Control
                type="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                placeholder="http://"
                size="sm"
              />
            </Form.Group>

            <Button id="submit-blog" type="submit" variant="primary" size="sm">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormBlog;
